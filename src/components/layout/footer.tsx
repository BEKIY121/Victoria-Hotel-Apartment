"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { siteSettings } from "@/lib/mock-data";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          <div className="lg:col-span-1">
            <Logo imageClassName="h-14 mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              {siteSettings.tagline}. A stunning and tranquil place to work
              and relax in the heart of Bole, Addis Ababa.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-bronze mb-5 font-semibold">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { href: "/rooms", label: "Our Rooms" },
                { href: "/gallery", label: "Photo Gallery" },
                { href: "/facilities", label: "Facilities" },
                { href: "/amenities", label: "Amenities" },
                { href: "/book", label: "Book Direct & Save" },
                { href: "/reviews", label: "Guest Reviews" },
                { href: "/booking/lookup", label: "Find My Booking" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-bronze mb-5 font-semibold">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-bronze" />
                <span>
                  {siteSettings.address}, {siteSettings.city},{" "}
                  {siteSettings.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-bronze" />
                <a href={`tel:${siteSettings.phone}`} className="hover:text-white">
                  {siteSettings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-bronze" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="hover:text-white"
                >
                  {siteSettings.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-bronze mb-5 font-semibold">
              Also Listed On
            </h4>
            <p className="text-xs text-white/40 mb-4 leading-relaxed">
              Book direct for the best rates. OTA links for reference only.
            </p>
            <div className="space-y-2">
              <a
                href={siteSettings.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Booking.com
              </a>
              <a
                href={siteSettings.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Airbnb
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30 text-center">
            &copy; {new Date().getFullYear()} Victoria Hotel Apartments
          </p>
        </div>
      </div>
    </footer>
  );
}
