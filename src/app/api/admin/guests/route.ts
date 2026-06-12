import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  try {
    await requireAdminSession();
    const guests = await prisma.guest.findMany({
      include: {
        reservations: {
          include: { roomType: { select: { name: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(
      guests.map((g) => ({
        id: g.id,
        name: g.name,
        email: g.email,
        phone: g.phone,
        nationality: g.nationality,
        reservationCount: g.reservations.length,
        reservations: g.reservations.map((r) => ({
          refNumber: r.refNumber,
          roomName: r.roomType.name,
          checkIn: r.checkIn.toISOString().slice(0, 10),
          checkOut: r.checkOut.toISOString().slice(0, 10),
          status: r.status,
          totalAmount: Number(r.totalAmount),
        })),
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load guests" }, { status: 500 });
  }
}
