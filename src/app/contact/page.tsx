import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  Plane,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { getSiteSettings } from "@/lib/data/settings";
import { brandImages } from "@/lib/brand-images";
import { getWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Contact Victoria Hotel Apartment in Bole, Addis Ababa. Address, phone, WhatsApp, and directions from Bole International Airport.",
};

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();
  const whatsappUrl = getWhatsAppUrl(
    siteSettings.whatsappNumber,
    "Hello! I'd like to inquire about Victoria Hotel Apartment."
  );

  return (
    <>
      <PageHero
        image={brandImages.exterior}
        imageAlt="Contact Victoria Hotel"
        label="Contact"
        title="We Are Reachable"
        subtitle="24 hours, 7 days a week. Send us a message, call directly, or find us on the map."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <SectionHeading
                label="Get In Touch"
                title="Contact Information"
              />

              <div className="mt-10 space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: (
                      <>
                        {siteSettings.address}
                        <br />
                        {siteSettings.city}, {siteSettings.country}
                      </>
                    ),
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: (
                      <a
                        href={`tel:${siteSettings.phone}`}
                        className="hover:text-bronze transition-colors"
                      >
                        {siteSettings.phone}
                      </a>
                    ),
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: (
                      <a
                        href={`mailto:${siteSettings.email}`}
                        className="hover:text-bronze transition-colors"
                      >
                        {siteSettings.email}
                      </a>
                    ),
                  },
                  {
                    icon: Plane,
                    title: "From Airport",
                    content: (
                      <>
                        {siteSettings.africanUnionDistanceMin} min drive from
                        African Union
                        <br />
                        <span className="text-muted">
                          {siteSettings.airportDistanceMin} min from{" "}
                          {siteSettings.airportName} · Free shuttle
                        </span>
                      </>
                    ),
                  },
                  {
                    icon: Clock,
                    title: "Check-in / Check-out",
                    content: (
                      <>
                        Check-in from {siteSettings.checkInTime}
                        <br />
                        Check-out by {siteSettings.checkOutTime}
                      </>
                    ),
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-stone flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-bronze" />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.15em] uppercase text-muted mb-1">
                        {item.title}
                      </p>
                      <p className="text-sm text-charcoal leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <ContactForm />

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button href="/book" className="flex-1">
                  Book Now
                </Button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#25D366] text-white text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="aspect-square lg:aspect-auto lg:min-h-[560px] bg-stone overflow-hidden border border-stone">
              <iframe
                title="Victoria Hotel Apartments on Google Maps"
                src={`https://maps.google.com/maps?q=${siteSettings.latitude},${siteSettings.longitude}&hl=en&z=16&output=embed`}
                className="w-full h-full min-h-[400px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
