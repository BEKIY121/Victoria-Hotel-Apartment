import Link from "next/link";
import type { RoomType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModernSection } from "@/components/ui/modern-section";

interface RoomComparisonProps {
  rooms: RoomType[];
}

export function RoomComparison({ rooms }: RoomComparisonProps) {
  if (rooms.length === 0) return null;

  const features = [
    { key: "size", label: "Size" },
    { key: "capacity", label: "Guests" },
    { key: "bedType", label: "Bed" },
    { key: "basePrice", label: "From / night" },
  ] as const;

  return (
    <ModernSection variant="muted" className="!py-16 lg:!py-20 border-t border-stone/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="section-label text-bronze mb-2">Compare</p>
        <h2 className="font-serif text-3xl mb-2">Room Comparison</h2>
        <span className="section-title-accent block mb-8" aria-hidden />

        <div className="overflow-x-auto surface-card rounded-2xl border border-stone shadow-elevated">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-stone/30 text-xs uppercase text-muted">
                <th className="p-4 text-left w-36">Feature</th>
                {rooms.map((room) => (
                  <th key={room.id} className="p-4 text-left font-medium text-charcoal normal-case">
                    {room.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.key} className="border-t border-stone">
                  <td className="p-4 text-muted">{feature.label}</td>
                  {rooms.map((room) => (
                    <td key={room.id} className="p-4">
                      {feature.key === "basePrice"
                        ? formatPrice(room.basePrice)
                        : feature.key === "capacity"
                          ? `Up to ${room.capacity}`
                          : room[feature.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-stone">
                <td className="p-4 text-muted align-top">Highlights</td>
                {rooms.map((room) => (
                  <td key={room.id} className="p-4 align-top">
                    <ul className="space-y-1 text-xs text-muted">
                      {room.amenities.slice(0, 4).map((a) => (
                        <li key={a}>· {a}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-t border-stone bg-stone/10">
                <td className="p-4" />
                {rooms.map((room) => (
                  <td key={room.id} className="p-4">
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="text-xs text-bronze underline"
                      >
                        View details
                      </Link>
                      <Button href={`/book?room=${room.slug}`} size="sm" variant="outline">
                        Book
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModernSection>
  );
}
