import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/admin-session";
import type { SiteSettings } from "@/lib/types";
import { getSiteSettings } from "@/lib/data/settings";

export async function GET() {
  try {
    await requireAdminSession();
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdminSession();
    const body = (await request.json()) as Partial<SiteSettings>;
    const current = await getSiteSettings();
    const updated = { ...current, ...body };

    await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: { data: updated },
      create: { id: "default", data: updated },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
