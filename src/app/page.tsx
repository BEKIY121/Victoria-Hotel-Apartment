import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Dumbbell, Briefcase, UtensilsCrossed, MapPin, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWidget } from "@/components/booking/booking-widget";
import { HomeHero } from "@/components/layout/home-hero";
import { RoomShowcase } from "@/components/rooms/room-showcase";
import { ReviewCard } from "@/components/reviews/review-card";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { QuoteCta } from "@/components/ui/quote-cta";
import { TruthPillars } from "@/components/ui/truth-pillars";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrustBadges } from "@/components/ui/trust-badges";
import { getApprovedReviews } from "@/lib/data/reviews";
import { getRoomTypes } from "@/lib/data/rooms";
import { getSiteSettings } from "@/lib/data/settings";
import { fourTruths, hotelAdvantages } from "@/lib/content";

export default async function HomePage() {
  const [reviewsAll, roomTypes, siteSettings] = await Promise.all([
    getApprovedReviews(),
    getRoomTypes(),
    getSiteSettings(),
  ]);
  const reviews = reviewsAll.slice(0, 3);
  const totalRooms = roomTypes.reduce((s, r) => s + r.inventory, 0);

  return (
    <>
      <HomeHero
        africanUnionDistanceMin={siteSettings.africanUnionDistanceMin}
        airportDistanceMin={siteSettings.airportDistanceMin}
      />

      <section className="py-20 lg:py-24 bg-warm-gray/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <EditorialHeading
              italic="Our"
              emphasis="Hotel"
              subtitle="Four Truths"
              align="center"
            />
            <p className="mt-6 text-muted max-w-2xl mx-auto leading-relaxed">
              Design and comfort combined — because we care about your well-being.
              Every material and amenity is chosen for your comfort and satisfaction.
            </p>
          </div>
          <TruthPillars items={fourTruths} />
        </div>
      </section>

      <section className="py-16 lg:py-20 border-b border-stone/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <EditorialHeading italic="Rooms" subtitle="Spacious and Affordable" align="center" />
            <p className="mt-4 text-sm text-muted italic font-serif">
              Enjoy your stay at Victoria Hotel Apartments
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {hotelAdvantages.slice(0, 5).map((item) => (
              <div key={item.title} className="feature-tile p-5 text-center">
                <h3 className="text-[0.65rem] tracking-[0.15em] uppercase font-semibold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-24 overflow-hidden">
        <Image
          src="/images/gallery/lobby/02.webp"
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="glass-dark rounded-2xl p-8 lg:p-10">
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-bronze-light mb-4 font-semibold">
                Special Offer
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl font-light mb-4 leading-tight text-white tracking-tight">
                Get 10% Off Today
              </h2>
              <p className="text-white/60 leading-relaxed max-w-md">
                When you book directly through our reservations team or
                website. Skip the OTAs — best rates, instant confirmation,
                and personal service.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Button href="/book" variant="secondary" size="lg">
                Book Direct & Save
              </Button>
              <Button href={`tel:${siteSettings.phone}`} variant="light" size="lg">
                Call Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <EditorialHeading
            italic="Offering You"
            emphasis="A Stunning"
            suffix="Place To Relax"
            subtitle="Rooms & Suites"
            align="center"
          />
          <p className="mt-6 text-muted max-w-2xl mx-auto leading-relaxed">
            Comfortable suites and apartments designed for business trips, family
            holidays, and extended stays in Addis Ababa.
          </p>
        </div>
        <div className="space-y-0">
          {roomTypes.filter((r) => r.featured).map((room, i) => (
            <RoomShowcase key={room.id} room={room} index={i} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Button href="/rooms" variant="outline">
            View All Rooms
          </Button>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-gray/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="About"
                title="Victoria Hotel Apartments"
                subtitle="Located in Sarbet, Pushkin Square — a harmonious blend of style, comfort, and functionality for leisure and business travelers."
              />
              <p className="mt-6 text-muted leading-relaxed">
                Led by General Manager Ato Tadesse Endeshaw, with 22+ years of
                international hospitality experience. Each room features
                dedicated workspaces, high-speed internet, artwork by acclaimed
                artists, and self-sufficient infrastructure including backup
                generators.
              </p>
              <Button href="/about" className="mt-8">
                About Victoria
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: totalRooms, label: "Spacious Rooms" },
                { value: 1, label: "Dining Restaurant" },
                { value: siteSettings.africanUnionDistanceMin, label: "Min From African Union" },
                { value: siteSettings.airportDistanceMin, label: "Min From Airport" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl text-center p-8">
                  <p className="stat-number">{stat.value}</p>
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-muted mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Your Second Home"
            title="Let Us Make You Feel At Home"
            align="center"
            className="mb-12"
          />
          <TrustBadges />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[420px] group overflow-hidden">
          <Image
            src="/images/gallery/recreation/04.webp"
            alt="Gym and recreation"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <div className="glass-dark rounded-2xl p-6 lg:p-8 max-w-sm">
              <Dumbbell className="w-7 h-7 text-bronze-light mb-4" />
              <h3 className="font-serif text-2xl lg:text-3xl font-light text-white mb-3 tracking-tight">
                Gym & Recreation
              </h3>
              <p className="text-white/60 mb-5 leading-relaxed text-sm">
                Stay healthy and fit while enjoying luxury at our place.
              </p>
              <Link
                href="/facilities"
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-white/80 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-[420px] group overflow-hidden">
          <Image
            src="/images/gallery/lobby/04.webp"
            alt="Work and meeting space"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <div className="glass-dark rounded-2xl p-6 lg:p-8 max-w-sm">
              <Briefcase className="w-7 h-7 text-bronze-light mb-4" />
              <h3 className="font-serif text-2xl lg:text-3xl font-light text-white mb-3 tracking-tight">
                Work & Meeting Space
              </h3>
              <p className="text-white/60 mb-5 leading-relaxed text-sm">
                Work. Relax at our hotel apartment with dedicated workspace and
                high-speed connectivity.
              </p>
              <Link
                href="/amenities"
                className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-white/80 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/gallery/restaurant/01.webp"
              alt="Restaurant dining"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <UtensilsCrossed className="w-7 h-7 text-bronze-light mb-4" />
            <h2 className="font-serif text-4xl font-light mb-4 tracking-tight">
              Lobby Café & Restaurant
            </h2>
            <p className="text-white/55 leading-relaxed mb-6">
              A meticulously crafted menu ready to serve you excellent
              cuisine. Complimentary breakfast for all direct-booking guests.
              Our cozy rooftop lounge offers a picturesque view of the city.
            </p>
            <Button href="/facilities" variant="secondary">
              Explore Dining
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="Guest Reviews"
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/reviews" variant="outline">
              Read All Reviews
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-gray/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                label="Location"
                title="We Are Reachable"
                subtitle="24 hours, 7 days a week. Sarbet, Pushkin Square — near African Union & airport."
              />
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-bronze shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">{siteSettings.address}</p>
                    <p className="text-sm text-muted">
                      {siteSettings.city}, {siteSettings.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Plane className="w-5 h-5 text-bronze shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">
                      {siteSettings.africanUnionDistanceMin} min drive from African Union
                    </p>
                    <p className="text-sm text-muted">
                      {siteSettings.airportDistanceMin} min from{" "}
                      {siteSettings.airportName} · Free shuttle available
                    </p>
                  </div>
                </div>
              </div>
              <Button href="/contact" className="mt-8">
                Get Directions
              </Button>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden glass-card">
              <iframe
                title="Victoria Hotel Apartment location"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${siteSettings.longitude - 0.02}%2C${siteSettings.latitude - 0.02}%2C${siteSettings.longitude + 0.02}%2C${siteSettings.latitude + 0.02}&layer=mapnik&marker=${siteSettings.latitude}%2C${siteSettings.longitude}`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <QuoteCta quote="Why miss home when you can stay with us?" href="/book" buttonLabel="Book Your Stay" />

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <Image
          src="/images/gallery/property/01.webp"
          alt=""
          fill
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[0.65rem] tracking-[0.3em] uppercase text-bronze-light mb-4 font-semibold">
            Reservations
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light mb-6 text-white tracking-tight">
            Ready To Book Your Stay?
          </h2>
          <p className="text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">
            Check real-time availability and secure the best direct rate —
            no middleman, no hidden fees.
          </p>
          <div className="max-w-3xl mx-auto">
            <BookingWidget variant="hero" />
          </div>
        </div>
      </section>
    </>
  );
}
