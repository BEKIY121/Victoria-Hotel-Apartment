import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernSection } from "@/components/ui/modern-section";
import { Reveal } from "@/components/ui/reveal";
import { brandImages } from "@/lib/brand-images";

interface OverlappingShowcaseProps {
  imagePrimary: string;
  imageSecondary: string;
  label: string;
  title: string;
  description: string;
  href: string;
  linkLabel?: string;
  reversed?: boolean;
}

export function OverlappingShowcase({
  imagePrimary,
  imageSecondary,
  label,
  title,
  description,
  href,
  linkLabel = "Learn More",
  reversed = false,
}: OverlappingShowcaseProps) {
  return (
    <ModernSection variant="accent" className="!py-20 lg:!py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal className="relative h-[420px] sm:h-[480px]">
            <div className="img-hover-wrap absolute top-0 left-0 w-[58%] h-[75%] rounded-2xl overflow-hidden shadow-elevated z-10">
              <Image
                src={imagePrimary}
                alt=""
                fill
                className="object-cover img-hover-zoom"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="img-hover-shine" aria-hidden />
            </div>
            <div className="img-hover-wrap absolute bottom-0 right-0 w-[58%] h-[75%] rounded-2xl overflow-hidden shadow-elevated z-20">
              <Image
                src={imageSecondary}
                alt=""
                fill
                className="object-cover img-hover-zoom"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="img-hover-shine" aria-hidden />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-sage/10 blur-2xl" aria-hidden />
          </Reveal>

          <Reveal delay={120}>
            <p className="section-label mb-4">{label}</p>
            <h2 className="section-title mb-2">{title}</h2>
            <span className="section-title-accent block mb-6" aria-hidden />
            <p className="section-subtitle mb-8">{description}</p>
            <Button href={href} variant="outline">
              {linkLabel} <ArrowRight className="w-4 h-4" />
            </Button>
          </Reveal>
        </div>
      </div>
    </ModernSection>
  );
}

export function BrandBandSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-sage" />
      <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage to-sage-dark opacity-95" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.3em] uppercase text-white/70 font-semibold mb-4">
              Direct Booking
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight mb-6">
              Book direct &amp; save 10%
            </h2>
            <p className="text-white/75 leading-relaxed mb-8 max-w-md">
              Skip the OTAs — best rates, instant confirmation, complimentary
              breakfast, and personal service from our reservations team.
            </p>
            <ul className="space-y-3 text-white/80 text-sm mb-10">
              {[
                "Complimentary breakfast for direct guests",
                "Free airport shuttle on request",
                "24-hour reception & housekeeping",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze-light shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button href="/book" variant="secondary" size="lg">
                Book Direct & Save
              </Button>
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase font-semibold text-white/80 hover:text-white transition-colors py-4"
              >
                View Rooms <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="img-hover-wrap relative aspect-[4/5] max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-2xl overflow-hidden shadow-elevated-lg">
            <Image
              src={brandImages.breakfast}
              alt="Breakfast served in a Victoria suite"
              fill
              className="object-cover img-hover-zoom"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
            <div className="img-hover-shine" aria-hidden />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-2xl pointer-events-none" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
