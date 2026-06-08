"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  getReservationByRef,
  getRoomById,
} from "@/lib/mock-data";
import { formatDate, formatPrice } from "@/lib/utils";

function LookupInner() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";
  const [refInput, setRefInput] = useState(initialRef);
  const [searched, setSearched] = useState(!!initialRef);
  const reservation = searched ? getReservationByRef(refInput) : null;
  const room = reservation ? getRoomById(reservation.roomTypeId) : null;

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={refInput}
          onChange={(e) => {
            setRefInput(e.target.value);
            setSearched(false);
          }}
          placeholder="VHA-20260608-XXXX"
          className="flex-1 px-4 py-3 rounded-lg border border-cream-dark focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono text-sm"
        />
        <Button type="submit">
          <Search className="w-4 h-4" /> Find
        </Button>
      </form>

      {searched && !reservation && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0" />
          No booking found with reference &ldquo;{refInput}&rdquo;. Please
          check and try again.
        </div>
      )}

      {reservation && (
        <div className="bg-white rounded-2xl shadow-lg border border-cream-dark overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-cream-dark flex items-center justify-between">
            <div>
              <p className="text-xs text-navy/50 uppercase tracking-wider">
                Booking Reference
              </p>
              <p className="text-xl font-bold font-mono text-gold">
                {reservation.refNumber}
              </p>
            </div>
            <StatusBadge status={reservation.status} />
          </div>
          <div className="p-6 space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-navy/50 text-xs mb-1">Guest</p>
                <p className="font-medium">{reservation.guestName}</p>
              </div>
              <div>
                <p className="text-navy/50 text-xs mb-1">Room</p>
                <p className="font-medium">{room?.name}</p>
              </div>
              <div>
                <p className="text-navy/50 text-xs mb-1">Check-in</p>
                <p className="font-medium">{formatDate(reservation.checkIn)}</p>
              </div>
              <div>
                <p className="text-navy/50 text-xs mb-1">Check-out</p>
                <p className="font-medium">
                  {formatDate(reservation.checkOut)}
                </p>
              </div>
              <div>
                <p className="text-navy/50 text-xs mb-1">Nationality</p>
                <p className="font-medium">{reservation.nationality || "—"}</p>
              </div>
              <div>
                <p className="text-navy/50 text-xs mb-1">Guests</p>
                <p className="font-medium">{reservation.guests}</p>
              </div>
              <div>
                <p className="text-navy/50 text-xs mb-1">Total</p>
                <p className="font-medium text-gold">
                  {formatPrice(reservation.totalAmount)}
                </p>
              </div>
            </div>
            {reservation.specialRequests && (
              <div className="bg-cream rounded-lg p-3">
                <p className="text-xs text-navy/50 mb-1">Special Requests</p>
                <p>{reservation.specialRequests}</p>
              </div>
            )}
          </div>
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
          <h1 className="font-serif text-3xl font-bold text-navy mb-2">
            Find My Booking
          </h1>
          <p className="text-navy/60">
            Enter your booking reference number to check reservation status
          </p>
        </div>
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <LookupInner />
        </Suspense>
      </div>
    </div>
  );
}
