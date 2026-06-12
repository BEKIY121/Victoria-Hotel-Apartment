import type {
  GuestReview,
  Reservation,
  RoomType,
  SeasonalPricing,
  SiteSettings,
} from "./types";

export const siteSettings: SiteSettings = {
  hotelName: "Victoria Hotel Apartments",
  tagline: "Life is better at Victoria.",
  address: "Sarbet, Pushkin Square",
  city: "Addis Ababa",
  country: "Ethiopia",
  phone: "+251 911 234 567",
  email: "info@victoriahotel.et",
  whatsappNumber: "251911234567",
  airportName: "Bole International Airport",
  airportDistanceMin: 15,
  africanUnionDistanceMin: 2,
  checkInTime: "14:00",
  checkOutTime: "11:00",
  bookingComUrl: "https://www.booking.com",
  airbnbUrl: "https://www.airbnb.com",
  latitude: 8.9906,
  longitude: 38.7356,
  vatRate: 15,
  managerName: "Ato Tadesse Endeshaw",
  managerTitle: "General Manager & Owner",
  managerBio:
    "Seasoned hospitality professional with 22+ years of international experience. Graduate of Munchen Hotelberufsfachschulen D. Speiser, Germany.",
};

export const roomTypes: RoomType[] = [
  {
    id: "rt-standard",
    slug: "standard-room",
    name: "Standard Room",
    shortDescription:
      "A perfect blend of style and functionality — ideal for solo travelers.",
    description:
      "Our Standard Room offers a perfect blend of style and functionality, spanning 32.65 square meters. Designed for comfort, it features a private bathroom, a spacious bed, and modern amenities to ensure a seamless stay. Ideal for solo travelers, this room provides a cozy retreat with all the essentials for a comfortable stay.",
    capacity: 2,
    bedType: "Spacious Bed",
    size: "32.65 m²",
    basePrice: 71,
    inventory: 6,
    amenities: [
      "Complimentary breakfast",
      "High-speed Wi-Fi and satellite TV",
      "Coffee and tea-making facilities with complimentary refreshments",
      "Refrigerator",
      "Smoke detector and fire extinguisher",
      "Dedicated workspace",
      "Blow dryer",
      "Magnetic key system",
      "Daily housekeeping",
    ],
    images: [
      "/images/rooms/standard-room/01.webp",
      "/images/rooms/standard-room/02.webp",
      "/images/rooms/standard-room/03.webp",
    ],
    featured: true,
  },
  {
    id: "rt-deluxe",
    slug: "deluxe-room",
    name: "Deluxe Room",
    shortDescription:
      "Separate living and sleeping areas with queen-size bed — perfect for longer stays.",
    description:
      "The Deluxe Room spans 49.15 square meters, offering separate living and sleeping areas for added privacy and comfort. Perfect for longer stays, this suite combines elegance with practicality. Whether for business or leisure, it provides a serene sanctuary designed to meet your needs.",
    capacity: 2,
    bedType: "Queen Bed",
    size: "49.15 m²",
    basePrice: 89,
    inventory: 4,
    amenities: [
      "Complimentary breakfast",
      "Private bedroom with queen-size bed",
      "Spacious living area and private bathroom",
      "High-speed Wi-Fi and satellite TV",
      "Coffee and tea facilities with complimentary refreshments",
      "Refrigerator",
      "Smoke detector and fire extinguisher",
      "Dedicated workspace",
      "Blow dryer",
      "Magnetic key system",
      "Daily housekeeping",
    ],
    images: [
      "/images/rooms/deluxe-room/01.webp",
      "/images/rooms/deluxe-room/02.webp",
      "/images/rooms/deluxe-room/03.webp",
      "/images/rooms/deluxe-room/04.webp",
      "/images/rooms/deluxe-room/05.webp",
      "/images/rooms/deluxe-room/06.webp",
    ],
    featured: true,
  },
  {
    id: "rt-deluxe-suite",
    slug: "deluxe-suite",
    name: "Deluxe Suite",
    shortDescription:
      "Fully equipped kitchen and separate living area — ideal for extended stays.",
    description:
      "Our Deluxe Suite, spanning 52.33 square meters, is ideal for guests seeking the convenience of a fully equipped kitchen. This spacious accommodation features a king-size bed, a private bathroom, and a separate living area. Perfect for extended stays, this apartment offers the comfort of home with the luxury of a guesthouse.",
    capacity: 3,
    bedType: "King Bed",
    size: "52.33 m²",
    basePrice: 107,
    inventory: 3,
    amenities: [
      "Complimentary breakfast",
      "Fully equipped kitchen with modern appliances",
      "Dedicated dining area and workspace",
      "King-size bed and private bathroom",
      "Separate living area",
      "High-speed Wi-Fi and satellite TV",
      "Coffee and tea-making facilities with complimentary refreshments",
      "Laundry facilities",
      "Smoke detector and fire extinguisher",
      "Blow dryer",
      "Magnetic key system",
      "Daily housekeeping",
    ],
    images: [
      "/images/rooms/deluxe-suite/01.webp",
      "/images/rooms/deluxe-suite/02.webp",
      "/images/rooms/deluxe-suite/03.webp",
      "/images/rooms/deluxe-suite/04.webp",
      "/images/rooms/deluxe-suite/05.webp",
      "/images/rooms/deluxe-suite/06.webp",
      "/images/rooms/deluxe-suite/07.webp",
      "/images/rooms/deluxe-suite/08.webp",
    ],
    featured: true,
  },
  {
    id: "rt-luxury",
    slug: "luxury-suite",
    name: "Luxury Suite",
    shortDescription:
      "Elegant one-bedroom suite with balcony, kitchen, and plush bedding.",
    description:
      "Our Luxury Suite, spanning 66.02 square meters, combines elegance and functionality. Featuring a private bedroom, a fully equipped kitchen, and a balcony, this suite is perfect for both short and extended stays. Designed for comfort and convenience, it offers a tranquil retreat for discerning travelers.",
    capacity: 2,
    bedType: "Plush King Bed",
    size: "66.02 m²",
    basePrice: 134,
    inventory: 2,
    amenities: [
      "Complimentary breakfast",
      "Spacious living area with balcony access",
      "Private bedroom with plush bed",
      "Fully equipped kitchen and dining area",
      "High-speed Wi-Fi and satellite TV",
      "Smoke detector and fire extinguisher",
      "Blow dryer",
      "Magnetic key system",
      "Daily housekeeping",
      "Room service",
    ],
    images: [
      "/images/rooms/luxury-suite/01.webp",
      "/images/rooms/luxury-suite/02.webp",
      "/images/rooms/luxury-suite/03.webp",
      "/images/rooms/luxury-suite/04.webp",
      "/images/rooms/luxury-suite/05.webp",
      "/images/rooms/luxury-suite/06.webp",
      "/images/rooms/luxury-suite/07.webp",
    ],
    featured: true,
  },
  {
    id: "rt-family",
    slug: "family-room",
    name: "Family Room",
    shortDescription:
      "Two-bedroom apartment with balcony — designed for families and groups.",
    description:
      "The Family Room, spanning 77.26 square meters, is designed for families or groups. Featuring two private bedrooms, two bathrooms, a fully equipped kitchen, and a balcony, this apartment offers ample space and comfort. Ideal for families or groups, it provides a luxurious retreat with all the conveniences of home.",
    capacity: 5,
    bedType: "King + Queen Beds",
    size: "77.26 m²",
    basePrice: 161,
    inventory: 2,
    amenities: [
      "Complimentary breakfast",
      "Two private bedrooms (king-size and queen-size beds)",
      "Two private bathrooms",
      "Spacious living area with balcony access",
      "Fully equipped kitchen and dining area",
      "High-speed Wi-Fi and satellite TV",
      "Coffee and tea-making facilities with complimentary refreshments",
      "Laundry facilities",
      "Smoke detector and fire extinguisher",
      "Blow dryer",
      "Magnetic key system",
      "Daily housekeeping",
    ],
    images: [
      "/images/rooms/family-room/01.webp",
      "/images/rooms/family-room/02.webp",
      "/images/rooms/family-room/03.webp",
      "/images/rooms/family-room/04.webp",
      "/images/rooms/family-room/05.webp",
      "/images/rooms/family-room/06.webp",
      "/images/rooms/family-room/07.webp",
    ],
    featured: true,
  },
];

export const seasonalPricing: SeasonalPricing[] = [
  {
    id: "sp-1",
    roomTypeId: "rt-standard",
    name: "Peak Season (Dec–Jan)",
    startDate: "2026-12-01",
    endDate: "2027-01-15",
    priceMultiplier: 1.25,
  },
  {
    id: "sp-2",
    roomTypeId: "rt-deluxe",
    name: "Peak Season (Dec–Jan)",
    startDate: "2026-12-01",
    endDate: "2027-01-15",
    priceMultiplier: 1.3,
  },
  {
    id: "sp-3",
    roomTypeId: "rt-deluxe-suite",
    name: "Peak Season (Dec–Jan)",
    startDate: "2026-12-01",
    endDate: "2027-01-15",
    priceMultiplier: 1.2,
  },
  {
    id: "sp-4",
    roomTypeId: "rt-luxury",
    name: "Peak Season (Dec–Jan)",
    startDate: "2026-12-01",
    endDate: "2027-01-15",
    priceMultiplier: 1.15,
  },
  {
    id: "sp-5",
    roomTypeId: "rt-family",
    name: "Peak Season (Dec–Jan)",
    startDate: "2026-12-01",
    endDate: "2027-01-15",
    priceMultiplier: 1.2,
  },
];

export const guestReviews: GuestReview[] = [
  {
    id: "rev-1",
    name: "Sarah Mitchell",
    country: "United Kingdom",
    rating: 5,
    text: "Wonderful stay near the African Union — perfect for my conference trip. Spotless room, excellent breakfast, and the fitness center was a bonus. Will definitely return!",
    date: "2026-03-15",
    roomTypeId: "rt-deluxe",
    approved: true,
  },
  {
    id: "rev-2",
    name: "Ahmed Hassan",
    country: "UAE",
    rating: 5,
    text: "Best hotel experience in Addis Ababa. Fast WiFi for remote work, great breakfast, and only 15 minutes from the airport. The Standard Room had everything I needed.",
    date: "2026-02-28",
    roomTypeId: "rt-standard",
    approved: true,
  },
  {
    id: "rev-3",
    name: "Maria Santos",
    country: "Portugal",
    rating: 4,
    text: "Lovely Deluxe Suite for our extended stay. Kitchen was perfect and the location in Sarbet is very convenient. Staff were incredibly welcoming.",
    date: "2026-01-20",
    roomTypeId: "rt-deluxe-suite",
    approved: true,
  },
  {
    id: "rev-4",
    name: "James Okafor",
    country: "Nigeria",
    rating: 5,
    text: "Booked directly through their website — much better price than Booking.com! Clean rooms, 24-hour reception, and WhatsApp support was instant.",
    date: "2026-04-02",
    roomTypeId: "rt-standard",
    approved: true,
  },
  {
    id: "rev-5",
    name: "Elena Popov",
    country: "Germany",
    rating: 5,
    text: "Stayed two weeks on business near Pushkin Square. Dedicated workspace, reliable internet, and backup power during outages. Victoria is my go-to in Addis.",
    date: "2025-12-10",
    roomTypeId: "rt-luxury",
    approved: true,
  },
  {
    id: "rev-6",
    name: "David Chen",
    country: "China",
    rating: 4,
    text: "Great value for money. Studio was comfortable and well-maintained. Free shuttle to the airport was arranged smoothly. Would book again.",
    date: "2026-03-01",
    roomTypeId: "rt-standard",
    approved: true,
  },
];

export const reservations: Reservation[] = [
  {
    id: "res-1",
    refNumber: "VHA-20260605-A3K9",
    guestName: "Sarah Mitchell",
    email: "sarah.m@email.com",
    phone: "+44 7700 900123",
    nationality: "British",
    roomTypeId: "rt-deluxe",
    checkIn: "2026-06-10",
    checkOut: "2026-06-14",
    status: "confirmed",
    totalAmount: 356,
    guests: 2,
    createdAt: "2026-06-05T10:30:00Z",
  },
  {
    id: "res-2",
    refNumber: "VHA-20260606-B7M2",
    guestName: "Ahmed Hassan",
    email: "ahmed.h@email.com",
    phone: "+971 50 123 4567",
    nationality: "Emirati",
    roomTypeId: "rt-luxury",
    checkIn: "2026-06-08",
    checkOut: "2026-06-15",
    status: "checked_in",
    totalAmount: 938,
    guests: 1,
    specialRequests: "Late check-in requested",
    createdAt: "2026-06-06T14:15:00Z",
  },
  {
    id: "res-3",
    refNumber: "VHA-20260607-C1P5",
    guestName: "Maria Santos",
    email: "maria.s@email.com",
    phone: "+351 912 345 678",
    nationality: "Portuguese",
    roomTypeId: "rt-deluxe-suite",
    checkIn: "2026-06-12",
    checkOut: "2026-06-18",
    status: "confirmed",
    totalAmount: 642,
    guests: 3,
    createdAt: "2026-06-07T09:00:00Z",
  },
  {
    id: "res-4",
    refNumber: "VHA-20260520-D4R8",
    guestName: "James Okafor",
    email: "james.o@email.com",
    phone: "+234 803 456 7890",
    nationality: "Nigerian",
    roomTypeId: "rt-standard",
    checkIn: "2026-05-25",
    checkOut: "2026-05-28",
    status: "checked_out",
    totalAmount: 213,
    guests: 1,
    createdAt: "2026-05-20T16:45:00Z",
  },
  {
    id: "res-5",
    refNumber: "VHA-20260608-E9T3",
    guestName: "Elena Popov",
    email: "elena.p@email.com",
    phone: "+49 170 123 4567",
    nationality: "German",
    roomTypeId: "rt-deluxe",
    checkIn: "2026-06-20",
    checkOut: "2026-06-25",
    status: "pending",
    totalAmount: 445,
    guests: 2,
    createdAt: "2026-06-08T11:20:00Z",
  },
];

export const amenitiesList = [
  { icon: "wifi", label: "Free WiFi & Broadband" },
  { icon: "breakfast", label: "Complimentary Breakfast" },
  { icon: "shuttle", label: "Free Shuttle Service" },
  { icon: "fitness", label: "Fitness Center" },
  { icon: "laundry", label: "Laundry Service" },
  { icon: "security", label: "24/7 Security" },
  { icon: "reception", label: "24h Reception" },
  { icon: "roomservice", label: "Room Service" },
];

export function getRoomBySlug(slug: string): RoomType | undefined {
  return roomTypes.find((r) => r.slug === slug);
}

export function getRoomById(id: string): RoomType | undefined {
  return roomTypes.find((r) => r.id === id);
}

export function getApprovedReviews(): GuestReview[] {
  return guestReviews.filter((r) => r.approved);
}

export function getAverageRating(): number {
  const approved = getApprovedReviews();
  if (approved.length === 0) return 0;
  return (
    Math.round(
      (approved.reduce((sum, r) => sum + r.rating, 0) / approved.length) * 10
    ) / 10
  );
}

export function getReservationByRef(ref: string): Reservation | undefined {
  return reservations.find(
    (r) => r.refNumber.toLowerCase() === ref.toLowerCase()
  );
}

export function getGuestHistory(phone: string): Reservation[] {
  const clean = phone.replace(/\D/g, "");
  return reservations.filter((r) => r.phone.replace(/\D/g, "").includes(clean));
}

export function getOccupancyRate(date: string): number {
  const active = reservations.filter(
    (r) =>
      (r.status === "confirmed" || r.status === "checked_in") &&
      r.checkIn <= date &&
      r.checkOut > date
  );
  const totalInventory = roomTypes.reduce((sum, r) => sum + r.inventory, 0);
  return totalInventory > 0
    ? Math.round((active.length / totalInventory) * 100)
    : 0;
}

export function getAvailableCount(
  roomTypeId: string,
  checkIn: string,
  checkOut: string
): number {
  const room = getRoomById(roomTypeId);
  if (!room) return 0;

  const overlapping = reservations.filter(
    (r) =>
      r.roomTypeId === roomTypeId &&
      (r.status === "confirmed" ||
        r.status === "checked_in" ||
        r.status === "pending") &&
      r.checkIn < checkOut &&
      r.checkOut > checkIn
  );

  return Math.max(0, room.inventory - overlapping.length);
}
