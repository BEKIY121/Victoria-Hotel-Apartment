import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  animated?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
  light = false,
  animated = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "section-heading group",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className={cn("section-label mb-3", light && "text-bronze-light")}>
          {label}
        </p>
      )}
      <h2
        className={cn(
          "section-title",
          light && "text-white"
        )}
      >
        {title}
      </h2>
      {animated && (
        <span
          className={cn(
            "section-title-accent",
            align === "center" && "mx-auto",
            light && "section-title-accent-light"
          )}
          aria-hidden
        />
      )}
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-white/70" : "text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
