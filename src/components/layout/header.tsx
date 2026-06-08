"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { roomTypes } from "@/lib/mock-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms", hasDropdown: true },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        transparent
          ? "bg-transparent border-b border-white/10"
          : "bg-white/98 backdrop-blur-md border-b border-stone shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo priority={isHome} />

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setRoomsOpen(true)}
                  onMouseLeave={() => setRoomsOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 text-xs tracking-[0.15em] uppercase font-medium transition-colors",
                      pathname.startsWith("/rooms")
                        ? "text-bronze"
                        : transparent
                          ? "text-white/90 hover:text-white"
                          : "text-charcoal hover:text-bronze"
                    )}
                  >
                    {link.label}
                    <ChevronDown className="w-3 h-3" />
                  </Link>
                  {roomsOpen && (
                    <div className="absolute top-full left-0 pt-2 w-56 animate-fade-up">
                      <div className="bg-white shadow-xl border border-stone py-2">
                        {roomTypes.map((room) => (
                          <Link
                            key={room.id}
                            href={`/rooms/${room.slug}`}
                            className="block px-5 py-2.5 text-sm text-charcoal hover:bg-warm-gray hover:text-bronze transition-colors"
                          >
                            {room.name}
                          </Link>
                        ))}
                        <div className="border-t border-stone mt-1 pt-1">
                          <Link
                            href="/rooms"
                            className="block px-5 py-2.5 text-xs tracking-wider uppercase text-bronze font-medium"
                          >
                            View All Rooms
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs tracking-[0.15em] uppercase font-medium transition-colors",
                    pathname === link.href
                      ? "text-bronze"
                      : transparent
                        ? "text-white/90 hover:text-white"
                        : "text-charcoal hover:text-bronze"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/book"
              variant={transparent ? "light" : "primary"}
              size="sm"
            >
              Check Availability
            </Button>
          </div>

          <button
            className={cn(
              "lg:hidden p-2",
              transparent ? "text-white" : "text-charcoal"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-stone animate-fade-up">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 text-xs tracking-[0.15em] uppercase font-medium text-charcoal border-b border-stone last:border-0 hover:text-bronze"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Button href="/book" className="w-full" onClick={() => setMobileOpen(false)}>
                Check Availability
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
