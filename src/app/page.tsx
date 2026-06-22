import Link from "next/link";
import { ArrowRight, Dumbbell, Briefcase, MapPin, Plane, UtensilsCrossed, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWidget } from "@/components/booking/booking-widget";
import { HomeHero } from "@/components/layout/home-hero";
import { RoomShowcase } from "@/components/rooms/room-showcase";
import { ReviewCard } from "@/components/reviews/review-card";
import { HoverBgPanel } from "@/components/ui/hover-image";
import { ImmersiveBand } from "@/components/ui/immersive-band";
import { LifeAtVictoria } from "@/components/ui/life-at-victoria";
import { ModernSection, ModernSectionIntro } from "@/components/ui/modern-section";
import { OverlappingShowcase } from "@/components/ui/overlapping-showcase";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TruthPillars } from "@/components/ui/truth-pillars";
import { getApprovedReviews } from "@/lib/data/reviews";
import { getRoomTypes } from "@/lib/data/rooms";
import { getSiteSettings } from "@/lib/data/settings";
import { brandImages } from "@/lib/brand-images";
import { fourTruths } from "@/lib/content";

export default async function HomePage() {
  const [reviewsAll, roomTypes, siteSettings] = await Promise.all([
    getApprovedReviews(),
    getRoomTypes(),
    getSiteSettings(),
  ]);
  const reviews = reviewsAll.slice(0, 3);
  const featuredRooms = roomTypes.filter((r) => r.featured).slice(0, 2);
  const totalRooms = roomTypes.reduce((s, r) => s + r.inventory, 0);

  return (
    <>
      <HomeHero
        africanUnionDistanceMin={siteSettings.africanUnionDistanceMin}
        airportDistanceMin={siteSettings.airportDistanceMin}
      />

      <ImmersiveBand
        image={brandImages.atrium02}
        imageAlt="Victoria Hotel atrium"
        label="Why Victoria"
        title="Four truths we live by"
        description="Design and comfort combined — every detail chosen for your well-being in the heart of Addis Ababa."
        size="md"
        wide
        parallax
      >
        <div className="mt-4">
          <TruthPillars items={fourTruths} variant="immersive" />
        </div>
      </ImmersiveBand>

      <OverlappingShowcase
        imagePrimary={brandImages.atrium01}
        imageSecondary={brandImages.lobby}
        label="About"
        title="Art-filled spaces, warm hospitality"
        description="Led by Ato Tadesse Endeshaw with 22+ years of international experience. Spacious apartments with dedicated workspaces, acclaimed artwork, and self-sufficient infrastructure."
        href="/about"
        linkLabel="Our Story"
      />

      <ModernSectionIntro>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <SectionHeading
              label="Accommodation"
              title="Rooms & suites"
              subtitle="Comfortable apartments for business trips, family holidays, and extended stays."
              align="center"
            />
          </Reveal>
        </div>
      </ModernSectionIntro>

      <section className="pb-4 lg:pb-8 bg-warm-white">
        <div>
          {featuredRooms.map((room, i) => (
            <RoomShowcase key={room.id} room={room} index={i} />
          ))}
        </div>
        <Reveal className="text-center mt-14 pb-12">
          <Button href="/rooms" variant="outline">
            View All Rooms
          </Button>
        </Reveal>
      </section>

      <ImmersiveBand
        image={brandImages.dining}
        imageAlt="In-room dining at Victoria"
        label="Dining"
        title="Start every morning well"
        description="Complimentary breakfast for direct-booking guests. Lobby café, rooftop lounge, and in-room dining with a view."
        overlay="warm"
        parallax
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/facilities" variant="secondary" size="lg">
            <UtensilsCrossed className="w-4 h-4" />
            Explore Dining
          </Button>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-white/75 hover:text-white transition-colors py-4 group"
          >
            Book with Breakfast
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ImmersiveBand>

      <LifeAtVictoria />

      <ImmersiveBand
        image={brandImages.living}
        imageAlt="Victoria Hotel living space"
        label="Gallery"
        title="See Victoria for yourself"
        description="Bright atriums, curated artwork, warm suites, and spaces designed to feel like home."
        overlay="sage"
        parallax
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/gallery" variant="light" size="lg">
            <Camera className="w-4 h-4" />
            View Gallery
          </Button>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-white/75 hover:text-white transition-colors py-4 group"
          >
            Our Story
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </ImmersiveBand>

      <section className="grid grid-cols-1 lg:grid-cols-2">
        <HoverBgPanel image={brandImages.wellness} minHeight="min-h-[400px]" parallax>
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <Reveal>
              <Dumbbell className="w-7 h-7 text-bronze-light mb-4" />
              <h3 className="font-serif text-2xl lg:text-3xl font-light text-white mb-3 tracking-tight">
                Gym &amp; Recreation
              </h3>
              <p className="text-white/65 mb-5 leading-relaxed text-sm max-w-sm">
                Stay active with modern equipment in a bright, welcoming space.
              </p>
              <Link
                href="/facilities"
                className="text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group/link"
              >
                Explore
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </HoverBgPanel>
        <HoverBgPanel image={brandImages.kitchenette} minHeight="min-h-[400px]" parallax>
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <Reveal>
              <Briefcase className="w-7 h-7 text-bronze-light mb-4" />
              <h3 className="font-serif text-2xl lg:text-3xl font-light text-white mb-3 tracking-tight">
                Work &amp; Stay
              </h3>
              <p className="text-white/65 mb-5 leading-relaxed text-sm max-w-sm">
                Kitchenette, dedicated desk, and high-speed WiFi in every suite.
              </p>
              <Link
                href="/amenities"
                className="text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 group/link"
              >
                Amenities
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </HoverBgPanel>
      </section>

      <ModernSection variant="muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <SectionHeading
                label="About"
                title="Victoria Hotel Apartments"
                subtitle="A harmonious blend of style, comfort, and functionality."
              />
              <p className="mt-6 text-muted leading-relaxed">
                {totalRooms} spacious rooms in Sarbet, Pushkin Square — near the
                African Union and airport. Complimentary breakfast, free shuttle,
                and 24-hour service for every guest.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  { value: totalRooms, label: "Rooms" },
                  { value: siteSettings.africanUnionDistanceMin, label: "Min to AU" },
                  { value: siteSettings.airportDistanceMin, label: "Min to Airport" },
                  { value: "24/7", label: "Reception" },
                ].map((stat, i) => (
                  <Reveal key={stat.label} delay={i * 60}>
                    <div className="modern-stat-card text-center p-6">
                      <p className="stat-number text-3xl lg:text-4xl">{stat.value}</p>
                      <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted mt-2">
                        {stat.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Button href="/about" className="mt-8">
                About Victoria
              </Button>
            </Reveal>

            <div>
              <Reveal delay={100}>
                <SectionHeading
                  label="Testimonials"
                  title="Guest reviews"
                  className="mb-10"
                />
              </Reveal>
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <Reveal key={review.id} delay={i * 80}>
                    <ReviewCard review={review} />
                  </Reveal>
                ))}
              </div>
              <Reveal className="mt-8">
                <Button href="/reviews" variant="outline">
                  All Reviews
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </ModernSection>

      <ImmersiveBand
        image={brandImages.exterior}
        imageAlt="Victoria Hotel entrance"
        label="Location"
        title="Minutes from everywhere that matters"
        description={`${siteSettings.address}, ${siteSettings.city}. ${siteSettings.africanUnionDistanceMin} min from the African Union, ${siteSettings.airportDistanceMin} min from ${siteSettings.airportName}.`}
        align="left"
        overlay="dark"
        size="md"
        className="!py-20"
        parallax
      >
        <div className="flex flex-wrap gap-4 mt-2">
          <Button href="/contact" variant="secondary">
            <MapPin className="w-4 h-4" />
            Get Directions
          </Button>
          <div className="flex items-center gap-2 text-white/60 text-sm py-3">
            <Plane className="w-4 h-4 text-bronze-light" />
            Free airport shuttle available
          </div>
        </div>
      </ImmersiveBand>

      <ImmersiveBand
        image={brandImages.bedroom}
        imageAlt="Victoria Hotel bedroom"
        label="Reservations"
        title="Ready to book your stay?"
        description="Check real-time availability and secure the best direct rate — no middleman, no hidden fees."
        parallax
      >
        <div className="max-w-3xl mx-auto">
          <BookingWidget variant="hero" />
        </div>
      </ImmersiveBand>
    </>
  );
}
