import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";

export async function GET() {
  try {
    await requireAdminSession();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);

    const [rooms, reservations, payments, guests] = await Promise.all([
      prisma.roomType.findMany({ where: { active: true } }),
      prisma.reservation.findMany({
        where: {
          status: { in: ["confirmed", "checked_in", "pending"] },
        },
      }),
      prisma.payment.findMany({ where: { status: "paid" } }),
      prisma.guest.count(),
    ]);

    const totalInventory = rooms.reduce((s, r) => s + r.inventory, 0);

    const activeToday = reservations.filter(
      (r) =>
        (r.status === "confirmed" || r.status === "checked_in") &&
        r.checkIn.toISOString().slice(0, 10) <= todayStr &&
        r.checkOut.toISOString().slice(0, 10) > todayStr
    ).length;

    const occupancyRate =
      totalInventory > 0
        ? Math.round((activeToday / totalInventory) * 100)
        : 0;

    const todayArrivals = reservations.filter(
      (r) =>
        r.checkIn.toISOString().slice(0, 10) === todayStr &&
        (r.status === "confirmed" || r.status === "checked_in")
    ).length;

    const todayDepartures = reservations.filter(
      (r) =>
        r.checkOut.toISOString().slice(0, 10) === todayStr &&
        r.status === "checked_in"
    ).length;

    const totalRevenue = payments.reduce(
      (s, p) => s + Number(p.amount),
      0
    );

    const statusCounts = {
      pending: reservations.filter((r) => r.status === "pending").length,
      confirmed: reservations.filter((r) => r.status === "confirmed").length,
      checked_in: reservations.filter((r) => r.status === "checked_in").length,
      cancelled: await prisma.reservation.count({
        where: { status: "cancelled" },
      }),
    };

    return NextResponse.json({
      totalRooms: totalInventory,
      occupancyRate,
      activeBookings: activeToday,
      todayArrivals,
      todayDepartures,
      totalRevenue,
      totalGuests: guests,
      totalReservations: await prisma.reservation.count(),
      statusCounts,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }
}
