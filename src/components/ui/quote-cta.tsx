import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuoteCtaProps {
  quote: string;
  href?: string;
  buttonLabel?: string;
  className?: string;
}

export function QuoteCta({
  quote,
  href = "/contact",
  buttonLabel = "Contact Us",
  className,
}: QuoteCtaProps) {
  return (
    <section className={cn("py-20 lg:py-24 bg-warm-gray/80", className)}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="divider-ornament flex items-center gap-6 mb-10">
          <span className="font-serif text-2xl lg:text-3xl font-light italic text-charcoal whitespace-nowrap">
            {quote}
          </span>
        </div>
        <Button href={href} size="lg">
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
