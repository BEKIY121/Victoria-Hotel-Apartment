import type { ReservationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getRoomTypes, getSeasonalPricing } from "@/lib/data/rooms";
import { calculateStayTotal } from "@/lib/pricing";
import {
  applyPromotionDiscount,
  validatePromotion,
} from "@/lib/promotions";
import { generateRefNumber, nightsBetween } from "@/lib/utils";
import { isStripeConfigured, refundPaymentIntent } from "@/lib/stripe";

export interface CreateReservationInput {
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  email: string;
  phone?: string;
  nationality?: string;
  specialRequests?: string;
  promoCode?: string;
  status?: ReservationStatus;
}

export async function getAvailableCountForRoom(
  roomTypeId: string,
  checkIn: string,
  checkOut: string
): Promise<number> {
  const room = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
  if (!room) return 0;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const block = await prisma.availabilityBlock.findFirst({
    where: {
      OR: [{ roomTypeId }, { roomTypeId: null }],
      startDate: { lt: checkOutDate },
      endDate: { gt: checkInDate },
    },
  });
  if (block) return 0;

  const overlapping = await prisma.reservation.count({
    where: {
      roomTypeId,
      status: { in: ["pending", "confirmed", "checked_in"] },
      checkIn: { lt: checkOutDate },
      checkOut: { gt: checkInDate },
    },
  });

  return Math.max(0, room.inventory - overlapping);
}

export async function calculateReservationTotal(
  roomTypeId: string,
  checkIn: string,
  checkOut: string
): Promise<number> {
  const [rooms, seasonalPricing] = await Promise.all([
    getRoomTypes(),
    getSeasonalPricing(),
  ]);
  const room = rooms.find((r) => r.id === roomTypeId);
  if (!room) throw new Error("Room not found");
  return calculateStayTotal(room, checkIn, checkOut, seasonalPricing);
}

export async function createReservation(input: CreateReservationInput) {
  const nights = nightsBetween(input.checkIn, input.checkOut);
  if (nights <= 0) throw new Error("Invalid dates");

  const room = await prisma.roomType.findUnique({
    where: { id: input.roomTypeId },
  });
  if (!room || !room.active) throw new Error("Room not found");
  if (room.capacity < input.guests) throw new Error("Room capacity exceeded");

  let totalAmount = await calculateReservationTotal(
    input.roomTypeId,
    input.checkIn,
    input.checkOut
  );

  if (input.promoCode) {
    const promo = await validatePromotion(
      input.promoCode,
      input.roomTypeId,
      input.checkIn
    );
    totalAmount = applyPromotionDiscount(
      totalAmount,
      promo.discountType,
      Number(promo.discountValue)
    );
  }

  const refNumber = generateRefNumber();
  const status = input.status ?? "pending";

  return prisma.$transaction(async (tx) => {
    const available = await getAvailableCountForRoom(
      input.roomTypeId,
      input.checkIn,
      input.checkOut
    );
    if (available <= 0) throw new Error("No availability");

    let guest = await tx.guest.findFirst({
      where: { email: input.email.toLowerCase().trim() },
    });

    if (guest) {
      guest = await tx.guest.update({
        where: { id: guest.id },
        data: {
          name: input.guestName.trim(),
          nationality: input.nationality,
          phone: input.phone?.trim() || guest.phone,
        },
      });
    } else {
      guest = await tx.guest.create({
        data: {
          name: input.guestName.trim(),
          email: input.email.toLowerCase().trim(),
          phone: input.phone?.trim() || input.email,
          nationality: input.nationality,
        },
      });
    }

    const reservation = await tx.reservation.create({
      data: {
        refNumber,
        guestId: guest.id,
        roomTypeId: input.roomTypeId,
        checkIn: new Date(input.checkIn),
        checkOut: new Date(input.checkOut),
        guests: input.guests,
        status,
        totalAmount,
        specialRequests: input.specialRequests?.trim() || null,
      },
      include: {
        guest: true,
        roomType: true,
      },
    });

    return reservation;
  });
}

export function mapReservation(row: {
  id: string;
  refNumber: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: ReservationStatus;
  totalAmount: { toNumber(): number } | number;
  specialRequests: string | null;
  createdAt: Date;
  guest: {
    name: string;
    email: string;
    phone: string;
    nationality: string | null;
  };
  roomType: { id: string; name: string; slug: string };
}) {
  return {
    id: row.id,
    refNumber: row.refNumber,
    guestName: row.guest.name,
    email: row.guest.email,
    phone: row.guest.phone,
    nationality: row.guest.nationality ?? undefined,
    roomTypeId: row.roomType.id,
    roomName: row.roomType.name,
    roomSlug: row.roomType.slug,
    checkIn: row.checkIn.toISOString().slice(0, 10),
    checkOut: row.checkOut.toISOString().slice(0, 10),
    status: row.status,
    totalAmount: Number(row.totalAmount),
    guests: row.guests,
    specialRequests: row.specialRequests ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

const cancellableStatuses: ReservationStatus[] = ["pending", "confirmed"];

export function isWithinCancellationWindow(checkIn: Date): boolean {
  return checkIn.getTime() - Date.now() >= 24 * 60 * 60 * 1000;
}

export async function cancelReservation(
  reservationId: string,
  options: { skipPolicyCheck?: boolean } = {}
) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { guest: true, roomType: true, payments: true },
  });

  if (!reservation) throw new Error("Booking not found");
  if (reservation.status === "cancelled") throw new Error("Booking already cancelled");
  if (!cancellableStatuses.includes(reservation.status)) {
    throw new Error("This booking cannot be cancelled online");
  }
  if (
    !options.skipPolicyCheck &&
    !isWithinCancellationWindow(reservation.checkIn)
  ) {
    throw new Error(
      "Free cancellation is only available up to 24 hours before check-in"
    );
  }

  const paidPayment = reservation.payments.find((p) => p.status === "paid");
  if (paidPayment?.stripePaymentIntentId && isStripeConfigured()) {
    await refundPaymentIntent(paidPayment.stripePaymentIntentId);
    await prisma.payment.update({
      where: { id: paidPayment.id },
      data: { status: "refunded" },
    });
  }

  await prisma.$transaction([
    prisma.reservation.update({
      where: { id: reservationId },
      data: { status: "cancelled" },
    }),
    prisma.payment.updateMany({
      where: { reservationId, status: "pending" },
      data: { status: "failed" },
    }),
  ]);

  return prisma.reservation.findUniqueOrThrow({
    where: { id: reservationId },
    include: { guest: true, roomType: true },
  });
}

export async function cancelReservationByRef(refNumber: string, email: string) {
  const reservation = await prisma.reservation.findFirst({
    where: {
      refNumber: { equals: refNumber.trim(), mode: "insensitive" },
      guest: { email: email.toLowerCase().trim() },
    },
  });
  if (!reservation) throw new Error("Booking not found — check reference and email");
  return cancelReservation(reservation.id);
}
