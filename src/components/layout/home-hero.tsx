"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Plane, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWidget } from "@/components/booking/booking-widget";
import {
  HeroBackground,
  useHeroCarousel,
} from "@/components/layout/hero-background";
import { HeroScrollHint } from "@/components/layout/hero-scroll-hint";
import { HeroStatPill } from "@/components/layout/hero-stat-pill";
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
      <HeroBackground activeIndex={activeIndex} onSelect={setActiveIndex} />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,44%)_1fr] min-h-[100svh]">
        <div className="hero-split-panel flex flex-col justify-between px-6 sm:px-8 lg:px-10 xl:px-12 pt-28 lg:pt-32 pb-8 lg:pb-10">
          <div>
            <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-6 animate-fade-up">
              <Sparkles className="w-3.5 h-3.5 text-bronze-light" />
              <span className="text-[0.6rem] tracking-[0.2em] uppercase text-white/80 font-semibold">
                Direct Booking · Best Rate
              </span>
            </div>

            <p className="brand-name brand-name-light mb-3 animate-fade-up">
              Victoria Hotel Apartments
            </p>
            <p
              className="home-tagline mb-5 max-w-md animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {welcomeContent.homeTagline}
            </p>

            <div className="mb-6 lg:hidden animate-fade-up" style={{ animationDelay: "120ms" }}>
              <h1 className="font-serif text-5xl sm:text-6xl font-light text-white leading-[1.05] tracking-tight">
                Victoria
                <br />
                <span className="text-white/90">Apartments</span>
              </h1>
            </div>

            <p
              className="text-white/60 text-sm lg:text-base max-w-md leading-relaxed font-light mb-8 animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              Elegance, comfort, and affordability in Sarbet, Pushkin Square —
              {africanUnionDistanceMin} min from the African Union,{" "}
              {airportDistanceMin} min from the airport.
            </p>

            <div
              className="flex flex-wrap items-center gap-3 mb-8 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <Button href="/book" variant="secondary" size="lg">
                Reserve Now
              </Button>
              <Button href="/rooms" variant="glass" size="lg">
                Our Rooms
              </Button>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white/55 hover:text-white text-[0.65rem] tracking-[0.2em] uppercase font-semibold transition-colors py-3 px-2 group"
              >
                Discover More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="hidden lg:grid grid-cols-1 gap-2 max-w-xs">
              <HeroStatPill
                icon={MapPin}
                value={`${africanUnionDistanceMin} Min`}
                label="From African Union"
                delay={240}
              />
              <HeroStatPill
                icon={Plane}
                value={`${airportDistanceMin} Min`}
                label="From Bole Airport"
                delay={320}
              />
            </div>
          </div>

          <div
            className="animate-fade-up mt-8 lg:mt-6"
            style={{ animationDelay: "280ms" }}
          >
            <BookingWidget variant="hero" />
          </div>
        </div>

        <div className="relative hidden lg:flex flex-col justify-center px-8 xl:px-14 pb-24">
          <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-bronze-light mb-6 font-semibold">
              {slide.label}
            </p>
            <h1 className="font-serif font-light leading-[0.92] tracking-tight">
              <span
                className="hero-text-mask block text-[clamp(4.5rem,9vw,8rem)]"
                style={{ backgroundImage: `url(${slide.src})` }}
              >
                Victoria
              </span>
              <span className="block text-[clamp(3.5rem,7vw,6.5rem)] text-white mt-1">
                Apartments
              </span>
            </h1>
          </div>

          <div
            className="absolute bottom-28 right-0 xl:right-4 w-52 xl:w-60 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="hero-floating-card p-5 rounded-2xl">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              </div>
              <p className="text-[0.6rem] tracking-[0.2em] uppercase text-bronze-light font-semibold mb-1">
                Now Showing
              </p>
              <p className="text-sm text-white/80 font-light">{slide.label}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block z-20 pointer-events-none">
        <span className="vertical-accent">Sarbet · Addis Ababa</span>
      </div>

      <HeroScrollHint />
    </section>
  );
}
