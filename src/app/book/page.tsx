import type { Metadata } from "next";
import Image from "next/image";
import { BookingFlow } from "@/components/booking/booking-flow";
import { BookingWidget } from "@/components/booking/booking-widget";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    "Check availability and book directly at Victoria Hotel Apartment, Addis Ababa. Best rates guaranteed.",
};

export default function BookPage() {
  return (
    <>
      {/* Hyatt-style booking hero */}
      <section className="relative bg-charcoal text-white pt-8 pb-32 lg:pb-40 -mt-16 lg:-mt-[6.25rem]">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt=""
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36">
          <p className="text-bronze-light text-xs tracking-[0.25em] uppercase mb-3">
            Reservations
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-normal mb-3">
            Book Your Stay
          </h1>
          <p className="text-white/60 max-w-lg">
            Complete your reservation in 4 simple steps. All prices include
            15% V.A.T.
          </p>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mt-10">
          <BookingWidget variant="hero" />
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
