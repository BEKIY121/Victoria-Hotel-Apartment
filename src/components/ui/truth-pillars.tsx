import { cn } from "@/lib/utils";

interface TruthPillarsProps {
  items: { title: string; description: string }[];
  className?: string;
}

export function TruthPillars({ items, className }: TruthPillarsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone/60 rounded-2xl overflow-hidden",
        className
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className="glass-card rounded-none p-8 lg:p-10 hover:translate-y-0 group"
        >
          <span className="text-[0.6rem] tracking-[0.25em] uppercase text-bronze font-semibold mb-4 block">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif text-xl font-light text-charcoal mb-3 tracking-tight group-hover:text-bronze transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
