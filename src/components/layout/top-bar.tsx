"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteSettings } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TopBar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div
      className={cn(
        "hidden lg:block bg-charcoal/90 backdrop-blur-md text-white/70 text-[0.7rem] border-b border-white/8 transition-all duration-300 overflow-hidden",
        hidden ? "max-h-0 opacity-0 border-transparent" : "max-h-9 opacity-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-bronze-light" />
            {siteSettings.address}, {siteSettings.city}
          </span>
          <a
            href={`tel:${siteSettings.phone}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-bronze-light" />
            {siteSettings.phone}
          </a>
          <a
            href={`mailto:${siteSettings.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3 h-3 text-bronze-light" />
            {siteSettings.email}
          </a>
        </div>
        <p className="text-white/40 tracking-[0.12em] uppercase text-[0.65rem] font-medium">
          Book direct — best rates guaranteed
        </p>
      </div>
    </div>
  );
}
