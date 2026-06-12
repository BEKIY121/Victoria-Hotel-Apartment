import { prisma } from "@/lib/prisma";

export interface GalleryImage {
  id: string;
  category: string;
  title: string | null;
  url: string;
  sortOrder: number;
}

export interface GalleryCategory {
  id: string;
  label: string;
  images: GalleryImage[];
}

const CATEGORY_LABELS: Record<string, string> = {
  lobby: "Lobby & Reception",
  recreation: "Recreation & Fitness",
  restaurant: "Restaurant & Dining",
  property: "Property & Exterior",
  rooms: "Rooms & Suites",
};

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  try {
    const images = await prisma.galleryImage.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });

    if (images.length === 0) {
      return getFallbackGallery();
    }

    const grouped = new Map<string, GalleryImage[]>();
    for (const img of images) {
      const list = grouped.get(img.category) ?? [];
      list.push({
        id: img.id,
        category: img.category,
        title: img.title,
        url: img.url,
        sortOrder: img.sortOrder,
      });
      grouped.set(img.category, list);
    }

    return Array.from(grouped.entries()).map(([id, imgs]) => ({
      id,
      label: CATEGORY_LABELS[id] ?? id,
      images: imgs,
    }));
  } catch {
    return getFallbackGallery();
  }
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const categories = await getGalleryCategories();
  return categories.flatMap((c) => c.images);
}

function getFallbackGallery(): GalleryCategory[] {
  const fallback: { id: string; prefix: string; count: number }[] = [
    { id: "lobby", prefix: "/images/gallery/lobby", count: 16 },
    { id: "recreation", prefix: "/images/gallery/recreation", count: 18 },
    { id: "restaurant", prefix: "/images/gallery/restaurant", count: 7 },
    { id: "property", prefix: "/images/gallery/property", count: 8 },
  ];

  return fallback.map(({ id, prefix, count }) => ({
    id,
    label: CATEGORY_LABELS[id] ?? id,
    images: Array.from({ length: count }, (_, i) => ({
      id: `${id}-${i + 1}`,
      category: id,
      title: CATEGORY_LABELS[id] ?? null,
      url: `${prefix}/${String(i + 1).padStart(2, "0")}.webp`,
      sortOrder: i,
    })),
  }));
}
