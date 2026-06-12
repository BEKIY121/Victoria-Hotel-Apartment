import { NextResponse } from "next/server";
import { getRoomTypes, getSeasonalPricing } from "@/lib/data/rooms";
import { getAvailableCountForRoom } from "@/lib/booking-service";
import { getEffectiveNightlyPrice } from "@/lib/pricing";
import { nightsBetween } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = Number(searchParams.get("guests")) || 1;

  if (!checkIn || !checkOut) {
    return NextResponse.json(
      { error: "checkIn and checkOut are required" },
      { status: 400 }
    );
  }

  const nights = nightsBetween(checkIn, checkOut);
  if (nights <= 0) {
    return NextResponse.json(
      { error: "Check-out must be after check-in" },
      { status: 400 }
    );
  }

  try {
    const [rooms, seasonalPricing] = await Promise.all([
      getRoomTypes(),
      getSeasonalPricing(),
    ]);

    const results = await Promise.all(
      rooms.map(async (room) => {
        const available = await getAvailableCountForRoom(
          room.id,
          checkIn,
          checkOut
        );
        let total = 0;
        const current = new Date(checkIn);
        for (let i = 0; i < nights; i++) {
          const dateStr = current.toISOString().slice(0, 10);
          total += getEffectiveNightlyPrice(room, dateStr, seasonalPricing);
          current.setDate(current.getDate() + 1);
        }

        return {
          id: room.id,
          slug: room.slug,
          name: room.name,
          capacity: room.capacity,
          bedType: room.bedType,
          size: room.size,
          basePrice: room.basePrice,
          images: room.images,
          shortDescription: room.shortDescription,
          amenities: room.amenities,
          available,
          totalPrice: total,
          pricePerNight: Math.round(total / nights),
          fitsGuests: room.capacity >= guests,
          bookable: available > 0 && room.capacity >= guests,
        };
      })
    );

    return NextResponse.json({
      checkIn,
      checkOut,
      guests,
      nights,
      rooms: results.filter((r) => r.bookable),
    });
  } catch (error) {
    console.error("GET /api/availability failed:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
