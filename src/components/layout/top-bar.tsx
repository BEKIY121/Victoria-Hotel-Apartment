"use client";

import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteSettings } from "@/lib/mock-data";

export function TopBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="hidden lg:block bg-charcoal text-white/80 text-xs border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-bronze" />
            {siteSettings.address}, {siteSettings.city}
          </span>
          <a
            href={`tel:${siteSettings.phone}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-bronze" />
            {siteSettings.phone}
          </a>
          <a
            href={`mailto:${siteSettings.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-bronze" />
            {siteSettings.email}
          </a>
        </div>
        <p className="text-white/50 italic font-serif">
          Book direct — best rates guaranteed
        </p>
      </div>
    </div>
  );
}
