import { prisma } from "@/lib/prisma";
import type { RoomType, SeasonalPricing } from "@/lib/types";
import {
  roomTypes as fallbackRooms,
  seasonalPricing as fallbackSeasonal,
} from "@/lib/mock-data";

type DbRoom = Awaited<
  ReturnType<typeof prisma.roomType.findMany>
>[number];

function mapRoom(room: DbRoom): RoomType {
  return {
    id: room.id,
    slug: room.slug,
    name: room.name,
    description: room.description,
    shortDescription: room.shortDescription,
    capacity: room.capacity,
    bedType: room.bedType,
    size: `${room.sizeSqm} m²`,
    basePrice: Number(room.basePrice),
    inventory: room.inventory,
    amenities: room.amenities,
    images: room.images,
    featured: room.featured,
  };
}

function mapSeasonal(rate: {
  id: string;
  roomTypeId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  priceMultiplier: { toNumber(): number } | null;
  fixedPrice: { toNumber(): number } | null;
}): SeasonalPricing {
  return {
    id: rate.id,
    roomTypeId: rate.roomTypeId,
    name: rate.name,
    startDate: rate.startDate.toISOString().slice(0, 10),
    endDate: rate.endDate.toISOString().slice(0, 10),
    priceMultiplier: rate.priceMultiplier
      ? Number(rate.priceMultiplier)
      : 1,
    fixedPrice: rate.fixedPrice ? Number(rate.fixedPrice) : undefined,
  };
}

export async function getRoomTypes(): Promise<RoomType[]> {
  try {
    const rooms = await prisma.roomType.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rooms.length === 0) return fallbackRooms;
    return rooms.map(mapRoom);
  } catch {
    return fallbackRooms;
  }
}

export async function getRoomBySlug(slug: string): Promise<RoomType | undefined> {
  const rooms = await getRoomTypes();
  return rooms.find((r) => r.slug === slug);
}

export async function getRoomNavItems(): Promise<{ slug: string; name: string }[]> {
  const rooms = await getRoomTypes();
  return rooms.map(({ slug, name }) => ({ slug, name }));
}

export async function getSeasonalPricing(): Promise<SeasonalPricing[]> {
  try {
    const rates = await prisma.seasonalRate.findMany();
    if (rates.length === 0) return fallbackSeasonal;
    return rates.map(mapSeasonal);
  } catch {
    return fallbackSeasonal;
  }
}

export async function getAvailableCount(
  roomTypeId: string,
  checkIn: string,
  checkOut: string
): Promise<number> {
  const room = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
  if (!room) return 0;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const overlapping = await prisma.reservation.count({
    where: {
      roomTypeId,
      status: { in: ["pending", "confirmed", "checked_in"] },
      checkIn: { lt: checkOutDate },
      checkOut: { gt: checkInDate },
    },
  });

  const blocks = await prisma.availabilityBlock.findFirst({
    where: {
      OR: [{ roomTypeId }, { roomTypeId: null }],
      startDate: { lt: checkOutDate },
      endDate: { gt: checkInDate },
    },
  });

  if (blocks) return 0;

  return Math.max(0, room.inventory - overlapping);
}
