import { cn } from "@/lib/utils";
import { FixedBackground } from "@/components/ui/fixed-background";
import { Reveal } from "@/components/ui/reveal";
import { type ReactNode } from "react";

interface ImmersiveBandProps {
  image: string;
  imageAlt?: string;
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  overlay?: "dark" | "sage" | "warm";
  /** Fixed parallax background on desktop — does not scroll with content */
  parallax?: boolean;
  wide?: boolean;
  className?: string;
  children?: ReactNode;
  size?: "md" | "lg";
}

const overlayClasses = {
  dark: "bg-charcoal/55",
  sage: "bg-sage/75",
  warm: "bg-gradient-to-br from-charcoal/60 via-bronze-dark/30 to-charcoal/50",
};

export function ImmersiveBand({
  image,
  imageAlt = "",
  label,
  title,
  description,
  align = "center",
  overlay = "dark",
  parallax = true,
  wide = false,
  className,
  children,
  size = "lg",
}: ImmersiveBandProps) {
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "immersive-band relative overflow-hidden isolate",
        size === "lg" ? "py-24 lg:py-32" : "py-20 lg:py-28",
        className
      )}
    >
      <FixedBackground image={image} alt={imageAlt} parallax={parallax} />
      <div className={cn("absolute inset-0 z-[1]", overlayClasses[overlay])} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-charcoal/40 via-transparent to-charcoal/20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          className={cn(
            "relative",
            wide
              ? "max-w-none text-center"
              : isCenter
                ? "max-w-4xl mx-auto text-center"
                : "max-w-3xl"
          )}
        >
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-bronze-light mb-4 font-semibold">
            {label}
          </p>
          <h2
            className={cn(
              "font-serif font-light text-white tracking-tight leading-tight mb-5",
              size === "lg"
                ? "text-4xl lg:text-5xl xl:text-6xl"
                : "text-3xl lg:text-4xl"
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "text-white/60 leading-relaxed mb-10",
                isCenter ? "max-w-lg mx-auto" : "max-w-xl"
              )}
            >
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
