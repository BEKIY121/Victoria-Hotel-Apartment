import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  try {
    await requireAdminSession();
    const promotions = await prisma.promotion.findMany({
      include: { rooms: { include: { roomType: { select: { name: true } } } } },
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(
      promotions.map((p) => ({
        id: p.id,
        code: p.code,
        name: p.name,
        discountType: p.discountType,
        discountValue: Number(p.discountValue),
        startDate: p.startDate.toISOString().slice(0, 10),
        endDate: p.endDate.toISOString().slice(0, 10),
        active: p.active,
        rooms: p.rooms.map((r) => ({
          roomTypeId: r.roomTypeId,
          roomName: r.roomType.name,
        })),
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();

    const promo = await prisma.promotion.create({
      data: {
        code: body.code.trim().toUpperCase(),
        name: body.name,
        discountType: body.discountType,
        discountValue: body.discountValue,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        active: body.active ?? true,
        rooms: body.roomTypeIds?.length
          ? {
              create: body.roomTypeIds.map((roomTypeId: string) => ({
                roomTypeId,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json({ id: promo.id, code: promo.code });
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
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await prisma.promotion.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
