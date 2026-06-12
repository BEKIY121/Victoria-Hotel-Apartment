import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapReservation, isWithinCancellationWindow } from "@/lib/booking-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get("ref")?.trim();
  const email = searchParams.get("email")?.trim().toLowerCase();
  const sessionId = searchParams.get("session_id")?.trim();

  try {
    if (sessionId) {
      const payment = await prisma.payment.findFirst({
        where: { stripeSessionId: sessionId },
        include: {
          reservation: {
            include: { guest: true, roomType: true },
          },
        },
      });
      if (!payment) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({
        reservation: mapReservation(payment.reservation),
        paymentStatus: payment.status,
      });
    }

    if (!ref) {
      return NextResponse.json(
        { error: "ref or session_id is required" },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.findFirst({
      where: {
        refNumber: { equals: ref, mode: "insensitive" },
        ...(email ? { guest: { email } } : {}),
      },
      include: { guest: true, roomType: true },
    });

    if (!reservation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const payment = await prisma.payment.findFirst({
      where: { reservationId: reservation.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      reservation: mapReservation(reservation),
      paymentStatus: payment?.status ?? null,
      canCancel:
        ["pending", "confirmed"].includes(reservation.status) &&
        isWithinCancellationWindow(reservation.checkIn),
    });
  } catch (error) {
    console.error("GET /api/reservations/lookup:", error);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
}
