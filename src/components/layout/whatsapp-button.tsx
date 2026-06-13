"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { siteSettings } from "@/lib/mock-data";
import { getWhatsAppUrl } from "@/lib/utils";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const message = `Hello Victoria Hotel Apartment! I'd like to inquire about a reservation.`;
  const url = getWhatsAppUrl(siteSettings.whatsappNumber, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366]/90 backdrop-blur-md text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 whatsapp-pulse border border-white/20"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-xs tracking-wider uppercase font-semibold hidden sm:inline">
        WhatsApp
      </span>
    </a>
  );
}
