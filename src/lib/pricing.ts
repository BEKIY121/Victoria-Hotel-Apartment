import type { RoomType, SeasonalPricing } from "./types";
import { nightsBetween } from "./utils";

export function getEffectiveNightlyPrice(
  roomType: RoomType,
  date: string,
  seasonalPricing: SeasonalPricing[]
): number {
  const matching = seasonalPricing.find(
    (s) =>
      s.roomTypeId === roomType.id &&
      date >= s.startDate &&
      date <= s.endDate
  );

  if (matching?.fixedPrice) return matching.fixedPrice;
  if (matching) return Math.round(roomType.basePrice * matching.priceMultiplier);
  return roomType.basePrice;
}

export function calculateStayTotal(
  roomType: RoomType,
  checkIn: string,
  checkOut: string,
  seasonalPricing: SeasonalPricing[]
): number {
  const nights = nightsBetween(checkIn, checkOut);
  if (nights === 0) return 0;

  let total = 0;
  const current = new Date(checkIn);
  for (let i = 0; i < nights; i++) {
    const dateStr = current.toISOString().slice(0, 10);
    total += getEffectiveNightlyPrice(roomType, dateStr, seasonalPricing);
    current.setDate(current.getDate() + 1);
  }
  return total;
}

export function getStartingPrice(
  roomType: RoomType,
  seasonalPricing: SeasonalPricing[]
): number {
  const today = new Date().toISOString().slice(0, 10);
  return getEffectiveNightlyPrice(roomType, today, seasonalPricing);
}
