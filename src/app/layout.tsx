import type { Metadata } from "next";
import { Poppins, El_Messiri } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactBar from "@/components/ContactBar";
import Cursor from "@/components/Cursor";
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { BookingProvider } from "@/context/BookingContext";
import { Toaster } from "react-hot-toast";
import NoInternet from "@/components/NoInternet";
import { GoogleTagManager } from '@next/third-parties/google';
const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // All available weights
});

const poppinsMono = Poppins({
  variable: "--font-poppins-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // All available weights
});

const elMessiriSans = El_Messiri({
  variable: "--font-el-messiri-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // All available weights for El Messiri
});

const elMessiriMono = El_Messiri({
  variable: "--font-el-messiri-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // All available weights for El Messiri
});

export const metadata: Metadata = {
  title: "Home | AL Marjan Car Rental UAE",
  description:
    "Explore a premium selection of rental cars at AL Marjan Car Rental UAE. We offer luxury, economy, and SUV rentals with flexible pricing and exceptional customer service. Rent a car in Dubai and across the UAE with ease.",
  keywords: [
    "Car rental UAE",
    "Rent a car Dubai",
    "Luxury car rental",
    "SUV rental Dubai",
    "Economy car rental UAE",
    "Best car rental service in Dubai",
  ],
  authors: [{ name: "AL MARJAN RENT CARS" }],
  openGraph: {
    title: "Home |AL Marjan Car Rental UAE",
    description:
      "Understand the terms and conditions for renting a car with AL MARJAN RENT CARS in UAE. Get details on payments, deposits, insurance, returns, and rental policies.",
    type: "website",
    url: "https://marjanuae.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
      <head>
  
      </head>

        <body
          className={`${poppinsSans.variable} ${poppinsMono.variable} ${elMessiriSans.variable} ${elMessiriMono.variable} antialiased`}
        >

          <Suspense fallback={null}>
          <GoogleTagManager gtmId="AW-17021713576" /> 
            <Analytics />
            <SpeedInsights />
            <AuthProvider>
              <BookingProvider>
                <Cursor />
                <Toaster />
                <NoInternet />
                <ContactBar />
                <Navbar />
                  {children}       
                <Footer />
              </BookingProvider>
            </AuthProvider>
          </Suspense>
        </body>
      </html>
    </>
  );
}
