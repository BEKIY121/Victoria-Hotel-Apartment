import type { GuestReview } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { getRoomById } from "@/lib/mock-data";

interface ReviewCardProps {
  review: GuestReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const room = review.roomTypeId ? getRoomById(review.roomTypeId) : null;

  return (
    <div className="bg-white border border-stone p-8 card-luxury">
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
      <p className="text-muted leading-relaxed mb-6 font-serif italic text-lg">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between pt-5 border-t border-stone">
        <div>
          <p className="text-sm font-semibold text-charcoal tracking-wide">
            {review.name}
          </p>
          <p className="text-xs text-muted mt-0.5">{review.country}</p>
        </div>
        <div className="text-right">
          {room && (
            <p className="text-xs tracking-wider uppercase text-bronze">
              {room.name}
            </p>
          )}
          <p className="text-xs text-muted mt-0.5">{formatDate(review.date)}</p>
        </div>
      </div>
    </div>
  );
}
