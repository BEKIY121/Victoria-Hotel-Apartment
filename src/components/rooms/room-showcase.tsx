import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RoomType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { getStartingPrice } from "@/lib/pricing";
import { seasonalPricing } from "@/lib/mock-data";

interface RoomShowcaseProps {
  room: RoomType;
  index: number;
}

export function RoomShowcase({ room, index }: RoomShowcaseProps) {
  const startingPrice = getStartingPrice(room, seasonalPricing);
  const reversed = index % 2 === 1;

  return (
    <div className="room-showcase group grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
      <div
        className={`relative overflow-hidden min-h-[320px] lg:min-h-full ${
          reversed ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="room-showcase-image object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="room-showcase-overlay absolute inset-0 lg:hidden" />
        <div className="absolute bottom-6 left-6 lg:hidden">
          <p className="text-white font-serif text-2xl">{room.name}</p>
        </div>
      </div>

      <div
        className={`flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-20 bg-warm-gray ${
          reversed ? "lg:order-1" : ""
        }`}
      >
        <p className="section-label mb-4">Accommodation</p>
        <h3 className="font-serif text-3xl lg:text-4xl font-normal text-charcoal mb-4 leading-tight">
          {room.name}
        </h3>
        <p className="text-muted leading-relaxed mb-6 line-clamp-3">
          {room.description}
        </p>
        <div className="flex items-center gap-6 text-xs tracking-wider uppercase text-muted mb-8">
          <span>{room.size}</span>
          <span className="w-px h-3 bg-stone" />
          <span>{room.bedType}</span>
          <span className="w-px h-3 bg-stone" />
          <span>Up to {room.capacity} guests</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">
              Starting from
            </p>
            <p className="font-serif text-2xl text-bronze">
              {formatPrice(startingPrice)}
              <span className="text-sm text-muted font-sans"> / night</span>
            </p>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="group/link flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-semibold text-charcoal hover:text-bronze transition-colors"
          >
            More
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
