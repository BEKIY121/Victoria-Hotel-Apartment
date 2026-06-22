import Image from "next/image";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface HoverImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
  aspect?: string;
  rounded?: string;
}

export function HoverImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = "100vw",
  priority = false,
  children,
  aspect,
  rounded = "rounded-2xl",
}: HoverImageProps) {
  return (
    <div
      className={cn(
        "img-hover-wrap group relative overflow-hidden",
        rounded,
        aspect,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn("object-cover img-hover-zoom", imageClassName)}
        sizes={sizes}
      />
      <div className="img-hover-shine" aria-hidden />
      {children}
    </div>
  );
}

interface HoverBgPanelProps {
  image: string;
  className?: string;
  children: ReactNode;
  minHeight?: string;
  parallax?: boolean;
}

export function HoverBgPanel({
  image,
  className,
  children,
  minHeight = "min-h-[380px]",
  parallax = false,
}: HoverBgPanelProps) {
  return (
    <div
      className={cn(
        "img-hover-wrap group relative overflow-hidden isolate",
        minHeight,
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat",
          parallax ? "bg-parallax" : "img-hover-zoom"
        )}
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="img-hover-shine" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/10 transition-opacity duration-500 group-hover:from-charcoal/80 z-[1]" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
