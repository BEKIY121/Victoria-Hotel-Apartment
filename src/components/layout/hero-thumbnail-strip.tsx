"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/lib/brand-images";

interface HeroThumbnailStripProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function HeroThumbnailStrip({
  activeIndex,
  onSelect,
}: HeroThumbnailStripProps) {
  const prev = () =>
    onSelect((activeIndex - 1 + heroSlides.length) % heroSlides.length);
  const next = () => onSelect((activeIndex + 1) % heroSlides.length);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <button
        type="button"
        onClick={prev}
        className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-white/25 text-white/70 hover:bg-white/10 hover:text-white transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              "group relative overflow-hidden rounded-lg transition-all duration-500",
              i === activeIndex
                ? "img-hover-wrap w-24 sm:w-32 h-16 sm:h-20 ring-2 ring-bronze-light ring-offset-2 ring-offset-transparent scale-105"
                : "img-hover-wrap w-16 sm:w-20 h-14 sm:h-16 opacity-60 hover:opacity-90"
            )}
            aria-label={`Show ${slide.label}`}
            aria-current={i === activeIndex}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              className="object-cover img-hover-zoom"
              sizes="128px"
            />
            <div
              className={cn(
                "absolute inset-0 transition-colors",
                i === activeIndex ? "bg-charcoal/10" : "bg-charcoal/30"
              )}
            />
            {i === activeIndex && (
              <span className="absolute bottom-1 left-0 right-0 text-center text-[0.5rem] tracking-[0.15em] uppercase text-white font-semibold drop-shadow">
                {slide.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={next}
        className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full border border-white/25 text-white/70 hover:bg-white/10 hover:text-white transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
