import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  try {
    await requireAdminSession();
    const blocks = await prisma.availabilityBlock.findMany({
      orderBy: { startDate: "asc" },
    });
    const roomIds = blocks
      .map((b) => b.roomTypeId)
      .filter(Boolean) as string[];
    const rooms =
      roomIds.length > 0
        ? await prisma.roomType.findMany({
            where: { id: { in: roomIds } },
            select: { id: true, name: true },
          })
        : [];
    const roomNames = new Map(rooms.map((r) => [r.id, r.name]));

    return NextResponse.json(
      blocks.map((b) => ({
        id: b.id,
        roomTypeId: b.roomTypeId,
        roomName: b.roomTypeId ? roomNames.get(b.roomTypeId) : "All rooms",
        startDate: b.startDate.toISOString().slice(0, 10),
        endDate: b.endDate.toISOString().slice(0, 10),
        reason: b.reason,
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load blocks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();

    const block = await prisma.availabilityBlock.create({
      data: {
        roomTypeId: body.roomTypeId || null,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        reason: body.reason || null,
      },
    });

    return NextResponse.json({ id: block.id });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Create failed" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminSession();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    await prisma.availabilityBlock.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
