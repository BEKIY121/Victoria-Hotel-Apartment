"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatPrice } from "@/lib/utils";
import { bookingNotes } from "@/lib/content";
import type { ReservationStatus } from "@/lib/types";

interface ReservationResult {
  refNumber: string;
  guestName: string;
  email: string;
  phone: string;
  nationality?: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: ReservationStatus;
  specialRequests?: string;
  paymentStatus?: string | null;
}

function LookupInner() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";
  const [refInput, setRefInput] = useState(initialRef);
  const [emailInput, setEmailInput] = useState("");
  const [reservation, setReservation] = useState<ReservationResult | null>(null);
  const [canCancel, setCanCancel] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelMsg, setCancelMsg] = useState("");

  useEffect(() => {
    if (initialRef) {
      const params = new URLSearchParams({ ref: initialRef.trim() });
      fetch(`/api/reservations/lookup?${params}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.reservation) {
            setReservation({ ...data.reservation, paymentStatus: data.paymentStatus });
            setCanCancel(Boolean(data.canCancel));
          } else setError(data.error || "Not found");
        });
    }
  }, [initialRef]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCancelMsg("");
    setReservation(null);
    setCanCancel(false);

    const params = new URLSearchParams({ ref: refInput.trim() });
    if (emailInput.trim()) params.set("email", emailInput.trim());

    try {
      const res = await fetch(`/api/reservations/lookup?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Booking not found");
      } else {
        setReservation({ ...data.reservation, paymentStatus: data.paymentStatus });
        setCanCancel(Boolean(data.canCancel));
      }
    } catch {
      setError("Lookup failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!reservation || !emailInput.trim()) {
      setCancelMsg("Enter your email above to verify before cancelling.");
      return;
    }
    if (!confirm(`Cancel booking ${reservation.refNumber}?`)) return;

    setCancelling(true);
    setCancelMsg("");
    try {
      const res = await fetch("/api/reservations/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: reservation.refNumber, email: emailInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCancelMsg(data.error || "Cancellation failed");
        return;
      }
      setReservation({ ...data.reservation, paymentStatus: reservation.paymentStatus });
      setCanCancel(false);
      setCancelMsg("Booking cancelled. A confirmation email has been sent.");
    } catch {
      setCancelMsg("Cancellation failed — please contact the hotel.");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="space-y-3 mb-8">
        <input
          type="text"
          value={refInput}
          onChange={(e) => setRefInput(e.target.value)}
          placeholder="Booking reference (VHA-...)"
          className="w-full px-4 py-3 border border-stone font-mono text-sm"
          required
        />
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Email (required to cancel)"
          className="w-full px-4 py-3 border border-stone text-sm"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Searching..." : "Find Booking"}
        </Button>
      </form>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {reservation && (
        <div className="border border-stone bg-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-muted uppercase">Reference</p>
              <p className="font-mono text-lg text-bronze">{reservation.refNumber}</p>
            </div>
            <StatusBadge status={reservation.status} />
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted text-xs">Guest</dt><dd>{reservation.guestName}</dd></div>
            <div><dt className="text-muted text-xs">Room</dt><dd>{reservation.roomName}</dd></div>
            <div><dt className="text-muted text-xs">Check-in</dt><dd>{formatDate(reservation.checkIn)}</dd></div>
            <div><dt className="text-muted text-xs">Check-out</dt><dd>{formatDate(reservation.checkOut)}</dd></div>
            <div><dt className="text-muted text-xs">Guests</dt><dd>{reservation.guests}</dd></div>
            <div><dt className="text-muted text-xs">Total</dt><dd>{formatPrice(reservation.totalAmount)}</dd></div>
            {reservation.paymentStatus && (
              <div><dt className="text-muted text-xs">Payment</dt><dd className="capitalize">{reservation.paymentStatus}</dd></div>
            )}
          </dl>
          {reservation.specialRequests && (
            <p className="mt-4 text-sm border-t border-stone pt-4">
              <span className="text-muted">Notes: </span>{reservation.specialRequests}
            </p>
          )}
          {canCancel && reservation.status !== "cancelled" && (
            <div className="mt-6 pt-4 border-t border-stone">
              <p className="text-xs text-muted mb-3">{bookingNotes.cancellation}</p>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full"
              >
                {cancelling ? "Cancelling..." : "Cancel Booking"}
              </Button>
            </div>
          )}
          {cancelMsg && (
            <p className={`mt-3 text-sm ${cancelMsg.includes("cancelled") ? "text-green-700" : "text-red-600"}`}>
              {cancelMsg}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function BookingLookupPage() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl mb-2">Find My Booking</h1>
          <p className="text-muted text-sm">Enter your booking reference to check status</p>
        </div>
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <LookupInner />
        </Suspense>
      </div>
    </div>
  );
}
