"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/lib/brand-images";

interface HeroBackgroundProps {
  activeIndex: number;
  onSelect?: (index: number) => void;
}

export function HeroBackground({ activeIndex }: HeroBackgroundProps) {
  return (
    <>
      {heroSlides.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
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
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/25 to-charcoal/65 z-[2]" />
    </>
  );
}

export function useHeroCarousel(intervalMs = 6000) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroSlides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return { activeIndex, setActiveIndex, slide: heroSlides[activeIndex] };
}
