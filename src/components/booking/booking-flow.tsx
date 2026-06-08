"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Pencil,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCaptcha } from "@/components/booking/booking-captcha";
import { BookingAdvantages } from "@/components/booking/booking-advantages";
import {
  roomTypes,
  seasonalPricing,
  siteSettings,
  getRoomBySlug,
  getAvailableCount,
} from "@/lib/mock-data";
import { nationalities } from "@/lib/nationalities";
import { bookingNotes } from "@/lib/content";
import { calculateStayTotal } from "@/lib/pricing";
import {
  formatPrice,
  formatDate,
  generateRefNumber,
  nightsBetween,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/lib/types";

const STEPS = [
  { id: 0, label: "Dates & Guests", short: "When" },
  { id: 1, label: "Select Room", short: "Room" },
  { id: 2, label: "Your Details", short: "Details" },
  { id: 3, label: "Confirm", short: "Confirm" },
];

const inputClass =
  "w-full px-4 py-3.5 border border-stone bg-warm-white text-charcoal text-sm focus:outline-none focus:border-charcoal transition-colors";

function BookingFlowInner() {
  const searchParams = useSearchParams();

  const preRoom = searchParams.get("room");
  const preCheckIn = searchParams.get("checkIn") || "";
  const preCheckOut = searchParams.get("checkOut") || "";
  const preGuests = Number(searchParams.get("guests")) || 1;

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const hasPrefilledDates = !!(preCheckIn && preCheckOut);
  const initialStep = preRoom && hasPrefilledDates ? 1 : hasPrefilledDates ? 1 : 0;

  const [step, setStep] = useState(initialStep);
  const [form, setForm] = useState<BookingFormData>({
    checkIn: preCheckIn || today,
    checkOut: preCheckOut || tomorrow,
    guests: preGuests,
    roomTypeId: preRoom ? getRoomBySlug(preRoom)?.id || "" : "",
    guestName: "",
    email: "",
    nationality: "",
    phone: "",
    specialRequests: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);

  const nights = nightsBetween(form.checkIn, form.checkOut);

  const availableRooms = useMemo(() => {
    if (!form.checkIn || !form.checkOut || nights === 0) return [];
    return roomTypes
      .filter((r) => r.capacity >= form.guests)
      .map((r) => ({
        ...r,
        available: getAvailableCount(r.id, form.checkIn, form.checkOut),
        total: calculateStayTotal(
          r,
          form.checkIn,
          form.checkOut,
          seasonalPricing
        ),
        nightly: Math.round(
          calculateStayTotal(r, form.checkIn, form.checkOut, seasonalPricing) /
            nights
        ),
      }))
      .filter((r) => r.available > 0);
  }, [form.checkIn, form.checkOut, form.guests, nights]);

  const selectedRoom = roomTypes.find((r) => r.id === form.roomTypeId);
  const totalAmount = selectedRoom
    ? calculateStayTotal(
        selectedRoom,
        form.checkIn,
        form.checkOut,
        seasonalPricing
      )
    : 0;

  // Clear room if no longer available when dates change
  useEffect(() => {
    if (
      form.roomTypeId &&
      !availableRooms.some((r) => r.id === form.roomTypeId)
    ) {
      setForm((f) => ({ ...f, roomTypeId: "" }));
    }
  }, [availableRooms, form.roomTypeId]);

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return !!form.checkIn && !!form.checkOut && nights > 0;
      case 1:
        return !!form.roomTypeId;
      case 2:
        return (
          form.guestName.trim().length >= 2 &&
          form.email.includes("@") &&
          form.nationality.length > 0
        );
      case 3:
        return captchaValid;
      default:
        return false;
    }
  }

  function handleConfirm() {
    if (!captchaValid) return;
    setRefNumber(generateRefNumber());
    setConfirmed(true);
  }

  function goToStep(target: number) {
    if (target < step || confirmed) setStep(target);
  }

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-up">
        <div className="bg-white border border-stone overflow-hidden">
          <div className="bg-charcoal text-white p-10 text-center">
            <div className="w-14 h-14 border border-white/30 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-normal mb-2">
              Reservation Confirmed
            </h2>
            <p className="text-white/60 text-sm">
              Thank you for booking with {siteSettings.hotelName}
            </p>
          </div>

          <div className="p-8 lg:p-10 space-y-8">
            <div className="text-center py-6 border border-stone bg-warm-gray">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-2">
                Confirmation Number
              </p>
              <p className="text-2xl font-serif text-bronze tracking-wide">
                {refNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-stone border border-stone">
              {[
                { label: "Room", value: selectedRoom?.name },
                { label: "Guest", value: form.guestName },
                { label: "Nationality", value: form.nationality },
                { label: "Email", value: form.email },
                { label: "Check-in", value: formatDate(form.checkIn) },
                { label: "Check-out", value: formatDate(form.checkOut) },
                {
                  label: "Total",
                  value: formatPrice(totalAmount),
                  highlight: true,
                },
              ].map((item) => (
                <div key={item.label} className="bg-white p-4">
                  <p className="text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-1">
                    {item.label}
                  </p>
                  <p
                    className={cn(
                      "text-sm font-medium break-words",
                      item.highlight
                        ? "text-bronze font-serif text-lg"
                        : "text-charcoal"
                    )}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-sm text-muted border-l-2 border-bronze pl-4 space-y-1">
              <p>
                Confirmation sent to{" "}
                <strong className="text-charcoal">{form.email}</strong>.
              </p>
              <p>WhatsApp notification will follow if a phone number was provided.</p>
              <p className="text-xs pt-1">{bookingNotes.vat} · {bookingNotes.payment}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                href={`/booking/lookup?ref=${refNumber}`}
                variant="outline"
                className="flex-1"
              >
                Track Reservation
              </Button>
              <Button href="/" className="flex-1">
                Return Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      {/* Step navigation */}
      <div className="lg:col-span-3">
        <div className="lg:sticky lg:top-28 space-y-6">
          <div>
            <p className="section-label mb-4">Reserve Now</p>
            <ol className="space-y-1">
              {STEPS.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => s.id < step && goToStep(s.id)}
                    disabled={s.id > step}
                    className={cn(
                      "w-full flex items-center gap-4 py-3 px-4 transition-colors text-left",
                      step === s.id && "bg-charcoal text-white",
                      step > s.id && "text-bronze cursor-pointer hover:bg-warm-gray",
                      step < s.id && "text-muted cursor-not-allowed"
                    )}
                  >
                    <span
                      className={cn(
                        "w-7 h-7 flex items-center justify-center text-xs font-semibold shrink-0",
                        step === s.id && "bg-white text-charcoal",
                        step > s.id && "booking-step-done",
                        step < s.id && "booking-step-pending"
                      )}
                    >
                      {step > s.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        s.id + 1
                      )}
                    </span>
                    <span className="text-xs tracking-wider uppercase font-medium hidden sm:inline">
                      {s.label}
                    </span>
                    <span className="text-xs tracking-wider uppercase font-medium sm:hidden">
                      {s.short}
                    </span>
                    {step > s.id && (
                      <Pencil className="w-3 h-3 ml-auto opacity-50" />
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Compact advantages on mobile below steps */}
          <div className="hidden lg:block bg-warm-gray border border-stone p-5">
            <BookingAdvantages compact />
          </div>
        </div>
      </div>

      {/* Main form */}
      <div className="lg:col-span-5">
        <div className="bg-white border border-stone p-6 lg:p-10 animate-fade-up">
          {/* Step 0: Dates */}
          {step === 0 && (
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-2">
                When would you like to stay?
              </h2>
              <p className="text-sm text-muted mb-2">
                Select check-in and check-out dates to see live availability.
              </p>
              <p className="text-xs text-bronze mb-8">
                {siteSettings.address} · {siteSettings.africanUnionDistanceMin} min
                from African Union · {siteSettings.airportDistanceMin} min from
                airport
              </p>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                      Check In Date *
                    </label>
                    <input
                      type="date"
                      value={form.checkIn}
                      min={today}
                      onChange={(e) =>
                        setForm({ ...form, checkIn: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                      Check Out Date *
                    </label>
                    <input
                      type="date"
                      value={form.checkOut}
                      min={form.checkIn || today}
                      onChange={(e) =>
                        setForm({ ...form, checkOut: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                    Number of Guests *
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) =>
                      setForm({ ...form, guests: Number(e.target.value) })
                    }
                    className={inputClass}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                {nights > 0 && (
                  <div className="flex items-center gap-2 text-sm text-charcoal bg-warm-gray px-4 py-3 border border-stone">
                    <Check className="w-4 h-4 text-bronze" />
                    {nights} night{nights !== 1 ? "s" : ""} selected ·{" "}
                    {bookingNotes.vat}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 1: Room */}
          {step === 1 && (
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-2">
                Select your room
              </h2>
              <p className="text-sm text-muted mb-1">
                {formatDate(form.checkIn)} — {formatDate(form.checkOut)} ·{" "}
                {form.guests} guest{form.guests !== 1 ? "s" : ""} · {nights}{" "}
                night{nights !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-bronze mb-6">{bookingNotes.vat}</p>

              {availableRooms.length === 0 ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    No rooms available for these dates. Please try different
                    dates.
                  </div>
                  <Button variant="outline" onClick={() => setStep(0)}>
                    Change Dates
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableRooms.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, roomTypeId: room.id })
                      }
                      className={cn(
                        "w-full text-left border transition-all duration-200",
                        form.roomTypeId === room.id
                          ? "border-charcoal ring-1 ring-charcoal bg-warm-gray"
                          : "border-stone hover:border-charcoal/40"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-40 h-36 sm:min-h-[140px] shrink-0">
                          <Image
                            src={room.images[0]}
                            alt={room.name}
                            fill
                            className="object-cover"
                          />
                          {room.slug === "studio-apartment" && (
                            <span className="absolute top-2 left-2 bg-bronze text-white text-[0.55rem] tracking-wider uppercase px-2 py-1">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="flex-1 p-5">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="font-serif text-lg text-charcoal">
                                {room.name}
                              </h3>
                              <p className="text-xs text-muted mt-1 line-clamp-2">
                                {room.shortDescription}
                              </p>
                              <p className="text-[0.65rem] text-muted mt-2">
                                {room.size} · {room.bedType} · up to{" "}
                                {room.capacity} guests
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-serif text-xl text-bronze">
                                {formatPrice(room.nightly)}
                              </p>
                              <p className="text-[0.6rem] tracking-wider uppercase text-muted">
                                per night
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {room.amenities.slice(0, 3).map((a) => (
                              <span
                                key={a}
                                className="text-[0.6rem] bg-white border border-stone px-2 py-0.5 text-muted"
                              >
                                {a}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone">
                            <span className="text-xs text-green-700 font-medium">
                              {room.available} room
                              {room.available !== 1 ? "s" : ""} left
                            </span>
                            <span className="text-sm font-semibold text-charcoal">
                              {formatPrice(room.total)} total
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Guest details — matches their form fields */}
          {step === 2 && (
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-2">
                Guest information
              </h2>
              <p className="text-sm text-muted mb-8">
                Required fields marked with *. Confirmation will be sent to your
                email.
              </p>
              <div className="space-y-5">
                <div>
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.guestName}
                    onChange={(e) =>
                      setForm({ ...form, guestName: e.target.value })
                    }
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                    Nationality *
                  </label>
                  <select
                    value={form.nationality}
                    onChange={(e) =>
                      setForm({ ...form, nationality: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">Select nationality</option>
                    {nationalities.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="+251 911 000 000"
                    className={inputClass}
                  />
                  <p className="text-xs text-muted mt-1">
                    Optional — for WhatsApp booking confirmation
                  </p>
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-2 block">
                    Special Requests
                  </label>
                  <textarea
                    value={form.specialRequests}
                    onChange={(e) =>
                      setForm({ ...form, specialRequests: e.target.value })
                    }
                    rows={3}
                    placeholder="Airport pickup, late check-in, dietary needs..."
                    className={cn(inputClass, "resize-none")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review + Captcha */}
          {step === 3 && (
            <div>
              <h2 className="font-serif text-2xl text-charcoal mb-2">
                Review & confirm
              </h2>
              <p className="text-sm text-muted mb-8">
                Please verify your reservation details before completing
              </p>

              <div className="divide-y divide-stone mb-8">
                {[
                  { label: "Room", value: selectedRoom?.name },
                  { label: "Guest", value: form.guestName },
                  { label: "Nationality", value: form.nationality },
                  { label: "Email", value: form.email },
                  ...(form.phone
                    ? [{ label: "Phone", value: form.phone }]
                    : []),
                  {
                    label: "Stay",
                    value: `${formatDate(form.checkIn)} — ${formatDate(form.checkOut)}`,
                  },
                  { label: "Nights", value: String(nights) },
                  { label: "Guests", value: String(form.guests) },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between py-3.5 text-sm gap-4"
                  >
                    <span className="text-muted shrink-0">{row.label}</span>
                    <span className="font-medium text-charcoal text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between py-5">
                  <div>
                    <span className="font-serif text-lg text-charcoal">
                      Total
                    </span>
                    <p className="text-[0.6rem] text-muted tracking-wider uppercase mt-0.5">
                      {bookingNotes.vat}
                    </p>
                  </div>
                  <span className="font-serif text-2xl text-bronze">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              <BookingCaptcha
                value={captchaInput}
                onChange={setCaptchaInput}
                onValidChange={setCaptchaValid}
                className="mb-6"
              />

              <p className="text-xs text-muted leading-relaxed">
                {bookingNotes.payment} · {bookingNotes.cancellation} ·{" "}
                {bookingNotes.confirmation}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-8 border-t border-stone">
            {step > 0 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleConfirm} disabled={!captchaValid}>
                Complete Reservation
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Rate summary sidebar */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28 bg-charcoal text-white p-8">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-white/50 mb-6">
            Your Reservation
          </p>

          {form.checkIn && form.checkOut && nights > 0 && (
            <div className="space-y-3 text-sm mb-6 pb-6 border-b border-white/10">
              <div className="flex justify-between">
                <span className="text-white/50">Check-in</span>
                <span>{formatDate(form.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Check-out</span>
                <span>{formatDate(form.checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Guests</span>
                <span>{form.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Duration</span>
                <span>
                  {nights} night{nights !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}

          {selectedRoom ? (
            <>
              <p className="font-serif text-xl mb-1">{selectedRoom.name}</p>
              <p className="text-xs text-white/50 mb-1">{selectedRoom.size}</p>
              <Link
                href={`/rooms/${selectedRoom.slug}`}
                className="text-[0.6rem] tracking-wider uppercase text-bronze-light hover:underline"
              >
                View room details
              </Link>
              {totalAmount > 0 && (
                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <span className="text-white/50 text-sm">Total</span>
                    <span className="font-serif text-3xl text-bronze-light">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                  <p className="text-[0.6rem] text-white/40 mt-2 tracking-wider uppercase">
                    {bookingNotes.vat}
                  </p>
                </div>
              )}
            </>
          ) : (
            <p className="text-white/40 text-sm italic font-serif">
              Complete each step to build your reservation
            </p>
          )}

          <div className="mt-8 pt-6 border-t border-white/10">
            <BookingAdvantages />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingFlow() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-muted text-sm tracking-wider uppercase">
          Loading reservation...
        </div>
      }
    >
      <BookingFlowInner />
    </Suspense>
  );
}
