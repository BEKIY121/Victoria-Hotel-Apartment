import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { getGalleryCategories } from "@/lib/data/gallery";
import { getRoomTypes } from "@/lib/data/rooms";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Explore Victoria Hotel Apartments in Addis Ababa — lobby, rooms, restaurant, fitness center, and property photos.",
};

export default async function GalleryPage() {
  const [categories, rooms] = await Promise.all([
    getGalleryCategories(),
    getRoomTypes(),
  ]);

  const roomGallery = {
    id: "rooms",
    label: "Rooms & Suites",
    images: rooms.flatMap((room) =>
      room.images.map((url, i) => ({
        id: `${room.slug}-${i}`,
        category: "rooms",
        title: room.name,
        url,
        sortOrder: i,
      }))
    ),
  };

  const allCategories = [...categories, roomGallery];

  return (
    <>
      <PageHero
        image="/images/gallery/property/03.webp"
        imageAlt="Victoria Hotel gallery"
        label="Gallery"
        title="Victoria Hotel Apartments"
        subtitle="Real photography of our rooms, lobby, restaurant, fitness center, and property — experience Victoria before you arrive."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid categories={allCategories} />
          <div className="text-center mt-16 pt-12 border-t border-stone">
            <p className="text-muted mb-6">
              Ready to book your stay at Victoria?
            </p>
            <Button href="/book">Check Availability</Button>
          </div>
        </div>
      </section>
    </>
  );
}
