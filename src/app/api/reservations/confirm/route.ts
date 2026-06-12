import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapReservation } from "@/lib/booking-service";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { notifyBookingConfirmed } from "@/lib/notifications";

/** Confirms reservation after Stripe checkout (backup when webhook is unavailable). */
export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    if (!isStripeConfigured()) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const reservationId = session.metadata?.reservationId;
    if (!reservationId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.reservation.update({
        where: { id: reservationId },
        data: { status: "confirmed" },
      }),
      prisma.payment.updateMany({
        where: { stripeSessionId: sessionId },
        data: {
          status: "paid",
          stripePaymentIntentId:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id ?? null,
          paidAt: new Date(),
        },
      }),
    ]);

    notifyBookingConfirmed(reservationId).catch(console.error);

    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { guest: true, roomType: true },
    });

    if (!reservation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ reservation: mapReservation(reservation) });
  } catch (error) {
    console.error("POST /api/reservations/confirm:", error);
    return NextResponse.json({ error: "Confirmation failed" }, { status: 500 });
  }
}
