"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms", hasDropdown: true },
  { href: "/gallery", label: "Gallery" },
  { href: "/facilities", label: "Facilities" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

interface HeaderProps {
  roomNav: { slug: string; name: string }[];
}

export function Header({ roomNav }: HeaderProps) {
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
        transparent ? "glass-nav" : "glass-nav-solid"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Logo priority={isHome} />

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
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
                      "flex items-center gap-1 text-[0.65rem] tracking-[0.2em] uppercase font-medium transition-colors duration-300",
                      pathname.startsWith("/rooms")
                        ? "text-bronze-light"
                        : transparent
                          ? "text-white/85 hover:text-white"
                          : "text-charcoal/80 hover:text-bronze"
                    )}
                  >
                    {link.label}
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </Link>
                  {roomsOpen && (
                    <div className="absolute top-full left-0 pt-3 w-60 animate-fade-up">
                      <div className="glass-dark rounded-xl py-2 overflow-hidden">
                        {roomNav.map((room) => (
                          <Link
                            key={room.slug}
                            href={`/rooms/${room.slug}`}
                            className="block px-5 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white transition-colors"
                          >
                            {room.name}
                          </Link>
                        ))}
                        <div className="border-t border-white/10 mt-1 pt-1">
                          <Link
                            href="/rooms"
                            className="block px-5 py-2.5 text-[0.65rem] tracking-[0.2em] uppercase text-bronze-light font-semibold hover:text-white transition-colors"
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
                    "text-[0.65rem] tracking-[0.2em] uppercase font-medium transition-colors duration-300",
                    pathname === link.href
                      ? "text-bronze-light"
                      : transparent
                        ? "text-white/85 hover:text-white"
                        : "text-charcoal/80 hover:text-bronze"
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
              "lg:hidden p-2 rounded-full transition-colors",
              transparent ? "text-white hover:bg-white/10" : "text-charcoal hover:bg-charcoal/5"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/10 animate-fade-up">
          <nav className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 text-[0.65rem] tracking-[0.2em] uppercase font-medium text-charcoal border-b border-stone/60 last:border-0 hover:text-bronze transition-colors"
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
