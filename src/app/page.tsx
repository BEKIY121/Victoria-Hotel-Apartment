import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Dumbbell, Briefcase, UtensilsCrossed, MapPin, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingWidget } from "@/components/booking/booking-widget";
import { RoomShowcase } from "@/components/rooms/room-showcase";
import { ReviewCard } from "@/components/reviews/review-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { TrustBadges } from "@/components/ui/trust-badges";
import { roomTypes, getApprovedReviews, siteSettings } from "@/lib/mock-data";
import { hotelAdvantages } from "@/lib/content";

export default function HomePage() {
  const reviews = getApprovedReviews().slice(0, 3);
  const totalRooms = roomTypes.reduce((s, r) => s + r.inventory, 0);

  return (
    <>
      <section className="relative min-h-[92vh] flex flex-col justify-end -mt-16 lg:-mt-[6.25rem]">
        <Image
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80"
          alt="Victoria Hotel Apartment suite"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-8 lg:pb-12">
          <div className="max-w-3xl animate-fade-up">
            <p className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4 font-light">
              Stay &nbsp;·&nbsp; Relax
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.05] mb-6">
              Victoria Hotel
              <br />
              Apartments
            </h1>
            <p className="text-white/75 text-lg max-w-xl leading-relaxed mb-10 font-light">
              Elegance, comfort, and affordability in Sarbet, Pushkin Square —
              {siteSettings.africanUnionDistanceMin} min from the African Union,{" "}
              {siteSettings.airportDistanceMin} min from the airport.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/book" variant="light" size="lg">
                Reserve Now
              </Button>
              <Button href="/rooms" variant="light" size="lg" className="border-white/40">
                Our Rooms
              </Button>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors py-4"
              >
                View More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-8 lg:pb-12">
          <BookingWidget variant="hero" />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-warm-gray border-y border-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Advantages"
            title="Everything You Need For A Perfect Stay"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hotelAdvantages.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-stone p-5 text-center card-luxury"
              >
                <h3 className="text-xs tracking-[0.12em] uppercase font-semibold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label text-bronze-light mb-3">Special Offer</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-normal mb-4 leading-tight">
                Get 10% Off Today
              </h2>
              <p className="text-white/70 leading-relaxed max-w-md">
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

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <SectionHeading
            label="Rooms"
            title="Offering You A Stunning Place To Relax"
            subtitle="Comfortable suites and apartments designed for business trips, family holidays, and extended stays in Addis Ababa."
            align="center"
          />
        </div>
        <div className="space-y-0">
          {roomTypes.filter((r) => r.featured).map((room, i) => (
            <RoomShowcase key={room.id} room={room} index={i} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/rooms" variant="outline">
            View All Rooms
          </Button>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-warm-gray">
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
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-8 bg-white border border-stone">
                <p className="stat-number">{totalRooms}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted mt-2">
                  Spacious Rooms
                </p>
              </div>
              <div className="text-center p-8 bg-white border border-stone">
                <p className="stat-number">1</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted mt-2">
                  Dining Restaurant
                </p>
              </div>
              <div className="text-center p-8 bg-white border border-stone">
                <p className="stat-number">{siteSettings.africanUnionDistanceMin}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted mt-2">
                  Min From African Union
                </p>
              </div>
              <div className="text-center p-8 bg-white border border-stone">
                <p className="stat-number">{siteSettings.airportDistanceMin}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-muted mt-2">
                  Min From Airport
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
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
        <div className="relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
            alt="Gym and recreation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <Dumbbell className="w-8 h-8 text-bronze-light mb-4" />
            <h3 className="font-serif text-3xl text-white mb-3">Gym & Recreation</h3>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Stay healthy and fit while enjoying luxury at our place.
            </p>
            <Link
              href="/contact"
              className="text-xs tracking-[0.2em] uppercase font-semibold text-white hover:text-bronze-light transition-colors inline-flex items-center gap-2"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
            alt="Work and meeting space"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/50" />
          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
            <Briefcase className="w-8 h-8 text-bronze-light mb-4" />
            <h3 className="font-serif text-3xl text-white mb-3">Work & Meeting Space</h3>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Work. Relax at our hotel apartment with dedicated workspace and
              high-speed connectivity.
            </p>
            <Link
              href="/contact"
              className="text-xs tracking-[0.2em] uppercase font-semibold text-white hover:text-bronze-light transition-colors inline-flex items-center gap-2"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Restaurant dining"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <UtensilsCrossed className="w-8 h-8 text-bronze-light mb-4" />
            <h2 className="font-serif text-4xl font-normal mb-4">
              Lobby Café & Restaurant
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              A meticulously crafted menu ready to serve you excellent
              cuisine. Complimentary breakfast for all direct-booking guests.
              Our cozy rooftop lounge offers a picturesque view of the city.
            </p>
            <Button href="/contact" variant="secondary">
              Explore Dining
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Testimonials"
            title="Guest Reviews"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/reviews" variant="outline">
              Read All Reviews
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-warm-gray">
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
            <div className="aspect-[4/3] bg-stone overflow-hidden">
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

      <section className="py-20 lg:py-28 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label text-bronze-light mb-4">Reservations</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-normal mb-6">
            Ready To Book Your Stay?
          </h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
            Check real-time availability and secure the best direct rate —
            no middleman, no hidden fees.
          </p>
          <div className="max-w-3xl mx-auto">
            <BookingWidget variant="inline" />
          </div>
        </div>
      </section>
    </>
  );
}
