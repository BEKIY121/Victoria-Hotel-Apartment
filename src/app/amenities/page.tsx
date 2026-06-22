import type { Metadata } from "next";
import {
  Wifi,
  Coffee,
  Car,
  Dumbbell,
  Shirt,
  Shield,
  Clock,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { hotelAdvantages } from "@/lib/content";
import { brandImages } from "@/lib/brand-images";
import { amenitiesList } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "Complimentary breakfast, free WiFi, shuttle service, fitness center, laundry, and 24/7 security at Victoria Hotel Apartments, Addis Ababa.",
};

const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  breakfast: Coffee,
  shuttle: Car,
  fitness: Dumbbell,
  laundry: Shirt,
  security: Shield,
  reception: Clock,
  roomservice: UtensilsCrossed,
};

export default function AmenitiesPage() {
  return (
    <>
      <PageHero
        image={brandImages.kitchenette}
        imageAlt="Hotel amenities"
        editorial
        editorialTitle="Amenities"
        brandName="Victoria Hotel Apartments"
        tagline="Included with every stay"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Hotel Amenities"
            title="What's Included"
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {amenitiesList.map((item) => {
              const Icon = iconMap[item.icon] ?? Shield;
              return (
                <div
                  key={item.label}
                  className="bg-white border border-stone p-6 text-center card-luxury"
                >
                  <div className="w-12 h-12 mx-auto mb-4 border border-stone flex items-center justify-center">
                    <Icon className="w-5 h-5 text-bronze" />
                  </div>
                  <p className="text-sm font-medium text-charcoal">{item.label}</p>
                </div>
              );
            })}
          </div>

          <SectionHeading
            label="Why Victoria"
            title="The Victoria Advantage"
            subtitle="Direct booking guests enjoy the best rates and full access to every amenity."
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotelAdvantages.map((item) => (
              <div
                key={item.title}
                className="border-b border-stone pb-6 last:border-0"
              >
                <h3 className="font-serif text-xl text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 pt-12 border-t border-stone">
            <Button href="/facilities" variant="secondary" className="mr-3">
              View Facilities
            </Button>
            <Button href="/book">Book Direct & Save</Button>
          </div>
        </div>
      </section>
    </>
  );
}
