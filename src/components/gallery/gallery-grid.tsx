"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/data/gallery";

interface GalleryGridProps {
  categories: {
    id: string;
    label: string;
    images: GalleryImage[];
  }[];
  showFilters?: boolean;
}

export function GalleryGrid({ categories, showFilters = true }: GalleryGridProps) {
  const allImages = categories.flatMap((c) =>
    c.images.map((img) => ({ ...img, categoryLabel: c.label }))
  );

  const [filter, setFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    filter === "all"
      ? allImages
      : allImages.filter((img) => img.category === filter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <>
      {showFilters && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-medium border transition-colors ${
              filter === "all"
                ? "bg-charcoal text-white border-charcoal"
                : "border-stone text-muted hover:border-charcoal hover:text-charcoal"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-medium border transition-colors ${
                filter === cat.id
                  ? "bg-charcoal text-white border-charcoal"
                  : "border-stone text-muted hover:border-charcoal hover:text-charcoal"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {filtered.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => openLightbox(index)}
            className={`relative overflow-hidden group cursor-pointer ${
              index % 7 === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
            }`}
          >
            <Image
              src={img.url}
              alt={img.title ?? "Victoria Hotel Apartments"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-[4/3] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].url}
              alt={filtered[lightboxIndex].title ?? "Gallery photo"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <p className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-sm">
            {filtered[lightboxIndex].categoryLabel} · {lightboxIndex + 1} /{" "}
            {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}
