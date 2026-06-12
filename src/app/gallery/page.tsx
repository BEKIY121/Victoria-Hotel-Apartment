import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Button } from "@/components/ui/button";
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
      <section className="bg-charcoal text-white pt-28 pb-16 -mt-16 lg:-mt-[6.25rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label text-bronze-light mb-3">Gallery</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-normal mb-4">
            Victoria Hotel Apartments
          </h1>
          <p className="text-white/60 max-w-xl leading-relaxed">
            Real photography of our rooms, lobby, restaurant, fitness center,
            and property — experience Victoria before you arrive.
          </p>
        </div>
      </section>

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
