import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  try {
    await requireAdminSession();
    const rates = await prisma.seasonalRate.findMany({
      include: { roomType: { select: { name: true } } },
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json(
      rates.map((r) => ({
        id: r.id,
        roomTypeId: r.roomTypeId,
        roomName: r.roomType.name,
        name: r.name,
        startDate: r.startDate.toISOString().slice(0, 10),
        endDate: r.endDate.toISOString().slice(0, 10),
        priceMultiplier: r.priceMultiplier ? Number(r.priceMultiplier) : null,
        fixedPrice: r.fixedPrice ? Number(r.fixedPrice) : null,
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load rates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();

    const rate = await prisma.seasonalRate.create({
      data: {
        roomTypeId: body.roomTypeId,
        name: body.name,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        priceMultiplier: body.priceMultiplier ?? null,
        fixedPrice: body.fixedPrice ?? null,
      },
    });

    return NextResponse.json({ id: rate.id });
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
    await prisma.seasonalRate.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
