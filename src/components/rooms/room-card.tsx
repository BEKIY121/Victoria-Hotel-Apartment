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
    <div className="group card-luxury bg-white overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <Link
            href={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase font-semibold"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="py-6 px-1 border-b border-stone">
        <p className="section-label mb-2">Room</p>
        <h3 className="font-serif text-xl text-charcoal mb-2">{room.name}</h3>
        <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed">
          {room.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.6rem] tracking-[0.15em] uppercase text-muted">
              From
            </p>
            <p className="font-serif text-lg text-bronze">
              {formatPrice(startingPrice)}
              <span className="text-xs text-muted font-sans"> / night</span>
            </p>
          </div>
          {showBookButton && (
            <Link
              href={`/book?room=${room.slug}`}
              className="text-xs tracking-[0.15em] uppercase font-semibold text-charcoal hover:text-bronze border border-charcoal hover:border-bronze px-4 py-2 transition-colors"
            >
              Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
