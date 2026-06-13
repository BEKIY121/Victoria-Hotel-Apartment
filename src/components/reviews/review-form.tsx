"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RoomOption {
  id: string;
  name: string;
}

export function ReviewForm({ rooms }: { rooms: RoomOption[] }) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    rating: 5,
    text: "",
    roomTypeId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          roomTypeId: form.roomTypeId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit review");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="max-w-xl mx-auto form-glass text-center">
        <p className="font-medium">Thank you for your review</p>
        <p className="text-sm text-muted mt-2">
          It will appear on the site once approved by our team.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto form-glass space-y-3"
    >
      <h3 className="text-xs tracking-[0.15em] uppercase text-muted font-semibold">
        Write a Review
      </h3>
      <input
        required
        placeholder="Your name *"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="input-modern"
      />
      <input
        required
        placeholder="Country *"
        value={form.country}
        onChange={(e) => setForm({ ...form, country: e.target.value })}
        className="input-modern"
      />
      <select
        value={form.roomTypeId}
        onChange={(e) => setForm({ ...form, roomTypeId: e.target.value })}
        className="input-modern"
      >
        <option value="">Room stayed in (optional)</option>
        {rooms.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>
      <div>
        <label className="text-xs text-muted block mb-1">Rating *</label>
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          className="input-modern"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <textarea
        required
        rows={4}
        placeholder="Tell us about your stay *"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
        className="input-modern"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
