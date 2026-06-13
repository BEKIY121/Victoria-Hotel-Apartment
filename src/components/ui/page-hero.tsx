import Image from "next/image";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface PageHeroProps {
  image: string;
  imageAlt: string;
  label?: string;
  title?: string;
  subtitle?: string;
  editorial?: boolean;
  editorialTitle?: string;
  brandName?: string;
  tagline?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  image,
  imageAlt,
  label,
  title,
  subtitle,
  editorial = false,
  editorialTitle,
  brandName,
  tagline,
  align = "left",
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-[55vh] lg:min-h-[60vh] flex items-end -mt-16 lg:-mt-[6.25rem] overflow-hidden",
        className
      )}
    >
      <Image src={image} alt={imageAlt} fill className="object-cover" priority />
      <div className="absolute inset-0 page-hero-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-12 lg:pb-16">
        <div
          className={cn(
            "page-hero-glass max-w-2xl p-8 lg:p-10 animate-fade-up",
            align === "center" && "mx-auto text-center max-w-3xl"
          )}
        >
          {editorial ? (
            <>
              <h1 className="editorial-title text-white mb-4">
                <span className="italic font-light">{editorialTitle}</span>
              </h1>
              {brandName && (
                <p className="brand-name brand-name-light mb-4">{brandName}</p>
              )}
              {tagline && <p className="home-tagline">{tagline}</p>}
            </>
          ) : (
            <>
              {label && (
                <p className="text-[0.65rem] tracking-[0.3em] uppercase text-bronze-light mb-4 font-semibold">
                  {label}
                </p>
              )}
              {title && (
                <h1 className="font-serif text-4xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-4 text-white/60 text-base lg:text-lg leading-relaxed max-w-lg mx-auto">
                  {subtitle}
                </p>
              )}
            </>
          )}
          {children}
        </div>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block">
        <span className="vertical-accent">Victoria Hotel</span>
      </div>
    </section>
  );
}
