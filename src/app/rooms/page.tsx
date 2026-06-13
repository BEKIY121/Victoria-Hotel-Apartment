import type { Metadata } from "next";
import { RoomCard } from "@/components/rooms/room-card";
import { RoomComparison } from "@/components/rooms/room-comparison";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { BookingWidget } from "@/components/booking/booking-widget";
import { getRoomTypes, getSeasonalPricing } from "@/lib/data/rooms";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Browse all rooms at Victoria Hotel Apartments, Addis Ababa. Standard, Deluxe, Deluxe Suite, Luxury Suite & Family Room with live direct pricing.",
};

export default async function RoomsPage() {
  const [roomTypes, seasonalPricing] = await Promise.all([
    getRoomTypes(),
    getSeasonalPricing(),
  ]);

  return (
    <>
      <PageHero
        image="/images/gallery/property/02.webp"
        imageAlt="Victoria Hotel rooms"
        label="Accommodation"
        title="Rooms & Suites"
        subtitle={`${roomTypes.length} room types · From $71/night — select dates for live pricing on our best direct rates.`}
      />

      <section className="py-12 lg:py-16 bg-warm-gray/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWidget variant="inline" />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="All Rooms"
            title="Find Your Perfect Stay"
            subtitle="Each room is designed for comfort — from solo business trips to family holidays and extended stays."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {roomTypes.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                seasonalPricing={seasonalPricing}
              />
            ))}
          </div>
        </div>
      </section>

      <RoomComparison rooms={roomTypes} />
    </>
  );
}
