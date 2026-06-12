import { prisma } from "@/lib/prisma";

export async function validatePromotion(
  code: string,
  roomTypeId: string,
  checkIn: string
) {
  const promo = await prisma.promotion.findUnique({
    where: { code: code.trim().toUpperCase() },
    include: { rooms: true },
  });

  if (!promo || !promo.active) {
    throw new Error("Invalid promo code");
  }

  const checkInDate = new Date(checkIn);
  if (checkInDate < promo.startDate || checkInDate > promo.endDate) {
    throw new Error("Promo code not valid for these dates");
  }

  if (
    promo.rooms.length > 0 &&
    !promo.rooms.some((r) => r.roomTypeId === roomTypeId)
  ) {
    throw new Error("Promo code not valid for this room");
  }

  return promo;
}

export function applyPromotionDiscount(
  total: number,
  discountType: string,
  discountValue: number
): number {
  if (discountType === "percent") {
    return Math.max(0, Math.round(total * (1 - discountValue / 100)));
  }
  return Math.max(0, Math.round(total - discountValue));
}
