/** Curated brand photography (optimized from src/assets) */
export const brandImages = {
  exterior: "/images/brand/exterior-entrance.webp",
  atrium01: "/images/brand/atrium-01.webp",
  atrium02: "/images/brand/atrium-02.webp",
  lobby: "/images/brand/lobby-hallway.webp",
  wellness: "/images/brand/wellness-sauna.webp",
  kitchenette: "/images/brand/room-kitchenette.webp",
  dining: "/images/brand/room-dining.webp",
  living: "/images/brand/room-living.webp",
  breakfast: "/images/brand/room-breakfast.webp",
  bedroom: "/images/brand/room-bedroom.webp",
  suite: "/images/brand/room-suite.webp",
  hallway: "/images/brand/hallway.webp",
} as const;

export const heroSlides = [
  {
    src: brandImages.exterior,
    alt: "Victoria Hotel Apartments entrance in Sarbet, Addis Ababa",
    label: "Welcome",
    caption: "Sarbet · Pushkin Square",
  },
  {
    src: brandImages.atrium01,
    alt: "Victoria Hotel atrium with natural light and artwork",
    label: "Our Space",
    caption: "Art-filled interiors",
  },
  {
    src: brandImages.breakfast,
    alt: "Complimentary breakfast in a Victoria suite",
    label: "Comfort",
    caption: "Home away from home",
  },
  {
    src: brandImages.atrium02,
    alt: "Multi-level atrium at Victoria Hotel Apartments",
    label: "Architecture",
    caption: "Bright & spacious",
  },
] as const;

export const lifeAtVictoriaStrip = [
  { src: brandImages.lobby, alt: "Lobby with curated artwork" },
  { src: brandImages.living, alt: "Spacious living area" },
  { src: brandImages.dining, alt: "In-room dining with balcony views" },
  { src: brandImages.bedroom, alt: "Warm bedroom lighting" },
  { src: brandImages.kitchenette, alt: "Kitchenette and workspace" },
  { src: brandImages.wellness, alt: "Wellness and sauna facilities" },
  { src: brandImages.suite, alt: "Suite accommodation" },
  { src: brandImages.atrium02, alt: "Hotel atrium" },
] as const;
