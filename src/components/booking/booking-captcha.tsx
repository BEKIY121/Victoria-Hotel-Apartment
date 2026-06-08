"use client";

import { useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 5 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

interface BookingCaptchaProps {
  value: string;
  onChange: (value: string) => void;
  onValidChange: (valid: boolean) => void;
  className?: string;
}

export function BookingCaptcha({
  value,
  onChange,
  onValidChange,
  className,
}: BookingCaptchaProps) {
  const [code, setCode] = useState(generateCode);

  const refresh = useCallback(() => {
    setCode(generateCode());
    onChange("");
    onValidChange(false);
  }, [onChange, onValidChange]);

  function handleInput(input: string) {
    const upper = input.toUpperCase();
    onChange(upper);
    onValidChange(upper === code);
  }

  return (
    <div className={cn("border border-stone bg-warm-gray p-5", className)}>
      <label className="text-[0.65rem] tracking-[0.15em] uppercase text-muted font-semibold mb-3 block">
        Security Verification *
      </label>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-3">
          <div
            className="bg-charcoal text-white px-6 py-3 font-mono text-xl tracking-[0.35em] select-none"
            aria-hidden
          >
            {code}
          </div>
          <button
            type="button"
            onClick={refresh}
            className="p-2.5 border border-stone hover:border-charcoal transition-colors"
            aria-label="Refresh captcha"
          >
            <RefreshCw className="w-4 h-4 text-muted" />
          </button>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Enter code above"
          maxLength={5}
          className="flex-1 w-full sm:max-w-[200px] px-4 py-3 border border-stone bg-white text-sm uppercase tracking-widest focus:outline-none focus:border-charcoal"
          autoComplete="off"
        />
      </div>
      <p className="text-xs text-muted mt-2">
        Enter the characters shown. Click refresh if unclear.
      </p>
    </div>
  );
}
