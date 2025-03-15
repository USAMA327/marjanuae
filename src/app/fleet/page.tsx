import { Metadata } from "next";
import Fleet from "./Fleet";

export const metadata: Metadata = {
  title: "Fleet | AL Marjan Car Rental UAE",
  description:
    "Explore our fleet of luxury and economy rental cars in Dubai and across the UAE.",
  keywords: [
    "car rental UAE",
    "rent a car Dubai",
    "luxury car rental",
    "cheap car rental UAE",
  ],
  openGraph: {
    title: "Fleet | AL Marjan Car Rental UAE",
    description:
      "Browse our premium fleet of rental cars available in Dubai and across the UAE.",
    url: "https://yourwebsite.com/fleet",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/images/fleet-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Car rental fleet in UAE",
      },
    ],
  },
};

export default function Page() {
  return <Fleet />;
}
