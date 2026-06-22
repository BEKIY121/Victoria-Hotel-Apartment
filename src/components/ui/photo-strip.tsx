import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoStripProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function PhotoStrip({ images, className }: PhotoStripProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3",
        className
      )}
    >
      {images.map((img) => (
        <div
          key={img.src}
          className="img-hover-wrap relative aspect-[4/5] overflow-hidden rounded-xl group"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover img-hover-zoom"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
          <div className="img-hover-shine" aria-hidden />
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/25 transition-colors duration-500" />
        </div>
      ))}
    </div>
  );
}
