import { cn } from "@/lib/utils";

interface EditorialHeadingProps {
  italic: string;
  emphasis?: string;
  suffix?: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function EditorialHeading({
  italic,
  emphasis,
  suffix,
  subtitle,
  align = "left",
  light = false,
  className,
}: EditorialHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2
        className={cn(
          "editorial-title",
          light ? "text-white" : "text-charcoal"
        )}
      >
        <span className="italic font-light">{italic}</span>
        {emphasis && (
          <>
            {" "}
            <span className="not-italic font-normal">{emphasis}</span>
          </>
        )}
        {suffix && (
          <>
            {" "}
            <span className="italic font-light">{suffix}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-[0.65rem] tracking-[0.35em] uppercase font-semibold",
            light ? "text-bronze-light" : "text-bronze"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
