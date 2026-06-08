"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BookingWidgetProps {
  variant?: "hero" | "inline" | "sticky";
  className?: string;
}

export function BookingWidget({
  variant = "inline",
  className,
}: BookingWidgetProps) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  function handleSearch() {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/book?${params.toString()}`);
  }

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "booking-bar",
        isHero && "rounded-none lg:rounded-sm",
        variant === "inline" && "rounded-sm",
        variant === "sticky" && "rounded-sm shadow-lg",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-1">
          <div className="booking-field">
            <label htmlFor="check-in">Check In</label>
            <input
              id="check-in"
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="booking-field">
            <label htmlFor="check-out">Check Out</label>
            <input
              id="check-out"
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="booking-field sm:border-r-0 lg:border-r">
            <label htmlFor="guests">Guests</label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="bg-charcoal hover:bg-bronze-dark text-white text-xs tracking-[0.2em] uppercase font-semibold px-8 py-5 lg:py-0 transition-colors duration-300"
        >
          Check Rates
        </button>
      </div>
    </div>
  );
}
