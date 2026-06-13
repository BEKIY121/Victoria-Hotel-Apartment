import { getAverageRating } from "@/lib/mock-data";

const badges = [
  { platform: "Booking.com", score: "9.1", label: "Superb" },
  { platform: "Google", score: "4.8", label: "Excellent" },
  { platform: "TripAdvisor", score: "4.6", label: "Very Good" },
];

export function TrustBadges() {
  const avgRating = getAverageRating();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.platform}
          className="trust-badge flex items-center gap-4 p-5 rounded-2xl"
        >
          <div className="text-center min-w-[3.5rem]">
            <p className="font-serif text-3xl text-gold-gradient leading-none font-light">
              {badge.score}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal">{badge.platform}</p>
            <p className="text-xs text-muted">{badge.label}</p>
          </div>
        </div>
      ))}
      <div className="sm:col-span-3 text-center pt-2">
        <p className="text-sm text-muted italic font-serif">
          {avgRating} average from our direct-booking guests
        </p>
      </div>
    </div>
  );
}
