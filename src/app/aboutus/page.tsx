import React from "react";
import { Icon } from "@iconify/react";
import { Metadata } from "next";
import HelpSection from "@/components/HelpSection";

export const metadata: Metadata = {
  title: "About Us |  AL Marjan Car Rental UAE",
  description:
    "AL MARJAN RENT CARS - Your trusted 5-star car rental service in Ras Al Khaimah, UAE. Explore our wide range of vehicles with unbeatable rates and 24/7 support.",
  keywords: [
    "Car Rental",
    "Ras Al Khaimah",
    "UAE",
    "Rent a Car",
    "AL MARJAN RENT CARS",
    "Affordable Car Rental",
    "Luxury Cars",
    "Long-term Car Rental",
    "Car rental UAE",
    "Rent a car Dubai",
    "Luxury car rental",
    "SUV rental Dubai",
    "Economy car rental UAE",
    "Best car rental service in Dubai",
  ],
  authors: [{ name: "AL MARJAN RENT CARS" }],
  openGraph: {
    title: "About Us - AL MARJAN RENT CARS",
    description:
      "Experience top-rated car rental services in Ras Al Khaimah with AL MARJAN RENT CARS.",
    type: "website",
  },
};
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col pt-28 items-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4 text-center">
          About Us
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Your trusted car rental service in Ras Al Khaimah
        </p>

        {/* Introduction */}
        <p className="text-gray-700  text-sm md:text-lg leading-relaxed">
        Welcome {" "} to <strong className="text-primary">AL MARJAN RENT CARS</strong>, A trusted 5 Star Car Rental service provider in Ras
Al Khaimah, UAE. With over a decade of dedicated service, we are committed to delivering
exceptional car rental experiences tailored to your car rental needs in Ras Al Khaimah.

        </p>

        {/* Mission Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold my-2 text-gray-900  gap-2">
            Our Mission
          </h3>
          <p className="text-gray-700 mt-2  text-sm md:text-lg leading-relaxed">
            At <strong className="text-primary">AL MARJAN RENT CARS</strong>,
            our mission extends beyond simply rent a car. We strive to
understand and meet our customers' unique requirements for car rentals, ensuring complete
satisfaction with every time they rent a car in Ras Al Khaimah.

          </p>
        </div>

       

        {/* Closing Message */}
        <p className="text-center bg-success-700 border py-2 border-success-600 text-white  text-sm md:text-lg  font-medium mt-5 ">
          Experience the difference with{" "}
          <strong className="text-white">AL MARJAN RENT CARS</strong>—your car
          rental journey starts with trust and satisfaction.
        </p>
      </div>
      <HelpSection />
    </div>
  );
}
