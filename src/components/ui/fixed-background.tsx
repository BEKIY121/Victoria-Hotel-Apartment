import { cn } from "@/lib/utils";

interface FixedBackgroundProps {
  image: string;
  alt?: string;
  className?: string;
  /** Use fixed attachment on desktop (parallax). Falls back to scroll on mobile. */
  parallax?: boolean;
}

export function FixedBackground({
  image,
  alt = "",
  className,
  parallax = true,
}: FixedBackgroundProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-cover bg-center bg-no-repeat",
        parallax ? "bg-parallax" : "bg-scroll",
        className
      )}
      style={{ backgroundImage: `url(${image})` }}
      role="img"
      aria-label={alt}
    />
  );
}
