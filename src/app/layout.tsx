import type { Metadata } from "next";
import { Poppins, El_Messiri } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactBar from "@/components/ContactBar";
import Cursor from "@/components/Cursor";
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
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
  title: "AL Marjan | UAE",
  description: "Rent a car service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Analytics/>
        <SpeedInsights/>
    <html lang="en">
      <body
        className={`${poppinsSans.variable} ${poppinsMono.variable} ${elMessiriSans.variable} ${elMessiriMono.variable} antialiased`}
      >
    
        <AuthProvider>
          
      <Cursor />
        <ContactBar/>
        <Navbar />
        {children}
        <Footer />
          </AuthProvider>
      </body>
    </html>
  
    </>
  );
}
