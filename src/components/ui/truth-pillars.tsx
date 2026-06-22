import { cn } from "@/lib/utils";

interface TruthPillarsProps {
  items: { title: string; description: string }[];
  className?: string;
  variant?: "light" | "immersive";
}

export function TruthPillars({
  items,
  className,
  variant = "light",
}: TruthPillarsProps) {
  const isImmersive = variant === "immersive";

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            "rounded-2xl p-7 lg:p-8 group transition-all duration-500",
            isImmersive
              ? "glass-dark hover:bg-charcoal/70 hover:-translate-y-1.5 hover:shadow-elevated border border-white/10"
              : "surface-card hover:-translate-y-1.5 hover:shadow-elevated"
          )}
          style={{ transitionDelay: `${i * 50}ms` }}
        >
          <span
            className={cn(
              "text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-4 block transition-transform duration-300 group-hover:translate-x-1",
              isImmersive ? "text-bronze-light" : "text-bronze"
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "font-serif text-xl font-light mb-3 tracking-tight transition-colors",
              isImmersive
                ? "text-white group-hover:text-bronze-light"
                : "text-charcoal group-hover:text-bronze"
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed",
              isImmersive ? "text-white/60" : "text-muted"
            )}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
