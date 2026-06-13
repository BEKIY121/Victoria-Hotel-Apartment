import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { BookingWidget } from "@/components/booking/booking-widget";
import {
  getRoomBySlug,
  getRoomTypes,
  getSeasonalPricing,
} from "@/lib/data/rooms";
import { getStartingPrice } from "@/lib/pricing";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const rooms = await getRoomTypes();
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return { title: "Room Not Found" };
  return { title: room.name, description: room.description };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const [room, seasonalPricing] = await Promise.all([
    getRoomBySlug(slug),
    getSeasonalPricing(),
  ]);
  if (!room) notFound();

  const startingPrice = getStartingPrice(room, seasonalPricing);

  return (
    <>
      <PageHero
        image={room.images[0]}
        imageAlt={room.name}
        label="Room"
        title={room.name}
        subtitle={room.shortDescription}
      />

      <section className="py-12 bg-warm-gray">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWidget variant="inline" />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-3 mb-10">
                {room.images.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden ${
                      i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${room.name} photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="text-muted leading-relaxed text-lg mb-10">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-6 text-xs tracking-wider uppercase text-muted mb-10 pb-10 border-b border-stone">
                <span>Up to {room.capacity} guests</span>
                <span>{room.size}</span>
                <span>{room.bedType}</span>
              </div>

              <h2 className="font-serif text-2xl text-charcoal mb-6">
                Room Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 text-sm text-muted">
                    <Check className="w-4 h-4 text-bronze shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-charcoal text-white p-8">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-2">
                  Starting from
                </p>
                <p className="font-serif text-4xl text-bronze-light mb-1">
                  {formatPrice(startingPrice)}
                </p>
                <p className="text-xs text-white/40 mb-8">per night · direct rate</p>

                <Button
                  href={`/book?room=${room.slug}`}
                  variant="secondary"
                  className="w-full mb-4"
                  size="lg"
                >
                  Book This Room
                </Button>

                <Link
                  href="/rooms"
                  className="flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors py-3"
                >
                  View All Rooms <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/50 leading-relaxed">
                  Free cancellation up to 24 hours before arrival.
                  Secure online payment via Stripe. WhatsApp confirmation included.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
