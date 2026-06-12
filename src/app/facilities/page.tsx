import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { facilitiesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Facilities & Amenities",
  description:
    "Discover facilities at Victoria Hotel Apartments — fitness center, restaurant, 24-hour reception, airport shuttle, laundry, and more in Addis Ababa.",
};

export default function FacilitiesPage() {
  return (
    <>
      <section className="relative min-h-[45vh] flex items-end -mt-16 lg:-mt-[6.25rem]">
        <Image
          src="/images/gallery/recreation/06.webp"
          alt="Victoria Hotel facilities"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
          <p className="section-label text-bronze-light mb-3">Facilities</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-normal text-white max-w-2xl">
            Facilities & Amenities
          </h1>
          <p className="text-white/70 mt-4 max-w-xl leading-relaxed">
            Everything you need for a comfortable stay — from fitness and dining
            to shuttle service and round-the-clock security.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Property"
            title="World-Class Facilities"
            subtitle="Designed for business travelers, families, and extended stays in the heart of Sarbet."
            className="mb-16"
          />

          <div className="space-y-20">
            {facilitiesContent.map((facility, index) => (
              <div
                key={facility.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="section-label mb-3">Facility</p>
                  <h2 className="font-serif text-3xl text-charcoal mb-4">
                    {facility.title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-6">
                    {facility.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {facility.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <Check className="w-4 h-4 text-bronze shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase font-semibold text-bronze hover:text-charcoal transition-colors"
                  >
                    View Photos <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-12 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">
                See it all in our gallery
              </h3>
              <p className="text-muted text-sm">
                Browse real photos of every facility and room type.
              </p>
            </div>
            <div className="flex gap-3">
              <Button href="/gallery" variant="secondary">
                Photo Gallery
              </Button>
              <Button href="/book">Book Now</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
