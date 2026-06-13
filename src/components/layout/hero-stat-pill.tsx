import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroStatPillProps {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
  delay?: number;
}

export function HeroStatPill({
  icon: Icon,
  value,
  label,
  className,
  delay = 0,
}: HeroStatPillProps) {
  return (
    <div
      className={cn(
        "hero-stat-pill flex items-center gap-3 px-4 py-3 rounded-2xl animate-fade-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-white/10">
        <Icon className="w-4 h-4 text-bronze-light" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white leading-none">{value}</p>
        <p className="text-[0.6rem] tracking-[0.12em] uppercase text-white/45 mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}
