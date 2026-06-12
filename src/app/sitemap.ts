import type { MetadataRoute } from "next";
import { getRoomTypes } from "@/lib/data/rooms";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rooms = await getRoomTypes();
  const staticPages = [
    "",
    "/about",
    "/rooms",
    "/gallery",
    "/facilities",
    "/amenities",
    "/reviews",
    "/contact",
    "/book",
    "/booking/lookup",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...rooms.map((room) => ({
      url: `${BASE_URL}/rooms/${room.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
