import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { PageHero } from "@/components/ui/page-hero";
import { ModernSection } from "@/components/ui/modern-section";
import { ImmersiveBand } from "@/components/ui/immersive-band";
import { BookingWidget } from "@/components/booking/booking-widget";
import { HoverImage } from "@/components/ui/hover-image";
import { PhotoStrip } from "@/components/ui/photo-strip";
import { Reveal } from "@/components/ui/reveal";
import { SplitFeatureHeading } from "@/components/ui/split-feature-heading";
import { TruthPillars } from "@/components/ui/truth-pillars";
import {
  welcomeContent,
  aboutContent,
  fourTruths,
  valuePillars,
  aboutGalleryImages,
  facilitiesContent,
} from "@/lib/content";
import { brandImages } from "@/lib/brand-images";
import { siteSettings } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Victoria Hotel Apartments in Sarbet, Addis Ababa. Led by Ato Tadesse Endeshaw with 22+ years of international hospitality experience.",
};

export default function AboutPage() {
  const featuredFacilities = facilitiesContent.slice(0, 4);

  return (
    <>
      <PageHero
        image={brandImages.exterior}
        imageAlt="Victoria Hotel Apartments"
        editorial
        editorialTitle="About Us"
        brandName="Victoria Hotel Apartments"
        tagline={welcomeContent.homeTagline}
      />

      <ModernSection variant="white" className="!py-16 lg:!py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <Reveal>
            <p className="text-muted leading-relaxed mb-6 text-lg">
              {aboutContent.paragraphs[0]}
            </p>
            <p className="font-serif text-2xl text-bronze font-light italic">
              {welcomeContent.tagline}
            </p>
            <div className="mt-10 flex justify-center lg:justify-start">
              <Button href="/rooms" variant="outline">
                Explore the Hotel <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </ModernSection>

      <ImmersiveBand
        image={brandImages.atrium02}
        imageAlt="Victoria Hotel atrium"
        label="Our Promise"
        title="Four truths we live by"
        description="Visit our beautiful location during any season. Design and comfort combined for your well-being."
        size="md"
        wide
        parallax
      >
        <TruthPillars items={fourTruths} variant="immersive" />
      </ImmersiveBand>

      <ModernSection variant="accent" className="!py-16 lg:!py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <HoverImage
              src={brandImages.bedroom}
              alt={siteSettings.managerName}
              className="aspect-[4/5] max-w-md mx-auto lg:mx-0 w-full"
              sizes="(max-width: 1024px) 90vw, 40vw"
            />
            <div>
              <EditorialHeading italic="Leadership" subtitle="General Manager" />
              <h3 className="font-serif text-3xl font-light text-charcoal mt-4 mb-2 tracking-tight">
                {siteSettings.managerName}
              </h3>
              <p className="text-sm text-bronze tracking-wide mb-6">
                {siteSettings.managerTitle}
              </p>
              <p className="text-muted leading-relaxed mb-6">
                {siteSettings.managerBio}
              </p>
              <ul className="space-y-2 text-sm text-charcoal">
                <li>
                  <span className="text-muted">Education: </span>
                  {aboutContent.manager.education}
                </li>
                <li>
                  <span className="text-muted">Experience: </span>
                  {aboutContent.manager.experience}
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {featuredFacilities.map((facility, index) => (
              <div
                key={facility.slug}
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 items-center ${
                  index % 2 === 1 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="img-hover-wrap relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover img-hover-zoom"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="img-hover-shine" aria-hidden />
                </div>
                <div>
                  <SplitFeatureHeading
                    primary={facility.title.split(" ")[0]}
                    secondary={facility.title.split(" ").slice(1).join(" ") || facility.title}
                  />
                  <p className="text-sm text-muted leading-relaxed mt-4 mb-4">
                    {facility.description}
                  </p>
                  <Link
                    href="/facilities"
                    className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold text-bronze hover:text-charcoal transition-colors inline-flex items-center gap-2"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModernSection>

      <ModernSection variant="muted" className="!py-16 lg:!py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <EditorialHeading
              italic="Why"
              emphasis="Choose"
              suffix="Victoria?"
              align="center"
            />
            <p className="mt-6 text-muted max-w-xl mx-auto leading-relaxed">
              At Victoria Hotel Apartments, we pride ourselves on delivering
              exceptional service and hospitality. Our dedicated team ensures your
              stay is comfortable and memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {valuePillars.map((pillar) => (
              <div key={pillar.title} className="value-pillar-card group">
                <div className="img-hover-wrap relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover img-hover-zoom"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="img-hover-shine" aria-hidden />
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="font-serif text-xl font-light text-charcoal mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-muted">
              <a
                href={`tel:${siteSettings.phone}`}
                className="flex items-center gap-2 hover:text-charcoal transition-colors"
              >
                <Phone className="w-4 h-4 text-bronze" />
                {siteSettings.phone}
              </a>
              <a
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-2 hover:text-charcoal transition-colors"
              >
                <Mail className="w-4 h-4 text-bronze" />
                {siteSettings.email}
              </a>
            </div>
            <Button href="/book" variant="secondary">
              Info & Booking
            </Button>
          </div>
        </div>
      </ModernSection>

      <ModernSection variant="white" decorative={false} className="!py-16 lg:!py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhotoStrip images={aboutGalleryImages} />
        </div>
      </ModernSection>

      <ImmersiveBand
        image={brandImages.exterior}
        imageAlt="Victoria Hotel entrance"
        label="Reservations"
        title="Ready to reserve?"
        description="Book directly for the best rates. All prices include 15% V.A.T."
        parallax
      >
        <div className="flex flex-col items-center gap-6">
          <Button href="/book" variant="secondary" size="lg">
            Reserve Now <ArrowRight className="w-4 h-4" />
          </Button>
          <div className="max-w-3xl w-full">
            <BookingWidget variant="hero" />
          </div>
        </div>
      </ImmersiveBand>
    </>
  );
}
