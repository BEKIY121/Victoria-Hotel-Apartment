"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/utils";
import type { ReservationStatus } from "@/lib/types";

interface ReservationResult {
  refNumber: string;
  guestName: string;
  email: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status: ReservationStatus;
}

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const ref = searchParams.get("ref");
  const [reservation, setReservation] = useState<ReservationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (sessionId) {
        try {
          await fetch("/api/reservations/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });
        } catch {
          /* webhook may have already confirmed */
        }
      }

      const query = sessionId
        ? `session_id=${sessionId}`
        : ref
          ? `ref=${encodeURIComponent(ref)}`
          : "";

      if (!query) {
        setError("Missing booking reference.");
        setLoading(false);
        return;
      }

      fetch(`/api/reservations/lookup?${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.reservation) setReservation(data.reservation);
          else setError(data.error || "Booking not found");
        })
        .catch(() => setError("Could not load booking"))
        .finally(() => setLoading(false));
    }

    load();
  }, [sessionId, ref]);

  if (loading) return <p className="text-center py-16">Confirming your booking...</p>;
  if (error || !reservation) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <p className="text-red-600 mb-4">{error || "Not found"}</p>
        <Button href="/book">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto border border-stone bg-white p-8">
      <h1 className="font-serif text-2xl mb-2">Booking Confirmed</h1>
      <p className="text-sm text-muted mb-6">Reference: <strong className="text-bronze">{reservation.refNumber}</strong></p>
      <dl className="text-sm space-y-2 mb-6">
        <div className="flex justify-between"><dt>Guest</dt><dd>{reservation.guestName}</dd></div>
        <div className="flex justify-between"><dt>Room</dt><dd>{reservation.roomName}</dd></div>
        <div className="flex justify-between"><dt>Check-in</dt><dd>{formatDate(reservation.checkIn)}</dd></div>
        <div className="flex justify-between"><dt>Check-out</dt><dd>{formatDate(reservation.checkOut)}</dd></div>
        <div className="flex justify-between"><dt>Total</dt><dd>{formatPrice(reservation.totalAmount)}</dd></div>
        <div className="flex justify-between"><dt>Status</dt><dd className="capitalize">{reservation.status.replace("_", " ")}</dd></div>
      </dl>
      <p className="text-sm text-muted mb-6">Confirmation sent to {reservation.email}</p>
      <div className="flex gap-3">
        <Button href={`/booking/lookup?ref=${reservation.refNumber}`} variant="outline" className="flex-1">
          Track Booking
        </Button>
        <Button href="/" className="flex-1">Home</Button>
      </div>
    </div>
  );
}

export default function BookSuccessPage() {
  return (
    <div className="py-16 px-4">
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <SuccessInner />
      </Suspense>
    </div>
  );
}
