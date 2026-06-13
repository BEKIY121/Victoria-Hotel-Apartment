import { cn } from "@/lib/utils";

interface SplitFeatureHeadingProps {
  primary: string;
  secondary: string;
  light?: boolean;
  className?: string;
}

export function SplitFeatureHeading({
  primary,
  secondary,
  light = false,
  className,
}: SplitFeatureHeadingProps) {
  return (
    <h3 className={cn("split-feature-heading", className)}>
      <span
        className={cn(
          "block font-serif text-2xl lg:text-3xl font-medium tracking-tight",
          light ? "text-white" : "text-charcoal"
        )}
      >
        {primary}
      </span>
      {secondary && (
        <span
          className={cn(
            "block font-serif text-xl lg:text-2xl font-light italic mt-1",
            light ? "text-white/60" : "text-muted"
          )}
        >
          {secondary}
        </span>
      )}
    </h3>
  );
}
