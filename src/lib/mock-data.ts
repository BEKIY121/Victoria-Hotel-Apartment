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
    id: "rt-1",
    slug: "studio-apartment",
    name: "Studio Apartment",
    shortDescription:
      "A perfect blend of style and functionality — ideal for solo travelers.",
    description:
      "Our Studio Apartment offers a perfect blend of style and functionality, spanning 32.65 square meters. Designed for comfort, it features a private bathroom, a spacious bed, and modern amenities to ensure a seamless stay. Ideal for solo travelers, this room provides a cozy retreat with all the essentials for a comfortable stay.",
    capacity: 2,
    bedType: "Spacious Bed",
    size: "32.65 m²",
    basePrice: 3500,
    inventory: 6,
    amenities: [
      "Complimentary breakfast",
      "High-speed Wi-Fi & satellite TV",
      "Coffee & tea-making facilities",
      "Complimentary refreshments",
      "Refrigerator",
      "Dedicated workspace",
      "Blow-dryer",
      "Magnetic key system",
      "Smoke detector & fire extinguisher",
      "Daily housekeeping",
    ],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "rt-2",
    slug: "deluxe-studio",
    name: "Deluxe Studio",
    shortDescription:
      "Enhanced studio with premium furnishings and city views.",
    description:
      "Upgrade to our Deluxe Studio for additional space and refined comfort. Featuring high-quality furnishings, a dedicated workspace, and artwork by internationally acclaimed artists. Perfect for business travelers who need a tranquil environment with modern amenities and lush greenery views.",
    capacity: 2,
    bedType: "King Bed",
    size: "40 m²",
    basePrice: 5500,
    inventory: 4,
    amenities: [
      "Complimentary breakfast",
      "High-speed Wi-Fi & satellite TV",
      "Dedicated workspace",
      "Coffee & tea-making facilities",
      "Refrigerator",
      "Room service",
      "Magnetic key system",
      "Daily housekeeping",
      "Blow-dryer",
    ],
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "rt-3",
    slug: "one-bedroom-apartment",
    name: "One Bedroom Apartment",
    shortDescription:
      "Separate bedroom and living area for extended stays.",
    description:
      "Our One Bedroom Apartment provides ample space for couples and long-stay guests. A separate bedroom, living area, and fully equipped kitchenette create a true home-away-from-home experience. High-speed internet, backup power, and 24-hour security ensure peace of mind throughout your stay.",
    capacity: 3,
    bedType: "King Bed + Sofa Bed",
    size: "52 m²",
    basePrice: 7500,
    inventory: 3,
    amenities: [
      "Complimentary breakfast",
      "Full kitchenette",
      "Living & dining area",
      "High-speed Wi-Fi & cable",
      "Dedicated workspace",
      "Washing machine",
      "Daily housekeeping",
      "Room service",
      "Magnetic key system",
    ],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    ],
    featured: true,
  },
  {
    id: "rt-4",
    slug: "executive-suite",
    name: "Executive Suite",
    shortDescription:
      "Premium suite with terrace access and boutique amenities.",
    description:
      "Designed for discerning travelers, our Executive Suite features premium furnishings, a separate living space, and access to terrace views. Indulge in wellness at our boutique gym and spa. Self-sufficient infrastructure including private groundwater supply and backup generators ensures uninterrupted comfort.",
    capacity: 2,
    bedType: "King Bed",
    size: "65 m²",
    basePrice: 12000,
    inventory: 2,
    amenities: [
      "Complimentary breakfast",
      "Full kitchen",
      "Terrace access",
      "Boutique gym & spa access",
      "Premium toiletries",
      "Dedicated workspace",
      "High-speed Wi-Fi",
      "Airport shuttle (on request)",
      "Daily housekeeping",
      "24/7 security",
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    featured: false,
  },
];

export const seasonalPricing: SeasonalPricing[] = [
  {
    id: "sp-1",
    roomTypeId: "rt-1",
    name: "Peak Season (Dec–Jan)",
    startDate: "2026-12-01",
    endDate: "2027-01-15",
    priceMultiplier: 1.25,
  },
  {
    id: "sp-2",
    roomTypeId: "rt-2",
    name: "Peak Season (Dec–Jan)",
    startDate: "2026-12-01",
    endDate: "2027-01-15",
    priceMultiplier: 1.3,
  },
  {
    id: "sp-3",
    roomTypeId: "rt-3",
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
    roomTypeId: "rt-2",
    approved: true,
  },
  {
    id: "rev-2",
    name: "Ahmed Hassan",
    country: "UAE",
    rating: 5,
    text: "Best hotel experience in Addis Ababa. Fast WiFi for remote work, great breakfast, and only 15 minutes from the airport. The Studio Apartment had everything I needed.",
    date: "2026-02-28",
    roomTypeId: "rt-1",
    approved: true,
  },
  {
    id: "rev-3",
    name: "Maria Santos",
    country: "Portugal",
    rating: 4,
    text: "Lovely one-bedroom apartment for our extended stay. Kitchenette was perfect and the location in Sarbet is very convenient. Staff were incredibly welcoming.",
    date: "2026-01-20",
    roomTypeId: "rt-3",
    approved: true,
  },
  {
    id: "rev-4",
    name: "James Okafor",
    country: "Nigeria",
    rating: 5,
    text: "Booked directly through their website — much better price than Booking.com! Clean rooms, 24-hour reception, and WhatsApp support was instant.",
    date: "2026-04-02",
    roomTypeId: "rt-1",
    approved: true,
  },
  {
    id: "rev-5",
    name: "Elena Popov",
    country: "Germany",
    rating: 5,
    text: "Stayed two weeks on business near Pushkin Square. Dedicated workspace, reliable internet, and backup power during outages. Victoria is my go-to in Addis.",
    date: "2025-12-10",
    roomTypeId: "rt-4",
    approved: true,
  },
  {
    id: "rev-6",
    name: "David Chen",
    country: "China",
    rating: 4,
    text: "Great value for money. Studio was comfortable and well-maintained. Free shuttle to the airport was arranged smoothly. Would book again.",
    date: "2026-03-01",
    roomTypeId: "rt-1",
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
    roomTypeId: "rt-2",
    checkIn: "2026-06-10",
    checkOut: "2026-06-14",
    status: "confirmed",
    totalAmount: 22000,
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
    roomTypeId: "rt-4",
    checkIn: "2026-06-08",
    checkOut: "2026-06-15",
    status: "checked_in",
    totalAmount: 84000,
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
    roomTypeId: "rt-3",
    checkIn: "2026-06-12",
    checkOut: "2026-06-18",
    status: "confirmed",
    totalAmount: 51000,
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
    roomTypeId: "rt-1",
    checkIn: "2026-05-25",
    checkOut: "2026-05-28",
    status: "checked_out",
    totalAmount: 10500,
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
    roomTypeId: "rt-2",
    checkIn: "2026-06-20",
    checkOut: "2026-06-25",
    status: "pending",
    totalAmount: 27500,
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
