import type { Metadata } from "next";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewForm } from "@/components/reviews/review-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Button } from "@/components/ui/button";
import { getApprovedReviews, getAverageRating } from "@/lib/data/reviews";
import { getRoomTypes } from "@/lib/data/rooms";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Read guest reviews for Victoria Hotel Apartments in Addis Ababa. Real feedback from travelers worldwide.",
};

export default async function ReviewsPage() {
  const [reviews, avgRating, roomTypes] = await Promise.all([
    getApprovedReviews(),
    getAverageRating(),
    getRoomTypes(),
  ]);

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <>
      <PageHero
        image="/images/gallery/lobby/02.webp"
        imageAlt="Guest reviews"
        label="Testimonials"
        title="Guest Reviews"
        align="center"
      >
        <p className="font-serif text-5xl text-bronze-light mt-6 font-light">{avgRating}</p>
        <p className="text-white/50 text-sm mt-2">
          Based on {reviews.length} verified reviews
        </p>
      </PageHero>

      <section className="py-12 bg-warm-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="bg-white border border-stone p-6 h-fit">
              <h3 className="text-xs tracking-[0.15em] uppercase text-muted font-semibold mb-5">
                Rating Breakdown
              </h3>
              {ratingCounts.map(({ star, count }) => (
                <div key={star} className="flex items-center gap-2 mb-3 text-sm">
                  <span className="w-3 text-muted">{star}</span>
                  <span className="text-bronze text-xs">★</span>
                  <div className="flex-1 h-1.5 bg-warm-gray overflow-hidden">
                    <div
                      className="h-full bg-bronze"
                      style={{
                        width: `${
                          reviews.length ? (count / reviews.length) * 100 : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="w-6 text-muted text-xs">{count}</span>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

          <div className="mt-16 mb-16">
            <ReviewForm rooms={roomTypes.map((r) => ({ id: r.id, name: r.name }))} />
          </div>

          <div className="text-center mt-16">
            <SectionHeading
              title="Ready to experience it yourself?"
              align="center"
              className="mb-6"
            />
            <Button href="/book">Book Your Stay</Button>
          </div>
        </div>
      </section>
    </>
  );
}
