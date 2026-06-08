export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "checked_in"
  | "checked_out";

export interface RoomType {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  capacity: number;
  bedType: string;
  size: string;
  basePrice: number;
  inventory: number;
  amenities: string[];
  images: string[];
  featured?: boolean;
}

export interface SeasonalPricing {
  id: string;
  roomTypeId: string;
  name: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number;
  fixedPrice?: number;
}

export interface GuestReview {
  id: string;
  name: string;
  country: string;
  rating: number;
  text: string;
  date: string;
  roomTypeId?: string;
  approved: boolean;
}

export interface Reservation {
  id: string;
  refNumber: string;
  guestName: string;
  email: string;
  phone: string;
  nationality?: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  totalAmount: number;
  guests: number;
  specialRequests?: string;
  createdAt: string;
}

export interface SiteSettings {
  hotelName: string;
  tagline: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  airportName: string;
  airportDistanceMin: number;
  africanUnionDistanceMin: number;
  checkInTime: string;
  checkOutTime: string;
  bookingComUrl: string;
  airbnbUrl: string;
  latitude: number;
  longitude: number;
  vatRate: number;
  managerName: string;
  managerTitle: string;
  managerBio: string;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomTypeId: string;
  guestName: string;
  email: string;
  nationality: string;
  phone: string;
  specialRequests: string;
}

export interface HotelAdvantage {
  title: string;
  description: string;
}

export interface AvailabilityDay {
  date: string;
  available: number;
  total: number;
  price: number;
}
