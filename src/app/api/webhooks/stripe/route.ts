import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { notifyBookingConfirmed } from "@/lib/notifications";

export async function POST(request: Request) {
  const body = await request.text();
  const headerStore = await headers();
  const signature = headerStore.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret.includes("replace")) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const reservationId = session.metadata?.reservationId;

      if (reservationId) {
        await prisma.$transaction([
          prisma.reservation.update({
            where: { id: reservationId },
            data: { status: "confirmed" },
          }),
          prisma.payment.updateMany({
            where: { stripeSessionId: session.id },
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
      }
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const reservationId = session.metadata?.reservationId;
      if (reservationId) {
        await prisma.$transaction([
          prisma.reservation.updateMany({
            where: { id: reservationId, status: "pending" },
            data: { status: "cancelled" },
          }),
          prisma.payment.updateMany({
            where: { stripeSessionId: session.id },
            data: { status: "failed" },
          }),
        ]);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
