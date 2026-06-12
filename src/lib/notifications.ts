import { prisma } from "@/lib/prisma";
import {
  sendBookingCancellationEmail,
  sendBookingConfirmationEmail,
} from "@/lib/email";

export async function notifyBookingConfirmed(
  reservationId: string
): Promise<void> {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { guest: true, roomType: true },
  });

  if (!reservation || reservation.status !== "confirmed") return;

  await sendBookingConfirmationEmail({
    to: reservation.guest.email,
    guestName: reservation.guest.name,
    refNumber: reservation.refNumber,
    roomName: reservation.roomType.name,
    checkIn: reservation.checkIn.toISOString().slice(0, 10),
    checkOut: reservation.checkOut.toISOString().slice(0, 10),
    guests: reservation.guests,
    totalAmount: Number(reservation.totalAmount),
  });
}

export async function notifyBookingCancelled(
  reservationId: string
): Promise<void> {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { guest: true, roomType: true },
  });

  if (!reservation || reservation.status !== "cancelled") return;

  await sendBookingCancellationEmail({
    to: reservation.guest.email,
    guestName: reservation.guest.name,
    refNumber: reservation.refNumber,
    roomName: reservation.roomType.name,
    checkIn: reservation.checkIn.toISOString().slice(0, 10),
    checkOut: reservation.checkOut.toISOString().slice(0, 10),
  });
}
