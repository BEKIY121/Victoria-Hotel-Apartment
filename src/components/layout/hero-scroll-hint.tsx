export function HeroScrollHint() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
      <span className="text-[0.55rem] tracking-[0.25em] uppercase text-white/35 font-medium">
        Scroll
      </span>
      <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
        <div className="w-1 h-2 rounded-full bg-white/50 hero-scroll-dot" />
      </div>
    </div>
  );
}
