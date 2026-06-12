"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { ReservationStatus, SiteSettings } from "@/lib/types";

type Tab = "reservations" | "rooms" | "rates" | "blocks" | "stats" | "guests" | "reviews" | "promotions" | "settings";

interface AdminReservation {
  id: string;
  refNumber: string;
  guestName: string;
  email: string;
  phone: string;
  roomName: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: ReservationStatus;
  totalAmount: number;
  specialRequests?: string;
}

interface AdminRoom {
  id: string;
  name: string;
  basePrice: number;
  inventory: number;
  active: boolean;
}

interface SeasonalRate {
  id: string;
  roomTypeId: string;
  roomName: string;
  name: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number | null;
  fixedPrice: number | null;
}

interface AvailabilityBlock {
  id: string;
  roomTypeId: string | null;
  roomName: string;
  startDate: string;
  endDate: string;
  reason: string | null;
}

interface Analytics {
  occupancyRate: number;
  activeBookings: number;
  todayArrivals: number;
  todayDepartures: number;
  totalRevenue: number;
  totalGuests: number;
  totalReservations: number;
  statusCounts?: { pending: number };
}

interface AdminGuest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  nationality: string | null;
  reservationCount: number;
  reservations: {
    refNumber: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    status: ReservationStatus;
    totalAmount: number;
  }[];
}

interface AdminReview {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  approved: boolean;
  roomName: string | null;
  createdAt: string;
}

interface AdminPromotion {
  id: string;
  code: string;
  name: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  active: boolean;
  rooms: { roomTypeId: string; roomName: string }[];
}

const statusOptions: ReservationStatus[] = [
  "pending", "confirmed", "checked_in", "checked_out", "cancelled",
];

const inputClass = "px-3 py-2 border border-stone text-sm w-full";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("reservations");
  const [loading, setLoading] = useState(true);

  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [rates, setRates] = useState<SeasonalRate[]>([]);
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [stats, setStats] = useState<Analytics | null>(null);
  const [guestList, setGuestList] = useState<AdminGuest[]>([]);
  const [reviewList, setReviewList] = useState<AdminReview[]>([]);
  const [promotions, setPromotions] = useState<AdminPromotion[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [settingsForm, setSettingsForm] = useState<Partial<SiteSettings>>({});
  const [settingsMsg, setSettingsMsg] = useState("");

  const [selected, setSelected] = useState<AdminReservation | null>(null);
  const [editForm, setEditForm] = useState({
    guestName: "", email: "", phone: "", checkIn: "", checkOut: "", guests: 1, specialRequests: "",
  });
  const [editError, setEditError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({
    roomTypeId: "", checkIn: "", checkOut: "", guests: 1,
    guestName: "", email: "", phone: "", nationality: "", specialRequests: "",
  });
  const [createError, setCreateError] = useState("");

  const [rateForm, setRateForm] = useState({
    roomTypeId: "", name: "", startDate: "", endDate: "",
    priceMultiplier: "1.2", fixedPrice: "",
  });
  const [blockForm, setBlockForm] = useState({
    roomTypeId: "", startDate: "", endDate: "", reason: "",
  });
  const [promoForm, setPromoForm] = useState({
    code: "", name: "", discountType: "percent", discountValue: "10",
    startDate: "", endDate: "", roomTypeIds: [] as string[],
  });
  const [guestSearch, setGuestSearch] = useState("");

  async function authFetch(url: string, options?: RequestInit) {
    const res = await fetch(url, options);
    if (res.status === 401) {
      router.push("/admin/login");
      throw new Error("Unauthorized");
    }
    return res;
  }

  async function loadAll() {
    try {
      const [resRes, roomRes, rateRes, blockRes, statsRes, guestRes, reviewRes, promoRes, settingsRes] = await Promise.all([
        authFetch("/api/admin/reservations"),
        authFetch("/api/admin/rooms"),
        authFetch("/api/admin/rates"),
        authFetch("/api/admin/availability"),
        authFetch("/api/admin/analytics"),
        authFetch("/api/admin/guests"),
        authFetch("/api/admin/reviews"),
        authFetch("/api/admin/promotions"),
        authFetch("/api/admin/settings"),
      ]);
      setReservations(await resRes.json());
      setRooms(await roomRes.json());
      setRates(await rateRes.json());
      setBlocks(await blockRes.json());
      setStats(await statsRes.json());
      setGuestList(await guestRes.json());
      setReviewList(await reviewRes.json());
      setPromotions(await promoRes.json());
      const settingsData = await settingsRes.json();
      setSettings(settingsData);
      setSettingsForm(settingsData);
    } catch {
      return;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, [router]);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  async function updateStatus(id: string, status: ReservationStatus) {
    const res = await authFetch(`/api/admin/reservations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setReservations((prev) => prev.map((r) => (r.id === id ? updated : r)));
    if (selected?.id === id) {
      setSelected(updated);
      syncEditForm(updated);
    }
  }

  function syncEditForm(r: AdminReservation) {
    setEditForm({
      guestName: r.guestName,
      email: r.email,
      phone: r.phone || "",
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      guests: r.guests,
      specialRequests: r.specialRequests || "",
    });
  }

  function selectReservation(r: AdminReservation) {
    setSelected(r);
    syncEditForm(r);
    setEditError("");
  }

  async function saveReservation(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    setEditError("");
    const res = await authFetch(`/api/admin/reservations/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setEditError(data.error || "Update failed");
      return;
    }
    setReservations((prev) => prev.map((r) => (r.id === selected.id ? data : r)));
    setSelected(data);
  }

  async function createBooking(e: React.FormEvent) {
    e.preventDefault();
    setCreateError("");
    const res = await authFetch("/api/admin/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...createForm, status: "confirmed" }),
    });
    const data = await res.json();
    if (!res.ok) { setCreateError(data.error || "Failed"); return; }
    setReservations((prev) => [data, ...prev]);
    setShowCreate(false);
  }

  async function saveRoom(room: AdminRoom) {
    await authFetch("/api/admin/rooms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room),
    });
    loadAll();
  }

  async function addRate(e: React.FormEvent) {
    e.preventDefault();
    await authFetch("/api/admin/rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...rateForm,
        priceMultiplier: rateForm.fixedPrice ? null : Number(rateForm.priceMultiplier),
        fixedPrice: rateForm.fixedPrice ? Number(rateForm.fixedPrice) : null,
      }),
    });
    setRateForm({ roomTypeId: "", name: "", startDate: "", endDate: "", priceMultiplier: "1.2", fixedPrice: "" });
    loadAll();
  }

  async function deleteRate(id: string) {
    await authFetch(`/api/admin/rates?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  async function addBlock(e: React.FormEvent) {
    e.preventDefault();
    await authFetch("/api/admin/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...blockForm,
        roomTypeId: blockForm.roomTypeId || null,
      }),
    });
    setBlockForm({ roomTypeId: "", startDate: "", endDate: "", reason: "" });
    loadAll();
  }

  async function deleteBlock(id: string) {
    await authFetch(`/api/admin/availability?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  async function addPromotion(e: React.FormEvent) {
    e.preventDefault();
    await authFetch("/api/admin/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...promoForm,
        discountValue: Number(promoForm.discountValue),
        roomTypeIds: promoForm.roomTypeIds.length ? promoForm.roomTypeIds : undefined,
      }),
    });
    setPromoForm({
      code: "", name: "", discountType: "percent", discountValue: "10",
      startDate: "", endDate: "", roomTypeIds: [],
    });
    loadAll();
  }

  async function deletePromotion(id: string) {
    await authFetch(`/api/admin/promotions?id=${id}`, { method: "DELETE" });
    loadAll();
  }

  async function toggleReview(id: string, approved: boolean) {
    await authFetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    setReviewList((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)));
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSettingsMsg("");
    const res = await authFetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsForm),
    });
    const data = await res.json();
    if (!res.ok) {
      setSettingsMsg(data.error || "Save failed");
      return;
    }
    setSettings(data);
    setSettingsForm(data);
    setSettingsMsg("Settings saved");
  }

  const filtered = reservations.filter((r) => {
    const q = search.toLowerCase();
    return (
      (!q || r.guestName.toLowerCase().includes(q) || r.refNumber.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)) &&
      (statusFilter === "all" || r.status === statusFilter)
    );
  });

  const filteredGuests = guestList.filter((g) => {
    const q = guestSearch.toLowerCase();
    return !q || g.name.toLowerCase().includes(q) || g.email.toLowerCase().includes(q);
  });

  if (loading) return <p className="p-8 text-center text-muted">Loading admin...</p>;

  const tabs: { id: Tab; label: string }[] = [
    { id: "reservations", label: "Reservations" },
    { id: "rooms", label: "Rooms" },
    { id: "rates", label: "Rates" },
    { id: "blocks", label: "Availability" },
    { id: "promotions", label: "Promotions" },
    { id: "guests", label: "Guests" },
    { id: "reviews", label: "Reviews" },
    { id: "settings", label: "Settings" },
    { id: "stats", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-stone/20">
      <header className="bg-charcoal text-white px-4 py-3 flex justify-between items-center">
        <div>
          <p className="font-medium">Victoria Hotel — Admin</p>
          <p className="text-xs text-white/50">Booking management panel</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="text-xs text-white/70 hover:text-white px-3 py-1">Website</Link>
          <button onClick={logout} className="text-xs text-white/70 hover:text-white px-3 py-1">Logout</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-wrap gap-1 mb-4 bg-white border border-stone p-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3 py-2 text-xs uppercase ${tab === t.id ? "bg-charcoal text-white" : "text-muted"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "reservations" && (
          <>
            <div className="flex gap-2 mb-4">
              <Button onClick={() => setShowCreate(!showCreate)} size="sm">
                {showCreate ? "Cancel" : "+ Manual Booking"}
              </Button>
            </div>
            {showCreate && (
              <form onSubmit={createBooking} className="bg-white border border-stone p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select required value={createForm.roomTypeId} onChange={(e) => setCreateForm({ ...createForm, roomTypeId: e.target.value })} className={inputClass}>
                  <option value="">Room</option>
                  {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
                <input type="number" min={1} value={createForm.guests} onChange={(e) => setCreateForm({ ...createForm, guests: Number(e.target.value) })} className={inputClass} placeholder="Guests" />
                <input type="date" required value={createForm.checkIn} onChange={(e) => setCreateForm({ ...createForm, checkIn: e.target.value })} className={inputClass} />
                <input type="date" required value={createForm.checkOut} onChange={(e) => setCreateForm({ ...createForm, checkOut: e.target.value })} className={inputClass} />
                <input required placeholder="Guest name" value={createForm.guestName} onChange={(e) => setCreateForm({ ...createForm, guestName: e.target.value })} className={inputClass} />
                <input required type="email" placeholder="Email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} className={inputClass} />
                <input placeholder="Phone" value={createForm.phone} onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })} className={inputClass} />
                <input placeholder="Nationality" value={createForm.nationality} onChange={(e) => setCreateForm({ ...createForm, nationality: e.target.value })} className={inputClass} />
                {createError && <p className="text-sm text-red-600 sm:col-span-2">{createError}</p>}
                <Button type="submit" className="sm:col-span-2">Create Booking</Button>
              </form>
            )}
            <div className="flex gap-2 mb-4">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className={`flex-1 ${inputClass}`} />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass}>
                <option value="all">All</option>
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white border border-stone overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-stone/30 text-xs uppercase text-muted">
                    <th className="p-3 text-left">Ref</th><th className="p-3 text-left">Guest</th>
                    <th className="p-3 text-left">Room</th><th className="p-3 text-left">Status</th>
                    <th className="p-3 text-right">Total</th>
                  </tr></thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id} onClick={() => selectReservation(r)}
                        className={`border-t border-stone cursor-pointer hover:bg-stone/20 ${selected?.id === r.id ? "bg-bronze/5" : ""}`}>
                        <td className="p-3 font-mono text-xs text-bronze">{r.refNumber}</td>
                        <td className="p-3">{r.guestName}</td>
                        <td className="p-3 text-muted">{r.roomName}</td>
                        <td className="p-3"><StatusBadge status={r.status} /></td>
                        <td className="p-3 text-right">{formatPrice(r.totalAmount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white border border-stone p-4">
                {selected ? (
                  <form onSubmit={saveReservation} className="space-y-3">
                    <p className="font-mono text-bronze text-sm">{selected.refNumber}</p>
                    <p className="text-xs text-muted">{selected.roomName} · {formatPrice(selected.totalAmount)}</p>
                    <select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value as ReservationStatus)}
                      className={inputClass}>
                      {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input required value={editForm.guestName} onChange={(e) => setEditForm({ ...editForm, guestName: e.target.value })} className={inputClass} placeholder="Guest name" />
                    <input required type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className={inputClass} placeholder="Email" />
                    <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className={inputClass} placeholder="Phone" />
                    <input type="date" required value={editForm.checkIn} onChange={(e) => setEditForm({ ...editForm, checkIn: e.target.value })} className={inputClass} />
                    <input type="date" required value={editForm.checkOut} onChange={(e) => setEditForm({ ...editForm, checkOut: e.target.value })} className={inputClass} />
                    <input type="number" min={1} value={editForm.guests} onChange={(e) => setEditForm({ ...editForm, guests: Number(e.target.value) })} className={inputClass} />
                    <textarea value={editForm.specialRequests} onChange={(e) => setEditForm({ ...editForm, specialRequests: e.target.value })} className={inputClass} rows={2} placeholder="Special requests" />
                    {editError && <p className="text-sm text-red-600">{editError}</p>}
                    <Button type="submit" size="sm" className="w-full">Save Changes</Button>
                  </form>
                ) : <p className="text-muted text-sm">Select a reservation</p>}
              </div>
            </div>
          </>
        )}

        {tab === "rooms" && (
          <div className="bg-white border border-stone overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-stone/30 text-xs uppercase text-muted">
                <th className="p-3 text-left">Room</th><th className="p-3 text-left">Base Price</th>
                <th className="p-3 text-left">Inventory</th><th className="p-3 text-left">Active</th><th className="p-3"></th>
              </tr></thead>
              <tbody>
                {rooms.map((room) => (
                  <RoomRow key={room.id} room={room} onSave={saveRoom} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "rates" && (
          <div className="space-y-4">
            <form onSubmit={addRate} className="bg-white border border-stone p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <select required value={rateForm.roomTypeId} onChange={(e) => setRateForm({ ...rateForm, roomTypeId: e.target.value })} className={inputClass}>
                <option value="">Room</option>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              <input required placeholder="Rate name" value={rateForm.name} onChange={(e) => setRateForm({ ...rateForm, name: e.target.value })} className={inputClass} />
              <input type="date" required value={rateForm.startDate} onChange={(e) => setRateForm({ ...rateForm, startDate: e.target.value })} className={inputClass} />
              <input type="date" required value={rateForm.endDate} onChange={(e) => setRateForm({ ...rateForm, endDate: e.target.value })} className={inputClass} />
              <input type="number" step="0.01" placeholder="Multiplier (e.g. 1.25)" value={rateForm.priceMultiplier}
                onChange={(e) => setRateForm({ ...rateForm, priceMultiplier: e.target.value })} className={inputClass} />
              <input type="number" placeholder="Fixed price (optional)" value={rateForm.fixedPrice}
                onChange={(e) => setRateForm({ ...rateForm, fixedPrice: e.target.value })} className={inputClass} />
              <Button type="submit" className="col-span-full sm:col-span-1">Add Rate</Button>
            </form>
            <div className="bg-white border border-stone">
              {rates.map((r) => (
                <div key={r.id} className="flex justify-between items-center p-3 border-b border-stone text-sm">
                  <div>
                    <p className="font-medium">{r.name} — {r.roomName}</p>
                    <p className="text-muted text-xs">{r.startDate} to {r.endDate} · {r.fixedPrice ? formatPrice(r.fixedPrice) : `${r.priceMultiplier}x`}</p>
                  </div>
                  <button onClick={() => deleteRate(r.id)} className="text-xs text-red-600">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "blocks" && (
          <div className="space-y-4">
            <form onSubmit={addBlock} className="bg-white border border-stone p-4 grid grid-cols-2 gap-3">
              <select value={blockForm.roomTypeId} onChange={(e) => setBlockForm({ ...blockForm, roomTypeId: e.target.value })} className={inputClass}>
                <option value="">All rooms</option>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              <input placeholder="Reason" value={blockForm.reason} onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })} className={inputClass} />
              <input type="date" required value={blockForm.startDate} onChange={(e) => setBlockForm({ ...blockForm, startDate: e.target.value })} className={inputClass} />
              <input type="date" required value={blockForm.endDate} onChange={(e) => setBlockForm({ ...blockForm, endDate: e.target.value })} className={inputClass} />
              <Button type="submit" className="col-span-full">Block Dates</Button>
            </form>
            <div className="bg-white border border-stone">
              {blocks.map((b) => (
                <div key={b.id} className="flex justify-between items-center p-3 border-b border-stone text-sm">
                  <div>
                    <p className="font-medium">{b.roomName}</p>
                    <p className="text-muted text-xs">{b.startDate} to {b.endDate}{b.reason ? ` · ${b.reason}` : ""}</p>
                  </div>
                  <button onClick={() => deleteBlock(b.id)} className="text-xs text-red-600">Remove</button>
                </div>
              ))}
              {blocks.length === 0 && <p className="p-4 text-muted text-sm">No blocks</p>}
            </div>
          </div>
        )}

        {tab === "promotions" && (
          <div className="space-y-4">
            <form onSubmit={addPromotion} className="bg-white border border-stone p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <input required placeholder="Code (e.g. DIRECT10)" value={promoForm.code}
                onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })} className={inputClass} />
              <input required placeholder="Name" value={promoForm.name}
                onChange={(e) => setPromoForm({ ...promoForm, name: e.target.value })} className={inputClass} />
              <select value={promoForm.discountType} onChange={(e) => setPromoForm({ ...promoForm, discountType: e.target.value })} className={inputClass}>
                <option value="percent">Percent off</option>
                <option value="fixed">Fixed amount off</option>
              </select>
              <input type="number" required placeholder="Discount value" value={promoForm.discountValue}
                onChange={(e) => setPromoForm({ ...promoForm, discountValue: e.target.value })} className={inputClass} />
              <input type="date" required value={promoForm.startDate} onChange={(e) => setPromoForm({ ...promoForm, startDate: e.target.value })} className={inputClass} />
              <input type="date" required value={promoForm.endDate} onChange={(e) => setPromoForm({ ...promoForm, endDate: e.target.value })} className={inputClass} />
              <select multiple value={promoForm.roomTypeIds}
                onChange={(e) => setPromoForm({ ...promoForm, roomTypeIds: Array.from(e.target.selectedOptions, (o) => o.value) })}
                className={`sm:col-span-2 ${inputClass}`}>
                {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              <p className="text-xs text-muted sm:col-span-2">Leave rooms empty to apply to all room types.</p>
              <Button type="submit">Add Promo</Button>
            </form>
            <div className="bg-white border border-stone">
              {promotions.map((p) => (
                <div key={p.id} className="flex justify-between items-center p-3 border-b border-stone text-sm">
                  <div>
                    <p className="font-medium font-mono">{p.code}</p>
                    <p className="text-muted text-xs">
                      {p.name} · {p.discountType === "percent" ? `${p.discountValue}%` : formatPrice(p.discountValue)} off
                      · {p.startDate} to {p.endDate}
                      {p.rooms.length > 0 ? ` · ${p.rooms.map((r) => r.roomName).join(", ")}` : " · All rooms"}
                    </p>
                  </div>
                  <button onClick={() => deletePromotion(p.id)} className="text-xs text-red-600">Delete</button>
                </div>
              ))}
              {promotions.length === 0 && <p className="p-4 text-muted text-sm">No promotions — seed creates DIRECT10</p>}
            </div>
          </div>
        )}

        {tab === "guests" && (
          <div className="space-y-4">
            <input value={guestSearch} onChange={(e) => setGuestSearch(e.target.value)} placeholder="Search guests..." className={inputClass} />
            <div className="bg-white border border-stone">
              {filteredGuests.map((g) => (
                <div key={g.id} className="p-4 border-b border-stone text-sm">
                  <p className="font-medium">{g.name} · {g.email}</p>
                  <p className="text-muted text-xs">{g.phone || "No phone"} · {g.nationality || "—"} · {g.reservationCount} booking(s)</p>
                  {g.reservations.slice(0, 3).map((r) => (
                    <p key={r.refNumber} className="text-xs mt-1 text-muted">
                      {r.refNumber} · {r.roomName} · {r.checkIn} — {r.checkOut} · {r.status}
                    </p>
                  ))}
                </div>
              ))}
              {filteredGuests.length === 0 && <p className="p-4 text-muted text-sm">No guests found</p>}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="bg-white border border-stone">
            {reviewList.map((r) => (
              <div key={r.id} className="p-4 border-b border-stone text-sm">
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium">{r.name} · {r.country} · {"★".repeat(r.rating)}</p>
                    <p className="text-muted text-xs">{r.roomName || "General"} · {r.createdAt}</p>
                    <p className="mt-2">{r.text}</p>
                  </div>
                  <div className="shrink-0 flex flex-col gap-2">
                    <span className={`text-xs ${r.approved ? "text-green-700" : "text-amber-700"}`}>
                      {r.approved ? "Approved" : "Pending"}
                    </span>
                    {!r.approved && (
                      <button onClick={() => toggleReview(r.id, true)} className="text-xs text-green-700 underline">Approve</button>
                    )}
                    {r.approved && (
                      <button onClick={() => toggleReview(r.id, false)} className="text-xs text-red-600 underline">Reject</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {reviewList.length === 0 && <p className="p-4 text-muted text-sm">No reviews</p>}
          </div>
        )}

        {tab === "settings" && settings && (
          <form onSubmit={saveSettings} className="bg-white border border-stone p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
            {([
              ["hotelName", "Hotel name"],
              ["phone", "Phone"],
              ["email", "Email"],
              ["whatsappNumber", "WhatsApp number"],
              ["address", "Address"],
              ["city", "City"],
              ["checkInTime", "Check-in time"],
              ["checkOutTime", "Check-out time"],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <label className="text-xs text-muted block mb-1">{label}</label>
                <input
                  value={String(settingsForm[key] ?? "")}
                  onChange={(e) => setSettingsForm({ ...settingsForm, [key]: e.target.value })}
                  className={inputClass}
                />
              </div>
            ))}
            {settingsMsg && <p className="sm:col-span-2 text-sm text-green-700">{settingsMsg}</p>}
            <Button type="submit" className="sm:col-span-2 w-fit">Save Settings</Button>
          </form>
        )}

        {tab === "stats" && stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Occupancy", value: `${stats.occupancyRate}%` },
              { label: "Active Bookings", value: stats.activeBookings },
              { label: "Today Arrivals", value: stats.todayArrivals },
              { label: "Today Departures", value: stats.todayDepartures },
              { label: "Total Revenue", value: formatPrice(stats.totalRevenue) },
              { label: "Total Guests", value: stats.totalGuests },
              { label: "Reservations", value: stats.totalReservations },
              { label: "Pending", value: stats.statusCounts?.pending ?? 0 },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-stone p-4">
                <p className="text-xs text-muted uppercase">{s.label}</p>
                <p className="text-xl font-semibold mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RoomRow({ room, onSave }: { room: AdminRoom; onSave: (r: AdminRoom) => void }) {
  const [draft, setDraft] = useState(room);
  return (
    <tr className="border-t border-stone">
      <td className="p-3">{room.name}</td>
      <td className="p-3">
        <input type="number" value={draft.basePrice}
          onChange={(e) => setDraft({ ...draft, basePrice: Number(e.target.value) })}
          className="w-24 px-2 py-1 border border-stone text-sm" />
      </td>
      <td className="p-3">
        <input type="number" value={draft.inventory}
          onChange={(e) => setDraft({ ...draft, inventory: Number(e.target.value) })}
          className="w-16 px-2 py-1 border border-stone text-sm" />
      </td>
      <td className="p-3">
        <input type="checkbox" checked={draft.active}
          onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />
      </td>
      <td className="p-3">
        <button onClick={() => onSave(draft)} className="text-xs text-bronze underline">Save</button>
      </td>
    </tr>
  );
}
