import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/booking-flow";
import { BookingWidget } from "@/components/booking/booking-widget";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Check availability and book directly at Victoria Hotel Apartment, Addis Ababa. Best rates guaranteed.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        image="/images/gallery/lobby/05.webp"
        imageAlt="Book your stay"
        label="Reservations"
        title="Book Your Stay"
        subtitle="Complete your reservation in 4 simple steps. All prices include 15% V.A.T."
      />

      <section className="py-8 lg:py-10 bg-warm-gray/80 -mt-8 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <BookingWidget variant="inline" />
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingFlow />
        </div>
      </section>
    </>
  );
}
