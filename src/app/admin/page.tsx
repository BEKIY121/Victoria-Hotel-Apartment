"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  CalendarCheck,
  LogOut,
  MessageCircle,
  LayoutList,
  CalendarDays,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  reservations as initialReservations,
  getRoomById,
  getGuestHistory,
} from "@/lib/mock-data";
import { formatDate, formatPrice } from "@/lib/utils";
import type { Reservation, ReservationStatus } from "@/lib/types";

const statusOptions: ReservationStatus[] = [
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
];

export default function AdminBookingPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<"list" | "calendar">("list");

  const today = new Date().toISOString().slice(0, 10);

  const filtered = reservations.filter((r) => {
    const matchSearch =
      !search ||
      r.guestName.toLowerCase().includes(search.toLowerCase()) ||
      r.refNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const todayArrivals = reservations.filter(
    (r) => r.checkIn === today && (r.status === "confirmed" || r.status === "checked_in")
  );
  const todayDepartures = reservations.filter(
    (r) => r.checkOut === today && r.status === "checked_in"
  );
  const activeCount = reservations.filter(
    (r) => r.status === "confirmed" || r.status === "checked_in"
  ).length;

  function updateStatus(id: string, status: ReservationStatus) {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  const guestHistory = selected ? getGuestHistory(selected.phone) : [];

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Admin header — no public nav */}
      <header className="bg-charcoal text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo href="/" imageClassName="h-9" />
            <div>
              <p className="text-sm font-medium leading-none">Booking Admin</p>
              <p className="text-[10px] text-white/50 mt-0.5">Demo UI — booking management only</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs text-white/60 hover:text-white flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Back to Website
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Today's Arrivals", value: todayArrivals.length, icon: CalendarCheck },
            { label: "Today's Departures", value: todayDepartures.length, icon: LogOut },
            { label: "Active", value: activeCount, icon: LayoutList },
            { label: "Total", value: reservations.length, icon: CalendarDays },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-stone/80 p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-warm-gray flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 text-bronze" />
              </div>
              <div>
                <p className="text-xl font-semibold text-charcoal">{stat.value}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab switch */}
        <div className="flex gap-1 mb-4 bg-white border border-stone/80 p-1 w-fit">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "list" ? "bg-charcoal text-white" : "text-muted hover:text-charcoal"
            }`}
          >
            Reservations
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === "calendar" ? "bg-charcoal text-white" : "text-muted hover:text-charcoal"
            }`}
          >
            Calendar
          </button>
        </div>

        {activeTab === "calendar" ? (
          <div className="bg-white border border-stone/80 p-6">
            <p className="text-sm text-muted mb-4">June 2026 — booked nights overview</p>
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-[10px] text-muted py-1 font-medium">{d}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const dateStr = `2026-06-${String(day).padStart(2, "0")}`;
                const count = reservations.filter(
                  (r) =>
                    (r.status === "confirmed" || r.status === "checked_in") &&
                    r.checkIn <= dateStr &&
                    r.checkOut > dateStr
                ).length;
                return (
                  <div
                    key={day}
                    className={`min-h-[52px] border p-1 text-center ${
                      count > 0 ? "bg-bronze/10 border-bronze/30" : "border-stone/60"
                    }`}
                  >
                    <span className="text-xs text-charcoal">{day}</span>
                    {count > 0 && (
                      <p className="text-[9px] text-bronze font-medium mt-0.5">{count} booked</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Table */}
            <div className="lg:col-span-2 bg-white border border-stone/80">
              <div className="p-4 border-b border-stone/80 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Search by name, ref, or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-stone text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-stone text-sm focus:outline-none"
                >
                  <option value="all">All statuses</option>
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s.replace("_", " ")}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-warm-gray text-left text-[10px] uppercase tracking-wider text-muted">
                      <th className="px-4 py-3">Ref</th>
                      <th className="px-4 py-3">Guest</th>
                      <th className="px-4 py-3 hidden md:table-cell">Room</th>
                      <th className="px-4 py-3 hidden sm:table-cell">Dates</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((res) => {
                      const room = getRoomById(res.roomTypeId);
                      return (
                        <tr
                          key={res.id}
                          onClick={() => { setSelected(res); setShowHistory(false); }}
                          className={`border-t border-stone/60 cursor-pointer hover:bg-warm-gray/50 ${
                            selected?.id === res.id ? "bg-bronze/5" : ""
                          }`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-bronze">{res.refNumber}</td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-charcoal">{res.guestName}</p>
                            <p className="text-xs text-muted">{res.nationality}</p>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-muted text-xs">{room?.name}</td>
                          <td className="px-4 py-3 hidden sm:table-cell text-xs text-muted">
                            {formatDate(res.checkIn)} — {formatDate(res.checkOut)}
                          </td>
                          <td className="px-4 py-3"><StatusBadge status={res.status} /></td>
                          <td className="px-4 py-3 text-right font-medium">{formatPrice(res.totalAmount)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="text-center py-10 text-muted text-sm">No reservations found.</p>
                )}
              </div>
            </div>

            {/* Detail panel */}
            <div className="bg-white border border-stone/80 p-5 h-fit lg:sticky lg:top-6">
              {selected ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-charcoal">Reservation Details</h3>
                    <StatusBadge status={selected.status} />
                  </div>
                  <p className="font-mono text-sm text-bronze mb-4">{selected.refNumber}</p>
                  <div className="space-y-3 text-sm mb-5">
                    <div><p className="text-[10px] text-muted uppercase">Guest</p><p className="font-medium">{selected.guestName}</p></div>
                    <div><p className="text-[10px] text-muted uppercase">Nationality</p><p>{selected.nationality || "—"}</p></div>
                    <div><p className="text-[10px] text-muted uppercase">Email</p><p className="break-all">{selected.email}</p></div>
                    <div><p className="text-[10px] text-muted uppercase">Room</p><p>{getRoomById(selected.roomTypeId)?.name}</p></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><p className="text-[10px] text-muted uppercase">Check-in</p><p>{formatDate(selected.checkIn)}</p></div>
                      <div><p className="text-[10px] text-muted uppercase">Check-out</p><p>{formatDate(selected.checkOut)}</p></div>
                    </div>
                    <div><p className="text-[10px] text-muted uppercase">Total</p><p className="font-serif text-lg text-bronze">{formatPrice(selected.totalAmount)}</p></div>
                  </div>
                  <div className="mb-4">
                    <label className="text-[10px] text-muted uppercase mb-1 block">Update status</label>
                    <select
                      value={selected.status}
                      onChange={(e) => updateStatus(selected.id, e.target.value as ReservationStatus)}
                      className="w-full px-3 py-2 border border-stone text-sm focus:outline-none"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s.replace("_", " ")}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex-1 px-3 py-2 border border-stone text-xs uppercase tracking-wider hover:bg-warm-gray"
                    >
                      Guest History
                    </button>
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=Hello ${selected.guestName}, ref ${selected.refNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 bg-[#25D366] text-white text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WA
                    </a>
                  </div>
                  {showHistory && guestHistory.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-stone/80 space-y-2">
                      {guestHistory.map((h) => (
                        <div key={h.id} className="text-xs border-b border-stone/40 pb-2">
                          <div className="flex justify-between">
                            <span className="font-mono text-bronze">{h.refNumber}</span>
                            <StatusBadge status={h.status} />
                          </div>
                          <p className="text-muted mt-0.5">{formatDate(h.checkIn)} — {formatDate(h.checkOut)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted text-sm text-center py-12">Select a reservation to view details.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
