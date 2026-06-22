import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ModernSectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "white" | "accent";
  decorative?: boolean;
  id?: string;
}

const variants = {
  default: "modern-section-default",
  muted: "modern-section-muted",
  white: "modern-section-white",
  accent: "modern-section-accent",
};

export function ModernSection({
  children,
  className,
  variant = "muted",
  decorative = true,
  id,
}: ModernSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "modern-section relative overflow-hidden py-20 lg:py-28",
        variants[variant],
        className
      )}
    >
      {decorative && (
        <>
          <div className="modern-section-grid pointer-events-none" aria-hidden />
          <div className="modern-section-orb modern-section-orb-a pointer-events-none" aria-hidden />
          <div className="modern-section-orb modern-section-orb-b pointer-events-none" aria-hidden />
          <div className="modern-section-line pointer-events-none" aria-hidden />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

/** Compact band for section intros (rooms header, etc.) */
export function ModernSectionIntro({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "modern-section-intro relative overflow-hidden py-16 lg:py-20",
        className
      )}
    >
      <div className="modern-section-grid pointer-events-none opacity-40" aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
