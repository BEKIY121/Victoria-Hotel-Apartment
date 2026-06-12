import { prisma } from "@/lib/prisma";
import type { GuestReview } from "@/lib/types";
import { guestReviews as fallbackReviews } from "@/lib/mock-data";

export async function getApprovedReviews(): Promise<GuestReview[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });

    if (reviews.length === 0) return fallbackReviews.filter((r) => r.approved);

    const roomIds = [
      ...new Set(reviews.map((r) => r.roomTypeId).filter(Boolean)),
    ] as string[];
    const rooms =
      roomIds.length > 0
        ? await prisma.roomType.findMany({
            where: { id: { in: roomIds } },
            select: { id: true, name: true },
          })
        : [];
    const roomNames = new Map(rooms.map((r) => [r.id, r.name]));

    return reviews.map((review) => ({
      id: review.id,
      name: review.name,
      country: review.country,
      rating: review.rating,
      text: review.text,
      date: review.createdAt.toISOString().slice(0, 10),
      roomTypeId: review.roomTypeId ?? undefined,
      roomName: review.roomTypeId
        ? roomNames.get(review.roomTypeId)
        : undefined,
      approved: review.approved,
    }));
  } catch {
    return fallbackReviews.filter((r) => r.approved);
  }
}

export async function getAverageRating(): Promise<number> {
  const reviews = await getApprovedReviews();
  if (reviews.length === 0) return 0;
  return (
    Math.round(
      (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10
    ) / 10
  );
}
