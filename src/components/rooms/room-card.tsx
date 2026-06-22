import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RoomType, SeasonalPricing } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getStartingPrice } from "@/lib/pricing";
import { seasonalPricing as fallbackSeasonal } from "@/lib/mock-data";

interface RoomCardProps {
  room: RoomType;
  showBookButton?: boolean;
  seasonalPricing?: SeasonalPricing[];
}

export function RoomCard({
  room,
  showBookButton = true,
  seasonalPricing = fallbackSeasonal,
}: RoomCardProps) {
  const startingPrice = getStartingPrice(room, seasonalPricing);

  return (
    <div className="group surface-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500">
      <div className="img-hover-wrap relative aspect-[4/5] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover img-hover-zoom"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="img-hover-shine" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-2 text-white text-[0.7rem] tracking-[0.18em] uppercase font-semibold opacity-90 group-hover:opacity-100"
          >
            View Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.6rem] tracking-[0.15em] uppercase font-semibold px-3 py-1.5 rounded-full">
            {room.size}
          </span>
        </div>
      </div>

      <div className="py-6 px-5">
        <p className="section-label mb-2">Room</p>
        <h3 className="font-serif text-xl font-light text-charcoal mb-2 tracking-tight group-hover:text-bronze transition-colors duration-300">
          {room.name}
        </h3>
        <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed">
          {room.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-stone/60">
          <div>
            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted">
              From
            </p>
            <p className="font-serif text-lg text-bronze font-light">
              {formatPrice(startingPrice)}
              <span className="text-xs text-muted font-sans"> / night</span>
            </p>
          </div>
          {showBookButton && (
            <Link
              href={`/book?room=${room.slug}`}
              className="text-[0.7rem] tracking-[0.15em] uppercase font-semibold text-charcoal hover:text-white hover:bg-charcoal border border-charcoal/15 hover:border-charcoal px-5 py-2.5 rounded-full transition-all duration-300"
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
