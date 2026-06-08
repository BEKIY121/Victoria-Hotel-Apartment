import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { welcomeContent, aboutContent, hotelAdvantages } from "@/lib/content";
import { siteSettings } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Victoria Hotel Apartments in Sarbet, Addis Ababa. Led by Ato Tadesse Endeshaw with 22+ years of international hospitality experience.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-end -mt-16 lg:-mt-[6.25rem]">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Victoria Hotel Apartments"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16">
          <p className="section-label text-bronze-light mb-3">About Us</p>
          <h1 className="font-serif text-4xl lg:text-6xl font-normal text-white max-w-3xl">
            {aboutContent.title}
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {aboutContent.paragraphs.map((p, i) => (
            <p key={i} className="text-muted leading-relaxed mb-6 text-lg">
              {p}
            </p>
          ))}
          <p className="font-serif text-2xl text-bronze italic mt-10">
            {welcomeContent.tagline}
          </p>
        </div>
      </section>

      <section className="py-16 bg-warm-gray border-y border-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b9352d8c311a?w=600&q=80"
                alt={siteSettings.managerName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                label="Leadership"
                title={siteSettings.managerName}
                subtitle={siteSettings.managerTitle}
              />
              <p className="mt-6 text-muted leading-relaxed">
                {siteSettings.managerBio}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-charcoal">
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
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Advantages"
            title="Why Choose Victoria"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelAdvantages.map((item) => (
              <div
                key={item.title}
                className="border border-stone p-6 bg-white card-luxury"
              >
                <h3 className="font-serif text-lg text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-charcoal text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl mb-4">Ready to Reserve?</h2>
          <p className="text-white/60 mb-8">
            Book directly for the best rates. All prices include 15% V.A.T.
          </p>
          <Button href="/book" variant="secondary" size="lg">
            Reserve Now <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
