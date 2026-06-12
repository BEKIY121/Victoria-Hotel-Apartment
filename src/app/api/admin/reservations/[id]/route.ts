import { NextResponse } from "next/server";
import type { ReservationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";
import { calculateReservationTotal, cancelReservation, mapReservation } from "@/lib/booking-service";
import { notifyBookingConfirmed, notifyBookingCancelled } from "@/lib/notifications";

const validStatuses: ReservationStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "checked_in",
  "checked_out",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await request.json();

    const data: {
      status?: ReservationStatus;
      checkIn?: Date;
      checkOut?: Date;
      guests?: number;
      specialRequests?: string | null;
      totalAmount?: number;
    } = {};

    if (body.status) {
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      data.status = body.status;
    }
    if (body.checkIn) data.checkIn = new Date(body.checkIn);
    if (body.checkOut) data.checkOut = new Date(body.checkOut);
    if (body.guests) data.guests = Number(body.guests);
    if (body.specialRequests !== undefined) {
      data.specialRequests = body.specialRequests || null;
    }

    const existing = await prisma.reservation.findUnique({
      where: { id },
      include: { guest: true, roomType: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (body.checkIn || body.checkOut) {
      const checkIn = (data.checkIn ?? existing.checkIn).toISOString().slice(0, 10);
      const checkOut = (data.checkOut ?? existing.checkOut).toISOString().slice(0, 10);
      data.totalAmount = await calculateReservationTotal(
        existing.roomTypeId,
        checkIn,
        checkOut
      );
    }

    if (body.guestName || body.email || body.phone !== undefined) {
      await prisma.guest.update({
        where: { id: existing.guestId },
        data: {
          ...(body.guestName && { name: body.guestName }),
          ...(body.email && { email: body.email }),
          ...(body.phone !== undefined && { phone: body.phone || null }),
        },
      });
    }

    if (body.status === "cancelled" && existing.status !== "cancelled") {
      await cancelReservation(id, { skipPolicyCheck: true });
      notifyBookingCancelled(id).catch(console.error);
      const cancelled = await prisma.reservation.findUniqueOrThrow({
        where: { id },
        include: { guest: true, roomType: true },
      });
      return NextResponse.json(mapReservation(cancelled));
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data,
      include: { guest: true, roomType: true },
    });

    if (body.status === "confirmed" && existing.status !== "confirmed") {
      notifyBookingConfirmed(id).catch(console.error);
    }

    return NextResponse.json(mapReservation(reservation));
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const message = error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { guest: true, roomType: true },
    });
    if (!reservation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(mapReservation(reservation));
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
