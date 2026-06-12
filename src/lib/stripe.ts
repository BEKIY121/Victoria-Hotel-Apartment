import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key.includes("replace")) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export function getStripeCurrency(): string {
  return process.env.STRIPE_CURRENCY ?? "usd";
}

/** Stripe expects amounts in the smallest currency unit (e.g. cents). */
export function toStripeAmount(amount: number): number {
  return Math.round(amount * 100);
}

export function isStripeConfigured(): boolean {
  const key = process.env.STRIPE_SECRET_KEY;
  return !!key && !key.includes("replace");
}

export async function refundPaymentIntent(paymentIntentId: string) {
  const stripe = getStripe();
  return stripe.refunds.create({ payment_intent: paymentIntentId });
}
