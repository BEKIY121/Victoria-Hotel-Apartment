import { PrismaClient, ReservationStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const siteSettingsData = {
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

const roomTypes = [
  {
    slug: "standard-room",
    name: "Standard Room",
    shortDescription:
      "A perfect blend of style and functionality — ideal for solo travelers.",
    description:
      "Our Standard Room offers a perfect blend of style and functionality, spanning 32.65 square meters. Designed for comfort, it features a private bathroom, a spacious bed, and modern amenities to ensure a seamless stay. Ideal for solo travelers, this room provides a cozy retreat with all the essentials for a comfortable stay.",
    capacity: 2,
    bedType: "Spacious Bed",
    sizeSqm: 32.65,
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
    sortOrder: 1,
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    shortDescription:
      "Separate living and sleeping areas with queen-size bed — perfect for longer stays.",
    description:
      "The Deluxe Room spans 49.15 square meters, offering separate living and sleeping areas for added privacy and comfort. Perfect for longer stays, this suite combines elegance with practicality. Whether for business or leisure, it provides a serene sanctuary designed to meet your needs.",
    capacity: 2,
    bedType: "Queen Bed",
    sizeSqm: 49.15,
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
    sortOrder: 2,
  },
  {
    slug: "deluxe-suite",
    name: "Deluxe Suite",
    shortDescription:
      "Fully equipped kitchen and separate living area — ideal for extended stays.",
    description:
      "Our Deluxe Suite, spanning 52.33 square meters, is ideal for guests seeking the convenience of a fully equipped kitchen. This spacious accommodation features a king-size bed, a private bathroom, and a separate living area. Perfect for extended stays, this apartment offers the comfort of home with the luxury of a guesthouse.",
    capacity: 3,
    bedType: "King Bed",
    sizeSqm: 52.33,
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
    sortOrder: 3,
  },
  {
    slug: "luxury-suite",
    name: "Luxury Suite",
    shortDescription:
      "Elegant one-bedroom suite with balcony, kitchen, and plush bedding.",
    description:
      "Our Luxury Suite, spanning 66.02 square meters, combines elegance and functionality. Featuring a private bedroom, a fully equipped kitchen, and a balcony, this suite is perfect for both short and extended stays. Designed for comfort and convenience, it offers a tranquil retreat for discerning travelers.",
    capacity: 2,
    bedType: "Plush King Bed",
    sizeSqm: 66.02,
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
    sortOrder: 4,
  },
  {
    slug: "family-room",
    name: "Family Room",
    shortDescription:
      "Two-bedroom apartment with balcony — designed for families and groups.",
    description:
      "The Family Room, spanning 77.26 square meters, is designed for families or groups. Featuring two private bedrooms, two bathrooms, a fully equipped kitchen, and a balcony, this apartment offers ample space and comfort. Ideal for families or groups, it provides a luxurious retreat with all the conveniences of home.",
    capacity: 5,
    bedType: "King + Queen Beds",
    sizeSqm: 77.26,
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
    sortOrder: 5,
  },
];

const galleryCategories: { category: string; folder: string; title?: string }[] = [
  { category: "lobby", folder: "lobby", title: "Lobby & Reception" },
  { category: "recreation", folder: "recreation", title: "Recreation & Fitness" },
  { category: "restaurant", folder: "restaurant", title: "Restaurant & Dining" },
  { category: "property", folder: "property", title: "Victoria Guesthouse" },
];

const reviews = [
  {
    name: "Sarah Mitchell",
    country: "United Kingdom",
    rating: 5,
    text: "Wonderful stay near the African Union — perfect for my conference trip. Spotless room, excellent breakfast, and the fitness center was a bonus. Will definitely return!",
    roomSlug: "deluxe-room",
    approved: true,
  },
  {
    name: "Ahmed Hassan",
    country: "UAE",
    rating: 5,
    text: "Best hotel experience in Addis Ababa. Fast WiFi for remote work, great breakfast, and only 15 minutes from the airport. The Standard Room had everything I needed.",
    roomSlug: "standard-room",
    approved: true,
  },
  {
    name: "Maria Santos",
    country: "Portugal",
    rating: 4,
    text: "Lovely Deluxe Suite for our extended stay. Kitchen was perfect and the location in Sarbet is very convenient. Staff were incredibly welcoming.",
    roomSlug: "deluxe-suite",
    approved: true,
  },
  {
    name: "James Okafor",
    country: "Nigeria",
    rating: 5,
    text: "Booked directly through their website — much better price than Booking.com! Clean rooms, 24-hour reception, and WhatsApp support was instant.",
    roomSlug: "standard-room",
    approved: true,
  },
  {
    name: "Elena Popov",
    country: "Germany",
    rating: 5,
    text: "Stayed two weeks on business near Pushkin Square. Dedicated workspace, reliable internet, and backup power during outages. Victoria is my go-to in Addis.",
    roomSlug: "luxury-suite",
    approved: true,
  },
];

async function main() {
  console.log("Seeding Victoria Hotel database...");

  await prisma.payment.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.promotionRoom.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.seasonalRate.deleteMany();
  await prisma.review.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.availabilityBlock.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.adminUser.deleteMany();

  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: { data: siteSettingsData },
    create: { id: "default", data: siteSettingsData },
  });

  const createdRooms: Record<string, string> = {};

  for (const room of roomTypes) {
    const created = await prisma.roomType.create({
      data: {
        slug: room.slug,
        name: room.name,
        description: room.description,
        shortDescription: room.shortDescription,
        capacity: room.capacity,
        bedType: room.bedType,
        sizeSqm: room.sizeSqm,
        basePrice: room.basePrice,
        inventory: room.inventory,
        amenities: room.amenities,
        images: room.images,
        featured: room.featured,
        sortOrder: room.sortOrder,
      },
    });
    createdRooms[room.slug] = created.id;
  }

  await prisma.seasonalRate.createMany({
    data: [
      {
        roomTypeId: createdRooms["standard-room"],
        name: "Peak Season (Dec–Jan)",
        startDate: new Date("2026-12-01"),
        endDate: new Date("2027-01-15"),
        priceMultiplier: 1.25,
      },
      {
        roomTypeId: createdRooms["deluxe-room"],
        name: "Peak Season (Dec–Jan)",
        startDate: new Date("2026-12-01"),
        endDate: new Date("2027-01-15"),
        priceMultiplier: 1.3,
      },
      {
        roomTypeId: createdRooms["deluxe-suite"],
        name: "Peak Season (Dec–Jan)",
        startDate: new Date("2026-12-01"),
        endDate: new Date("2027-01-15"),
        priceMultiplier: 1.2,
      },
      {
        roomTypeId: createdRooms["luxury-suite"],
        name: "Peak Season (Dec–Jan)",
        startDate: new Date("2026-12-01"),
        endDate: new Date("2027-01-15"),
        priceMultiplier: 1.15,
      },
      {
        roomTypeId: createdRooms["family-room"],
        name: "Peak Season (Dec–Jan)",
        startDate: new Date("2026-12-01"),
        endDate: new Date("2027-01-15"),
        priceMultiplier: 1.2,
      },
    ],
  });

  await prisma.promotion.create({
    data: {
      code: "DIRECT10",
      name: "Direct Booking 10% Off",
      discountType: "percent",
      discountValue: 10,
      startDate: new Date("2026-01-01"),
      endDate: new Date("2027-12-31"),
      active: true,
    },
  });

  for (const review of reviews) {
    await prisma.review.create({
      data: {
        name: review.name,
        country: review.country,
        rating: review.rating,
        text: review.text,
        roomTypeId: createdRooms[review.roomSlug],
        approved: review.approved,
      },
    });
  }

  for (const cat of galleryCategories) {
    const dir = `public/images/gallery/${cat.folder}`;
    let sortOrder = 0;
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const files = await fs.readdir(dir);
      const images = files.filter((f) => f.endsWith(".webp")).sort();
      for (const file of images) {
        await prisma.galleryImage.create({
          data: {
            category: cat.category,
            title: cat.title,
            url: `/images/gallery/${cat.folder}/${file}`,
            sortOrder: sortOrder++,
          },
        });
      }
    } catch {
      console.warn(`Gallery folder not found: ${cat.folder} — run npm run photos first`);
    }
  }

  const guest1 = await prisma.guest.create({
    data: {
      name: "Sarah Mitchell",
      email: "sarah.m@email.com",
      phone: "+44 7700 900123",
      nationality: "British",
    },
  });

  await prisma.reservation.create({
    data: {
      refNumber: "VHA-20260605-A3K9",
      guestId: guest1.id,
      roomTypeId: createdRooms["deluxe-room"],
      checkIn: new Date("2026-06-10"),
      checkOut: new Date("2026-06-14"),
      guests: 2,
      status: ReservationStatus.confirmed,
      totalAmount: 356,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@victoriahotel.et";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "changeme";
  const adminName = process.env.ADMIN_NAME ?? "Hotel Admin";

  await prisma.adminUser.create({
    data: {
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      name: adminName,
      role: "manager",
    },
  });

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
