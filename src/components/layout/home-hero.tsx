"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWidget } from "@/components/booking/booking-widget";
import {
  HeroBackground,
  useHeroCarousel,
} from "@/components/layout/hero-background";
import { HeroScrollHint } from "@/components/layout/hero-scroll-hint";
import { HeroThumbnailStrip } from "@/components/layout/hero-thumbnail-strip";
import { welcomeContent } from "@/lib/content";

interface HomeHeroProps {
  africanUnionDistanceMin: number;
  airportDistanceMin: number;
}

export function HomeHero({
  africanUnionDistanceMin,
  airportDistanceMin,
}: HomeHeroProps) {
  const { activeIndex, setActiveIndex, slide } = useHeroCarousel();

  return (
    <section className="relative min-h-[100svh] flex flex-col -mt-16 lg:-mt-[6.25rem] overflow-hidden">
      <HeroBackground activeIndex={activeIndex} />

      <div className="relative z-10 flex-1 flex flex-col justify-between min-h-[100svh] px-4 sm:px-6 lg:px-8 pt-28 lg:pt-36 pb-8">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="max-w-3xl animate-fade-up">
            <p className="brand-name brand-name-light mb-4">
              Victoria Hotel Apartments
            </p>
            <p className="text-bronze-light/90 font-serif text-lg sm:text-xl italic font-light mb-4">
              {slide.caption}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.02] tracking-tight mb-6">
              {welcomeContent.homeTagline}
            </h1>
            <p className="text-white/65 text-base sm:text-lg max-w-xl leading-relaxed font-light mb-8">
              Elegance and comfort in Sarbet, Pushkin Square —{" "}
              {africanUnionDistanceMin} min from the African Union,{" "}
              {airportDistanceMin} min from Bole Airport.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Button href="/book" variant="secondary" size="lg">
                Reserve Now
              </Button>
              <Button href="/rooms" variant="light" size="lg">
                Our Rooms
              </Button>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white/55 hover:text-white text-[0.7rem] tracking-[0.18em] uppercase font-semibold transition-colors py-3 px-2 group"
              >
                Discover
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-bronze-light shrink-0" />
                <span>{africanUnionDistanceMin} min · African Union</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Plane className="w-4 h-4 text-bronze-light shrink-0" />
                <span>{airportDistanceMin} min · Bole Airport</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full space-y-6 lg:space-y-8">
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <HeroThumbnailStrip
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          </div>
          <div className="animate-fade-up max-w-4xl" style={{ animationDelay: "280ms" }}>
            <BookingWidget variant="hero" />
          </div>
        </div>
      </div>

      <HeroScrollHint />
    </section>
  );
}
