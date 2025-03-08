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
          Welcome to{" "}
          <strong className="text-primary">AL MARJAN RENT CARS</strong>, a
          5-star car rental service provider in Ras Al Khaimah, UAE. With over a
          decade of experience, we ensure exceptional car rental services
          tailored to your needs.
        </p>

        {/* Mission Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold my-2 text-gray-900  gap-2">
            Our Mission
          </h3>
          <p className="text-gray-700 mt-2  text-sm md:text-lg leading-relaxed">
            At <strong className="text-primary">AL MARJAN RENT CARS</strong>,
            our goal is beyond just renting cars. We strive to understand our
            customers needs and deliver complete satisfaction every time.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="my-10">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            Why Choose Us?
          </h3>

          <ul className="mt-4 space-y-3 text-gray-700">
            {[
              {
                text: "Dedicated service & support with over 10 years of experience.",
                icon: "mdi:headset",
              },
              {
                text: "Wide range of ready-to-rent vehicles for any occasion.",
                icon: "mdi:car-multiple",
              },
              {
                text: "24/7 customer assistance for a seamless experience.",
                icon: "mdi:clock-outline",
              },
              {
                text: "Unbeatable tailor-made rates with flexible rental options.",
                icon: "mdi:cash",
              },
              {
                text: "Hassle-free documentation for quick pick-up.",
                icon: "mdi:clipboard-check",
              },
              {
                text: "Special pricing for long-term leases.",
                icon: "mdi:tag-multiple",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Icon
                  icon={item.icon}
                  className={` bg-black size-10 p-2 bg-secondary rounded-md text-white`}
                />
                <p className=" text-sm md:text-lg">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing Message */}
        <p className="text-center bg-success-600 border py-2 border-success-700 text-white  text-sm md:text-lg  font-medium ">
          Experience the difference with{" "}
          <strong className="text-white">AL MARJAN RENT CARS</strong>—your car
          rental journey starts with trust and satisfaction.
        </p>
      </div>
      <HelpSection />
    </div>
  );
}
