import { NextResponse } from "next/server";
import {
  createReservation,
  mapReservation,
} from "@/lib/booking-service";
import { notifyBookingConfirmed } from "@/lib/notifications";
import {
  getStripe,
  getStripeCurrency,
  isStripeConfigured,
  toStripeAmount,
} from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      roomTypeId,
      checkIn,
      checkOut,
      guests,
      guestName,
      email,
      phone,
      nationality,
      specialRequests,
    } = body;

    if (
      !roomTypeId ||
      !checkIn ||
      !checkOut ||
      !guests ||
      !guestName ||
      !email
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reservation = await createReservation({
      roomTypeId,
      checkIn,
      checkOut,
      guests: Number(guests),
      guestName,
      email,
      phone,
      nationality,
      specialRequests,
      promoCode: body.promoCode,
      status: "pending",
    });

    if (!isStripeConfigured()) {
      if (process.env.ALLOW_DEV_BOOKING === "true") {
        const { prisma } = await import("@/lib/prisma");
        const confirmed = await prisma.reservation.update({
          where: { id: reservation.id },
          data: { status: "confirmed" },
          include: { guest: true, roomType: true },
        });
        notifyBookingConfirmed(confirmed.id).catch(console.error);
        return NextResponse.json({
          reservation: mapReservation(confirmed),
          devMode: true,
        });
      }
      return NextResponse.json(
        {
          error:
            "Payment is not configured. Add STRIPE_SECRET_KEY to .env or set ALLOW_DEV_BOOKING=true for local testing.",
        },
        { status: 503 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const stripe = getStripe();
    const currency = getStripeCurrency();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: toStripeAmount(Number(reservation.totalAmount)),
            product_data: {
              name: `${reservation.roomType.name} — ${checkIn} to ${checkOut}`,
              description: `Ref: ${reservation.refNumber} · Victoria Hotel Apartments`,
            },
          },
        },
      ],
      metadata: {
        reservationId: reservation.id,
        refNumber: reservation.refNumber,
      },
      success_url: `${appUrl}/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/book?cancelled=1&ref=${reservation.refNumber}`,
    });

    const { prisma } = await import("@/lib/prisma");
    await prisma.payment.create({
      data: {
        reservationId: reservation.id,
        stripeSessionId: session.id,
        amount: reservation.totalAmount,
        currency,
        status: "pending",
      },
    });

    return NextResponse.json({
      reservation: mapReservation(reservation),
      checkoutUrl: session.url,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create reservation";
    console.error("POST /api/reservations:", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
