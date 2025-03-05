import React from "react";
import Head from "next/head";
import { Icon } from "@iconify/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us | AL MARJAN RENT CARS',
  description: 'AL MARJAN RENT CARS - Your trusted 5-star car rental service in Ras Al Khaimah, UAE. Explore our wide range of vehicles with unbeatable rates and 24/7 support.',
  keywords: 'Car Rental, Ras Al Khaimah, UAE, Rent a Car, AL MARJAN RENT CARS, Affordable Car Rental, Luxury Cars, Long-term Car Rental',
  authors: [{ name: 'AL MARJAN RENT CARS' }],
  openGraph: {
    title: 'About Us - AL MARJAN RENT CARS',
    description: 'Experience top-rated car rental services in Ras Al Khaimah with AL MARJAN RENT CARS.',
    type: 'website',
  },
};
export default function AboutUs() {
  return (
    <>
   

      <div className="min-h-screen bg-gray-100 py-28 px-6">
        <div className=" bg-white shadow-lg rounded-lg p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
            <p className="text-gray-500 text-lg">
              Your trusted car rental service in Ras Al Khaimah
            </p>
          </div>

          {/* Introduction */}
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to{" "}
            <strong className="text-primary">AL MARJAN RENT CARS</strong>, a
            5-star car rental service provider in Ras Al Khaimah, UAE. With over
            a decade of experience, we ensure exceptional car rental services
            tailored to your needs.
          </p>

          {/* Mission Section */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900  gap-2">
              Our Mission
            </h3>
            <p className="text-gray-700 mt-2 leading-relaxed">
              At <strong className="text-primary">AL MARJAN RENT CARS</strong>,
              our goal is beyond just renting cars. We strive to understand our
              customers' needs and deliver complete satisfaction every time.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div>
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
                  />{" "}
                  <p className="text-lg">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              Contact Us
            </h3>
            <div className="mt-4 space-y-2 text-gray-700">
              {[
                {
                  text: "Al Muntasir Road, Opp to Value Bag, Al Nakheel, Ras Al Khaimah, UAE",
                  icon: "icon-[ph--map-pin-line-thin]",
                },
                {
                  text: "+971-50-599-6321 | +971-56-189-8881",
                  icon: "icon-[ph--phone-light]",
                },
                { text: "rak@marjanuae.com", icon: "icon-[mdi--email]" },
              ].map((contact, index) => (
                <p key={index} className="flex items-center gap-2">
                  <span className={`${contact.icon} text-black size-5`} />{" "}
                  <strong className="font-medium">{contact.text}</strong>
                </p>
              ))}
            </div>
          </div>

          {/* Closing Message */}
          <p className="text-center text-lg font-medium text-gray-700">
            Experience the difference with{" "}
            <strong className="text-primary">AL MARJAN RENT CARS</strong>—your
            car rental journey starts with trust and satisfaction.
          </p>
        </div>
      </div>
    </>
  );
}
