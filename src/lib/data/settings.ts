import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/lib/types";
import { siteSettings as fallbackSettings } from "@/lib/mock-data";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const row = await prisma.siteSetting.findUnique({
      where: { id: "default" },
    });
    if (!row?.data) return fallbackSettings;
    return row.data as unknown as SiteSettings;
  } catch {
    return fallbackSettings;
  }
}
