import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, country, rating, text, roomTypeId } = await request.json();

    if (!name?.trim() || !country?.trim() || !text?.trim()) {
      return NextResponse.json(
        { error: "Name, country, and review text are required" },
        { status: 400 }
      );
    }

    const stars = Number(rating);
    if (!stars || stars < 1 || stars > 5) {
      return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 });
    }

    if (roomTypeId) {
      const room = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
      if (!room) {
        return NextResponse.json({ error: "Invalid room" }, { status: 400 });
      }
    }

    const review = await prisma.review.create({
      data: {
        name: name.trim(),
        country: country.trim(),
        rating: stars,
        text: text.trim(),
        roomTypeId: roomTypeId || null,
        approved: false,
      },
    });

    return NextResponse.json({ id: review.id, message: "Review submitted for approval" });
  } catch (error) {
    console.error("POST /api/reviews:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
