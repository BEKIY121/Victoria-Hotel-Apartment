import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brandImages } from "@/lib/brand-images";
import { Reveal } from "@/components/ui/reveal";

export function LifeAtVictoria() {
  const images = [
    brandImages.lobby,
    brandImages.living,
    brandImages.dining,
    brandImages.bedroom,
    brandImages.kitchenette,
    brandImages.wellness,
    brandImages.suite,
    brandImages.atrium02,
    brandImages.lobby,
    brandImages.living,
  ];

  return (
    <section className="modern-section-accent relative py-16 lg:py-20 overflow-hidden">
      <div className="modern-section-grid pointer-events-none opacity-50" aria-hidden />
      <div className="modern-section-orb modern-section-orb-a pointer-events-none" aria-hidden />
      <div className="modern-section-line pointer-events-none" aria-hidden />

      <Reveal className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="section-label mb-3">Life at Victoria</p>
        <h2 className="section-title">A bright, art-filled retreat</h2>
        <span className="section-title-accent mx-auto" aria-hidden />
      </Reveal>

      <div className="relative z-10">
        <div className="flex gap-3 animate-marquee hover:[animation-play-state:paused]">
          {[...images, ...images].map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="img-hover-wrap relative shrink-0 w-56 sm:w-72 aspect-[4/5] rounded-2xl overflow-hidden group shadow-elevated"
            >
              <Image
                src={src}
                alt="Victoria Hotel Apartments"
                fill
                className="object-cover img-hover-zoom"
                sizes="288px"
              />
              <div className="img-hover-shine" aria-hidden />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      <Reveal className="relative z-10 text-center mt-10" delay={100}>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase font-semibold text-charcoal hover:text-bronze transition-colors group"
        >
          View Gallery
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
