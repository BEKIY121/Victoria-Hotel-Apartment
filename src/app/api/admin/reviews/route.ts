import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  try {
    await requireAdminSession();
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    const roomIds = reviews.map((r) => r.roomTypeId).filter(Boolean) as string[];
    const rooms =
      roomIds.length > 0
        ? await prisma.roomType.findMany({
            where: { id: { in: roomIds } },
            select: { id: true, name: true },
          })
        : [];
    const roomNames = new Map(rooms.map((r) => [r.id, r.name]));

    return NextResponse.json(
      reviews.map((r) => ({
        id: r.id,
        name: r.name,
        country: r.country,
        rating: r.rating,
        text: r.text,
        approved: r.approved,
        roomName: r.roomTypeId ? roomNames.get(r.roomTypeId) : null,
        createdAt: r.createdAt.toISOString().slice(0, 10),
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();
    const { id, approved } = await request.json();
    if (!id || approved === undefined) {
      return NextResponse.json({ error: "id and approved required" }, { status: 400 });
    }
    const review = await prisma.review.update({
      where: { id },
      data: { approved: Boolean(approved) },
    });
    return NextResponse.json({ id: review.id, approved: review.approved });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
