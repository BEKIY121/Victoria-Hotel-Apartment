import { NextResponse } from "next/server";
import {
  validatePromotion,
  applyPromotionDiscount,
} from "@/lib/promotions";
import { calculateReservationTotal } from "@/lib/booking-service";

export async function POST(request: Request) {
  try {
    const { code, roomTypeId, checkIn, checkOut } = await request.json();

    if (!code || !roomTypeId || !checkIn || !checkOut) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const promo = await validatePromotion(code, roomTypeId, checkIn);
    const subtotal = await calculateReservationTotal(
      roomTypeId,
      checkIn,
      checkOut
    );
    const total = applyPromotionDiscount(
      subtotal,
      promo.discountType,
      Number(promo.discountValue)
    );

    return NextResponse.json({
      valid: true,
      code: promo.code,
      name: promo.name,
      discountType: promo.discountType,
      discountValue: Number(promo.discountValue),
      subtotal,
      total,
      savings: subtotal - total,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid promo code";
    return NextResponse.json({ valid: false, error: message }, { status: 400 });
  }
}
