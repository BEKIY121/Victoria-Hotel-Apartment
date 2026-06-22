import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { PageHero } from "@/components/ui/page-hero";
import { SplitFeatureHeading } from "@/components/ui/split-feature-heading";
import { ImmersiveBand } from "@/components/ui/immersive-band";
import { facilitiesContent } from "@/lib/content";
import { brandImages } from "@/lib/brand-images";

export const metadata: Metadata = {
  title: "Facilities & Amenities",
  description:
    "Discover facilities at Victoria Hotel Apartments — fitness center, restaurant, 24-hour reception, airport shuttle, laundry, and more in Addis Ababa.",
};

function splitTitle(title: string): { primary: string; secondary: string } {
  const parts = title.split(" ");
  if (parts.length <= 1) return { primary: title, secondary: "" };
  const mid = Math.ceil(parts.length / 2);
  return {
    primary: parts.slice(0, mid).join(" "),
    secondary: parts.slice(mid).join(" "),
  };
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        image={brandImages.wellness}
        imageAlt="Victoria Hotel facilities"
        editorial
        editorialTitle="Facilities"
        brandName="Victoria Hotel Apartments"
        tagline="World-class amenities for every guest"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <EditorialHeading
              italic="Our"
              emphasis="Property"
              subtitle="Facilities & Amenities"
              align="center"
            />
            <p className="mt-6 text-muted max-w-2xl mx-auto leading-relaxed">
              Designed for business travelers, families, and extended stays in
              the heart of Sarbet.
            </p>
          </div>

          <div className="space-y-24">
            {facilitiesContent.map((facility, index) => {
              const { primary, secondary } = splitTitle(facility.title);
              return (
                <div
                  key={facility.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`img-hover-wrap relative aspect-[4/3] overflow-hidden rounded-2xl ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover img-hover-zoom"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="img-hover-shine" aria-hidden />
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <SplitFeatureHeading primary={primary} secondary={secondary} />
                    <p className="text-muted leading-relaxed mb-6 mt-4">
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
                      className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-bronze hover:text-charcoal transition-colors"
                    >
                      View Photos <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 pt-12 border-t border-stone/60">
            <div className="glass-card rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <EditorialHeading italic="See it" emphasis="all" suffix="in our gallery" />
                <p className="text-muted text-sm mt-3">
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
        </div>
      </section>

      <ImmersiveBand
        image={brandImages.dining}
        imageAlt="Victoria Hotel dining"
        label="Experience"
        title="Everything you need, under one roof"
        description="From fitness and dining to 24-hour reception and airport shuttle — Victoria has it all."
        overlay="warm"
        parallax
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/gallery" variant="secondary" size="lg">
            View Gallery
          </Button>
          <Button href="/book" variant="light" size="lg">
            Book Your Stay
          </Button>
        </div>
      </ImmersiveBand>
    </>
  );
}
