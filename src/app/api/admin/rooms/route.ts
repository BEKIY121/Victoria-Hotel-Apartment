import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  try {
    await requireAdminSession();
    const rooms = await prisma.roomType.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(
      rooms.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        basePrice: Number(r.basePrice),
        inventory: r.inventory,
        capacity: r.capacity,
        active: r.active,
        sizeSqm: Number(r.sizeSqm),
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load rooms" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const { id, basePrice, inventory, active } = body;

    if (!id) {
      return NextResponse.json({ error: "Room id required" }, { status: 400 });
    }

    const room = await prisma.roomType.update({
      where: { id },
      data: {
        ...(basePrice !== undefined ? { basePrice } : {}),
        ...(inventory !== undefined ? { inventory: Number(inventory) } : {}),
        ...(active !== undefined ? { active: Boolean(active) } : {}),
      },
    });

    return NextResponse.json({
      id: room.id,
      name: room.name,
      basePrice: Number(room.basePrice),
      inventory: room.inventory,
      active: room.active,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
