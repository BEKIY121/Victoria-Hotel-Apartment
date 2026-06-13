"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const HERO_SLIDES = [
  {
    src: "/images/gallery/lobby/05.webp",
    alt: "Victoria Hotel elegant lobby",
    label: "Lobby & Reception",
  },
  {
    src: "/images/gallery/property/01.webp",
    alt: "Victoria Hotel luxury suite",
    label: "Luxury Suites",
  },
  {
    src: "/images/gallery/restaurant/01.webp",
    alt: "Victoria Hotel dining",
    label: "Dining & Lounge",
  },
] as const;

interface HeroBackgroundProps {
  activeIndex: number;
  onSelect?: (index: number) => void;
}

export function HeroBackground({ activeIndex, onSelect }: HeroBackgroundProps) {
  return (
    <>
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1800ms] ease-in-out",
            i === activeIndex ? "opacity-100 z-0" : "opacity-0 z-0"
          )}
          aria-hidden={i !== activeIndex}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className={cn(
              "object-cover",
              i === activeIndex && "hero-ken-burns"
            )}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 hero-gradient-mesh z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/45 to-charcoal/15 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20 z-[2]" />

      <div className="absolute bottom-32 lg:bottom-36 right-6 lg:right-10 z-20 hidden sm:flex flex-col gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => onSelect?.(i)}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Show ${slide.label}`}
          >
            <span
              className={cn(
                "text-[0.6rem] tracking-[0.15em] uppercase font-medium transition-all duration-300",
                i === activeIndex
                  ? "text-white opacity-100"
                  : "text-white/0 group-hover:text-white/60 opacity-0 group-hover:opacity-100"
              )}
            >
              {slide.label}
            </span>
            <span
              className={cn(
                "block transition-all duration-500 rounded-full",
                i === activeIndex
                  ? "w-8 h-[2px] bg-bronze-light"
                  : "w-2 h-2 bg-white/30 group-hover:bg-white/60"
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export function useHeroCarousel(intervalMs = 7000) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return { activeIndex, setActiveIndex, slide: HERO_SLIDES[activeIndex] };
}
