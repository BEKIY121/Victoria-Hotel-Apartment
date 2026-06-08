import { hotelAdvantages, bookingNotes } from "@/lib/content";
import { Check } from "lucide-react";

interface BookingAdvantagesProps {
  compact?: boolean;
}

export function BookingAdvantages({ compact = false }: BookingAdvantagesProps) {
  const items = compact ? hotelAdvantages.slice(0, 5) : hotelAdvantages;

  return (
    <div className="space-y-4">
      {!compact && (
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-4">
          Our Advantages
        </p>
      )}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.title} className="flex gap-2.5 text-xs leading-relaxed">
            <Check className="w-3.5 h-3.5 text-bronze-light shrink-0 mt-0.5" />
            <span className={compact ? "text-muted" : "text-white/70"}>
              <strong className={compact ? "text-charcoal" : "text-white/90"}>
                {item.title}
              </strong>
              {!compact && ` — ${item.description}`}
            </span>
          </li>
        ))}
      </ul>
      {!compact && (
        <p className="text-[0.6rem] text-white/40 tracking-wider uppercase pt-4 border-t border-white/10">
          {bookingNotes.vat}
        </p>
      )}
    </div>
  );
}
