import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Victoria Hotel Apartments | Sarbet, Addis Ababa",
    template: "%s | Victoria Hotel Apartments",
  },
  description:
    "Book directly at Victoria Hotel Apartments in Sarbet, Pushkin Square, Addis Ababa. Free breakfast, WiFi, fitness center. 2 min from African Union, 15 min from airport.",
  keywords: [
    "Addis Ababa hotel",
    "guesthouse Addis Ababa",
    "Bole hotel",
    "Victoria Hotel Apartment",
    "serviced apartment Addis Ababa",
    "hotel near Bole airport",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
