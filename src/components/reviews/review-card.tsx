import type { GuestReview } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ReviewCardProps {
  review: GuestReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const roomName = review.roomName;

  return (
    <div className="glass-card rounded-2xl p-8 lg:p-9">
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < review.rating ? "text-bronze" : "text-stone"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-muted leading-relaxed mb-6 font-serif text-lg font-light italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between pt-5 border-t border-stone/50">
        <div>
          <p className="text-sm font-semibold text-charcoal tracking-wide">
            {review.name}
          </p>
          <p className="text-xs text-muted mt-0.5">{review.country}</p>
        </div>
        <div className="text-right">
          {roomName && (
            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-bronze">
              {roomName}
            </p>
          )}
          <p className="text-xs text-muted mt-0.5">{formatDate(review.date)}</p>
        </div>
      </div>
    </div>
  );
}
