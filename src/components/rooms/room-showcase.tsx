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
    <div className="room-showcase group grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
      <div
        className={`img-hover-wrap relative overflow-hidden min-h-[340px] lg:min-h-full ${
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
        <div className="img-hover-shine" aria-hidden />
        <div className="room-showcase-overlay absolute inset-0 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent lg:from-charcoal/60 lg:via-transparent lg:to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10">
          <p className="text-white font-serif text-2xl lg:text-3xl font-light lg:translate-y-2 lg:group-hover:translate-y-0 transition-transform duration-500">
            {room.name}
          </p>
          <p className="room-showcase-badge text-bronze-light text-sm mt-2 hidden lg:block">
            {room.size} · {room.bedType}
          </p>
        </div>

        <Link
          href={`/rooms/${room.slug}`}
          className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[0.65rem] tracking-[0.18em] uppercase font-semibold px-5 py-2.5 rounded-full hover:bg-bronze hover:border-bronze"
        >
          View Room <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div
        className={`modern-panel room-showcase-content flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-20 ${
          reversed ? "lg:order-1" : ""
        }`}
      >
        <p className="section-label mb-4">Accommodation</p>
        <h3 className="font-serif text-3xl lg:text-4xl font-light text-charcoal mb-4 leading-tight tracking-tight group-hover:text-bronze transition-colors duration-500">
          {room.name}
        </h3>
        <p className="text-muted leading-relaxed mb-6 line-clamp-3">
          {room.description}
        </p>
        <div className="flex items-center gap-6 text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-8">
          <span>{room.size}</span>
          <span className="w-px h-3 bg-stone" />
          <span>{room.bedType}</span>
          <span className="w-px h-3 bg-stone" />
          <span>Up to {room.capacity} guests</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.6rem] tracking-[0.18em] uppercase text-muted mb-1">
              Starting from
            </p>
            <p className="font-serif text-2xl text-bronze font-light">
              {formatPrice(startingPrice)}
              <span className="text-sm text-muted font-sans"> / night</span>
            </p>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="group/link flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-charcoal hover:text-bronze transition-colors"
          >
            Explore
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
