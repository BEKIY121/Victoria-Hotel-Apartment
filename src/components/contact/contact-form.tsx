"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send message");
        return;
      }
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="mt-10 form-glass">
        <p className="font-medium">Message sent</p>
        <p className="text-sm text-muted mt-2">
          Thank you — we will reply to your email shortly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm text-bronze underline mt-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 form-glass space-y-3">
      <h3 className="text-[0.65rem] tracking-[0.2em] uppercase text-muted font-semibold">
        Send a Message
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
        type="email"
        placeholder="Email *"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="input-modern"
      />
      <input
        placeholder="Phone / WhatsApp"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="input-modern"
      />
      <textarea
        required
        rows={4}
        placeholder="How can we help? *"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="input-modern resize-none"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send Message"}
      </Button>
      <p className="text-xs text-muted">We typically respond within 24 hours.</p>
    </form>
  );
}
