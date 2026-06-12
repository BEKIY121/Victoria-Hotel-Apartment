import { NextResponse } from "next/server";
import type { ReservationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";
import {
  createReservation,
  mapReservation,
} from "@/lib/booking-service";
import { notifyBookingConfirmed } from "@/lib/notifications";

export async function GET() {
  try {
    await requireAdminSession();
    const reservations = await prisma.reservation.findMany({
      include: { guest: true, roomType: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reservations.map(mapReservation));
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load reservations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();

    const reservation = await createReservation({
      roomTypeId: body.roomTypeId,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guests: Number(body.guests),
      guestName: body.guestName,
      email: body.email,
      phone: body.phone,
      nationality: body.nationality,
      specialRequests: body.specialRequests,
      status: (body.status as ReservationStatus) ?? "confirmed",
    });

    if (reservation.status === "confirmed") {
      notifyBookingConfirmed(reservation.id).catch(console.error);
    }

    return NextResponse.json(mapReservation(reservation));
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const message = error instanceof Error ? error.message : "Failed to create";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
