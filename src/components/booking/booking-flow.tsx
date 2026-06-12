"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import {
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCaptcha } from "@/components/booking/booking-captcha";
import { siteSettings } from "@/lib/mock-data";
import { nationalities } from "@/lib/nationalities";
import { bookingNotes } from "@/lib/content";
import { formatPrice, formatDate, nightsBetween } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { BookingFormData } from "@/lib/types";

interface AvailableRoom {
  id: string;
  slug: string;
  name: string;
  capacity: number;
  bedType: string;
  size: string;
  images: string[];
  shortDescription: string;
  amenities: string[];
  available: number;
  totalPrice: number;
  pricePerNight: number;
}

const STEPS = [
  { id: 0, label: "Dates & Guests", short: "When" },
  { id: 1, label: "Select Room", short: "Room" },
  { id: 2, label: "Your Details", short: "Details" },
  { id: 3, label: "Pay & Confirm", short: "Pay" },
];

const inputClass =
  "w-full px-4 py-3 border border-stone bg-white text-charcoal text-sm focus:outline-none focus:border-charcoal";

function BookingFlowInner() {
  const searchParams = useSearchParams();
  const preRoom = searchParams.get("room");
  const preCheckIn = searchParams.get("checkIn") || "";
  const preCheckOut = searchParams.get("checkOut") || "";
  const preGuests = Number(searchParams.get("guests")) || 1;
  const cancelled = searchParams.get("cancelled");

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingFormData>({
    checkIn: preCheckIn || today,
    checkOut: preCheckOut || tomorrow,
    guests: preGuests,
    roomTypeId: "",
    guestName: "",
    email: "",
    nationality: "",
    phone: "",
    specialRequests: "",
  });
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaValid, setCaptchaValid] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState<{
    code: string;
    subtotal: number;
    total: number;
    savings: number;
  } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [validatingPromo, setValidatingPromo] = useState(false);

  const nights = nightsBetween(form.checkIn, form.checkOut);
  const selectedRoom = availableRooms.find((r) => r.id === form.roomTypeId);
  const subtotalAmount = selectedRoom?.totalPrice ?? 0;
  const totalAmount = promoDiscount?.total ?? subtotalAmount;

  useEffect(() => {
    if (step !== 1 || nights <= 0) return;

    let cancelledReq = false;
    setLoadingRooms(true);
    setSubmitError("");

    fetch(
      `/api/availability?checkIn=${form.checkIn}&checkOut=${form.checkOut}&guests=${form.guests}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelledReq) return;
        const rooms: AvailableRoom[] = data.rooms ?? [];
        setAvailableRooms(rooms);

        if (preRoom && !form.roomTypeId) {
          const match = rooms.find((r) => r.slug === preRoom);
          if (match) setForm((f) => ({ ...f, roomTypeId: match.id }));
        }
      })
      .catch(() => {
        if (!cancelledReq) setSubmitError("Could not load availability.");
      })
      .finally(() => {
        if (!cancelledReq) setLoadingRooms(false);
      });

    return () => {
      cancelledReq = true;
    };
  }, [step, form.checkIn, form.checkOut, form.guests, nights, preRoom, form.roomTypeId]);

  useEffect(() => {
    if (
      form.roomTypeId &&
      !availableRooms.some((r) => r.id === form.roomTypeId)
    ) {
      setForm((f) => ({ ...f, roomTypeId: "" }));
    }
  }, [availableRooms, form.roomTypeId]);

  useEffect(() => {
    setPromoDiscount(null);
    setPromoError("");
    setForm((f) => ({ ...f, promoCode: undefined }));
  }, [form.roomTypeId, form.checkIn, form.checkOut]);

  async function applyPromo() {
    if (!promoCode.trim() || !form.roomTypeId) return;
    setValidatingPromo(true);
    setPromoError("");
    try {
      const res = await fetch("/api/promotions/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promoCode,
          roomTypeId: form.roomTypeId,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPromoDiscount(null);
        setPromoError(data.error || "Invalid promo code");
        return;
      }
      setPromoDiscount({
        code: data.code,
        subtotal: data.subtotal,
        total: data.total,
        savings: data.savings,
      });
      setForm((f) => ({ ...f, promoCode: data.code }));
    } catch {
      setPromoError("Could not validate promo code");
    } finally {
      setValidatingPromo(false);
    }
  }

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
        return captchaValid && !submitting;
      default:
        return false;
    }
  }

  async function handleConfirm() {
    if (!captchaValid || submitting) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Booking failed");
        setSubmitting(false);
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      if (data.devMode && data.reservation) {
        window.location.href = `/book/success?ref=${data.reservation.refNumber}`;
        return;
      }

      setSubmitError("Unexpected response from server");
      setSubmitting(false);
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {cancelled && (
        <div className="mb-4 p-3 border border-amber-300 bg-amber-50 text-sm text-amber-900">
          Payment was cancelled. Your reservation is still pending — complete payment or contact us.
        </div>
      )}

      <ol className="flex gap-2 mb-6 text-xs">
        {STEPS.map((s) => (
          <li
            key={s.id}
            className={cn(
              "flex-1 py-2 text-center border",
              step === s.id ? "bg-charcoal text-white border-charcoal" : "border-stone text-muted"
            )}
          >
            {s.id + 1}. {s.short}
          </li>
        ))}
      </ol>

      <div className="bg-white border border-stone p-6">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl">Dates & guests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase text-muted block mb-1">Check-in</label>
                <input type="date" value={form.checkIn} min={today}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-xs uppercase text-muted block mb-1">Check-out</label>
                <input type="date" value={form.checkOut} min={form.checkIn || today}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase text-muted block mb-1">Guests</label>
              <select value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className={inputClass}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} guest{n !== 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            {nights > 0 && <p className="text-sm">{nights} night(s) · {bookingNotes.vat}</p>}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-serif text-xl mb-1">Select room</h2>
            <p className="text-sm text-muted mb-4">
              {formatDate(form.checkIn)} — {formatDate(form.checkOut)} · {form.guests} guest(s)
            </p>
            {loadingRooms && (
              <p className="flex items-center gap-2 text-sm text-muted py-8">
                <Loader2 className="w-4 h-4 animate-spin" /> Checking availability...
              </p>
            )}
            {!loadingRooms && availableRooms.length === 0 && (
              <div className="flex items-start gap-2 border border-amber-200 bg-amber-50 p-4 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                No rooms available for these dates.
              </div>
            )}
            <div className="space-y-3">
              {availableRooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setForm({ ...form, roomTypeId: room.id })}
                  className={cn(
                    "w-full text-left border p-4 flex gap-4",
                    form.roomTypeId === room.id ? "border-charcoal bg-stone/30" : "border-stone"
                  )}
                >
                  <div className="relative w-24 h-20 shrink-0">
                    <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{room.name}</p>
                    <p className="text-xs text-muted">{room.size} · {room.bedType} · {room.available} left</p>
                    <p className="text-sm text-bronze mt-1">
                      {formatPrice(room.pricePerNight)}/night · {formatPrice(room.totalPrice)} total
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-serif text-xl">Guest details</h2>
            <input type="text" placeholder="Full name *" value={form.guestName}
              onChange={(e) => setForm({ ...form, guestName: e.target.value })} className={inputClass} />
            <input type="email" placeholder="Email *" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            <select value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} className={inputClass}>
              <option value="">Nationality *</option>
              {nationalities.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <input type="tel" placeholder="Phone / WhatsApp" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
            <textarea placeholder="Special requests" value={form.specialRequests} rows={3}
              onChange={(e) => setForm({ ...form, specialRequests: e.target.value })} className={inputClass} />
          </div>
        )}

        {step === 3 && selectedRoom && (
          <div>
            <h2 className="font-serif text-xl mb-4">Review & pay</h2>
            <dl className="text-sm space-y-2 mb-4 border-b border-stone pb-4">
              <div className="flex justify-between"><dt>Room</dt><dd>{selectedRoom.name}</dd></div>
              <div className="flex justify-between"><dt>Guest</dt><dd>{form.guestName}</dd></div>
              <div className="flex justify-between"><dt>Email</dt><dd>{form.email}</dd></div>
              <div className="flex justify-between"><dt>Stay</dt><dd>{formatDate(form.checkIn)} — {formatDate(form.checkOut)}</dd></div>
              {promoDiscount && (
                <>
                  <div className="flex justify-between text-muted"><dt>Subtotal</dt><dd>{formatPrice(promoDiscount.subtotal)}</dd></div>
                  <div className="flex justify-between text-green-700"><dt>Promo ({promoDiscount.code})</dt><dd>-{formatPrice(promoDiscount.savings)}</dd></div>
                </>
              )}
              <div className="flex justify-between font-medium text-lg pt-2"><dt>Total</dt><dd className="text-bronze">{formatPrice(totalAmount)}</dd></div>
            </dl>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Promo code (e.g. DIRECT10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className={`flex-1 ${inputClass}`}
              />
              <Button type="button" variant="outline" onClick={applyPromo} disabled={validatingPromo || !promoCode.trim()}>
                {validatingPromo ? "..." : "Apply"}
              </Button>
            </div>
            {promoError && <p className="text-sm text-red-600 mb-4">{promoError}</p>}
            {promoDiscount && <p className="text-xs text-green-700 mb-4">Promo {promoDiscount.code} applied</p>}
            <BookingCaptcha value={captchaInput} onChange={setCaptchaInput} onValidChange={setCaptchaValid} className="mb-4" />
            <p className="text-xs text-muted">{bookingNotes.payment} · {bookingNotes.cancellation}</p>
            {submitError && <p className="mt-3 text-sm text-red-600">{submitError}</p>}
          </div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t border-stone">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={submitting}>
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          ) : <div />}
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleConfirm} disabled={!canProceed()}>
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Pay with Stripe"}
            </Button>
          )}
        </div>
      </div>

      {selectedRoom && step > 0 && (
        <div className="mt-4 p-4 bg-charcoal text-white text-sm">
          <p>{selectedRoom.name} · {formatPrice(totalAmount)} total</p>
          <p className="text-white/60 text-xs mt-1">{siteSettings.hotelName}</p>
        </div>
      )}
    </div>
  );
}

export function BookingFlow() {
  return (
    <Suspense fallback={<p className="text-center py-10 text-muted">Loading...</p>}>
      <BookingFlowInner />
    </Suspense>
  );
}
