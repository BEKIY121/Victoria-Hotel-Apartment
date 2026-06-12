import type { HotelAdvantage } from "./types";

export const welcomeContent = {
  title: "Welcome to Victoria Hotel Apartments",
  intro: [
    "At Victoria Hotel Apartments, we invite you to experience a seamless blend of elegance, comfort, and affordability. Nestled in a convenient setting, our hotel offers a refined retreat designed to cater to both leisure and business travelers. Each of our thoughtfully designed rooms combines timeless aesthetics with modern amenities, creating a tranquil environment for our guests.",
    "From complimentary breakfast to 24-hour services, including housekeeping, fitness center access, and security, we are committed to ensuring your stay is both relaxing and convenient. Enjoy high-speed Wi-Fi, a free shuttle service, and professional laundry facilities, all designed to make your visit effortless.",
    "Whether you're here for work or relaxation, Victoria Hotel Apartments promises an experience that balances sophistication with heartfelt hospitality. Discover a home away from home, where every detail is crafted to exceed your expectations.",
  ],
  tagline: "Life is better at Victoria.",
};

export const aboutContent = {
  title: "A Little About Victoria Hotel Apartments",
  paragraphs: [
    "Victoria Hotel Apartments is led by General Manager and owner Ato Tadesse Endeshaw, a seasoned hospitality professional with over twenty-two years of international experience. A graduate of the prestigious Munchen Hotelberufsfachschulen D. Speiser in Germany, Ato Tadesse brings a wealth of expertise and a vision of unparalleled service to Victoria Hotel Apartments.",
    "At Victoria, we pride ourselves on creating a welcoming atmosphere where every guest feels valued. From the moment you arrive, our dedicated team is committed to ensuring your stay is exceptional. Our hotel is more than just a place to rest—it's a harmonious blend of style, comfort, and functionality.",
    "Each room is meticulously designed with high-quality furnishings, ample space, and an ambiance that reflects both elegance and warmth. Adorned with artwork by internationally acclaimed artists and complemented by lush greenery, our spaces are crafted to inspire relaxation and rejuvenation.",
    "We understand the needs of modern travelers, which is why our rooms feature dedicated workspaces, high-speed internet, and self-sufficient infrastructure, including a private groundwater supply and backup generators. Your safety and comfort are our top priorities, and we've implemented comprehensive measures to ensure peace of mind throughout your stay.",
    "Indulge in wellness at our boutique gym and spa, or unwind on our terrace with stunning city views. At Victoria Hotel Apartments, we redefine hospitality, offering an experience that is both memorable and transformative.",
  ],
  manager: {
    name: "Ato Tadesse Endeshaw",
    title: "General Manager & Owner",
    education: "Munchen Hotelberufsfachschulen D. Speiser, Germany",
    experience: "22+ years international hospitality experience",
  },
};

export const hotelAdvantages: HotelAdvantage[] = [
  {
    title: "Open 24 Hours",
    description: "We're always here when you need us — day or night.",
  },
  {
    title: "Prime Location",
    description:
      "Located in Sarbet, Pushkin Square — 2 min drive from the African Union.",
  },
  {
    title: "Near the Airport",
    description: "Just 15 minutes from Bole International Airport.",
  },
  {
    title: "Free WiFi",
    description:
      "Free broadband internet with WiFi and cable connection in every room.",
  },
  {
    title: "Room Service",
    description: "Professional in-room dining and service at your convenience.",
  },
  {
    title: "Free Breakfast",
    description: "Complimentary breakfast served daily for all guests.",
  },
  {
    title: "24/7 Reception",
    description: "Our front desk team is available around the clock.",
  },
  {
    title: "Daily Housekeeping",
    description: "Impeccable room cleaning and turndown service every day.",
  },
  {
    title: "Laundry Service",
    description: "Professional laundry facilities for a hassle-free stay.",
  },
  {
    title: "Fitness Center",
    description:
      "Stay healthy during your stay — bright windows and state-of-the-art equipment.",
  },
];

export const facilitiesContent = [
  {
    slug: "fitness",
    title: "Fitness Center",
    description:
      "Stay active during your visit with our bright, well-equipped fitness center. Modern cardio and strength equipment in a clean, welcoming environment.",
    image: "/images/gallery/recreation/04.webp",
    highlights: ["Cardio equipment", "Free weights", "Open daily", "Complimentary for guests"],
  },
  {
    slug: "restaurant",
    title: "Lobby Café & Restaurant",
    description:
      "Enjoy excellent cuisine in our lobby café and restaurant. Complimentary breakfast is served daily for direct-booking guests, with a rooftop lounge offering city views.",
    image: "/images/gallery/restaurant/01.webp",
    highlights: ["Complimentary breakfast", "Rooftop lounge", "Room service", "Daily dining"],
  },
  {
    slug: "lobby",
    title: "Lobby & Reception",
    description:
      "Our elegant lobby welcomes you around the clock. Professional 24-hour reception, concierge assistance, and a refined atmosphere from the moment you arrive.",
    image: "/images/gallery/lobby/04.webp",
    highlights: ["24-hour reception", "Concierge service", "Elegant interiors", "Luggage assistance"],
  },
  {
    slug: "shuttle",
    title: "Airport Shuttle",
    description:
      "Complimentary shuttle service to and from Bole International Airport. Just 15 minutes from the airport and 2 minutes from the African Union headquarters.",
    image: "/images/gallery/property/03.webp",
    highlights: ["Free shuttle", "15 min from airport", "2 min from African Union", "On request transfers"],
  },
  {
    slug: "laundry",
    title: "Laundry Service",
    description:
      "Professional laundry facilities available for short and extended stays. Ideal for business travelers and families who need hassle-free garment care.",
    image: "/images/gallery/lobby/08.webp",
    highlights: ["Professional laundry", "Extended-stay friendly", "Quick turnaround", "In-room collection"],
  },
  {
    slug: "security",
    title: "Security & Infrastructure",
    description:
      "24/7 security, magnetic key access, backup power generators, and private groundwater supply ensure uninterrupted comfort and peace of mind.",
    image: "/images/gallery/property/06.webp",
    highlights: ["24/7 security", "Backup generators", "Magnetic key system", "Private water supply"],
  },
];

export const bookingNotes = {
  vat: "All prices in USD · include 15% V.A.T",
  payment: "Secure online payment via Stripe",
  cancellation: "Free cancellation up to 24 hours before check-in",
  confirmation: "Instant confirmation by email after payment",
};
