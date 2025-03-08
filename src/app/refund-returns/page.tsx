import HelpSection from "@/components/HelpSection";
import { termsData } from "@/data/terms";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions | AL MARJAN RENT CARS UAE",
  description:
    "Read AL MARJAN RENT CARS' terms and conditions for renting a car in UAE. Learn about rental policies, insurance, deposits, cancellations, and more.",
  keywords: [
    "Terms and Conditions",
    "Car Rental Terms UAE",
    "AL MARJAN RENT CARS policies",
    "Rental Agreement UAE",
    "Car Rental Insurance UAE",
    "Security Deposit for Car Rental",
    "Car Booking Cancellation Policy",
    "Car Rental Late Return Fees",
    "Car Rental Refund Policy",
    "Ras Al Khaimah Car Rental Agreement",
    "International Driving License UAE",
    "Border Crossing Car Rental Rules",
    "Rental Car Damage Policy",
    "Luxury Car Rental Terms UAE",
    "SUV Rental Policies UAE",
    "Payment Terms for Car Rentals",
    "Minimum Rental Period UAE",
    "Car Rental Credit Card Policy",
    "Early Car Rental Termination UAE",
    "Governing Law for Car Rental UAE",
  ],
  authors: [{ name: "AL MARJAN RENT CARS" }],
  openGraph: {
    title: "Terms & Conditions | AL MARJAN RENT CARS UAE",
    description:
      "Understand the terms and conditions for renting a car with AL MARJAN RENT CARS in UAE. Get details on payments, deposits, insurance, returns, and rental policies.",
    type: "website",
    url: "https://marjanuae.com/refund-returns",
  },
};

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col pt-32 items-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-primary bg-[#1572D310]  px-4 py-3 rounded-sm mb-4 text-center">
          Terms and Conditions
        </h1>

        {/* Dynamically Render Sections */}
        <div className="space-y-6 text-gray-700">
          {termsData.map((section, index) => (
            <section key={index}>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {section.title}
              </h3>

              <p className="whitespace-pre-line">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
      <HelpSection />
    </div>
  );
};

export default TermsAndConditions;
