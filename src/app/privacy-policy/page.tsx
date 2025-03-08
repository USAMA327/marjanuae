import Image from "next/image";
import React from "react";
import Payment from "../../../public/payments/payment.png";
import HelpSection from "@/components/HelpSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AL Marjan Car Rental UAE",
  description:
    "Read AL Marjan Car Rental's privacy policy. We do not store, sell, or share customer data. Learn about our payment security, terms, and data protection policies.",
  keywords: [
    "Privacy Policy",
    "Car rental privacy policy UAE",
    "AL Marjan Car Rental privacy",
    "Data protection UAE",
    "Customer data security",
    "Personal data protection",
    "Car rental terms and conditions",
    "Payment security Ras Al Khaimah",
    "Credit card safety UAE",
    "Secure online transactions UAE",
    "Visa card payments UAE",
    "Mastercard payments UAE",
    "Car rental data encryption",
    "GDPR compliance UAE",
    "Car booking security UAE",
    "No third-party data sharing policy",
    "Ras Al Khaimah car rental policies",
    "Secure checkout for car rentals",
    "Confidential customer data",
    "Online payment protection UAE",
  ],
  authors: [{ name: "AL MARJAN RENT CARS" }],
  openGraph: {
    title: "Privacy Policy | AL Marjan Car Rental UAE",
    description:
      "Your data is secure with AL Marjan Car Rental UAE. Learn about our privacy policy, payment security, and terms of service.",
    type: "website",
    url: "https://marjanuae.com//privacy-policy",
    images: [
      {
        url: "/payments/payment.png",
        width: 800,
        height: 600,
        alt: "Accepted payment methods",
      },
    ],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col pt-28 items-center">
      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4 text-center">
          Privacy & Policies
        </h1>

        <p className="text-gray-600 leading-relaxed">
          All Credit/Debit card details and personally identifiable information
          will <strong>NOT</strong> be stored, sold, shared, or leased to any
          third parties.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          The website policies and Terms and Conditions may be changed or
          updated occasionally to meet requirements and standards. Customers are
          encouraged to frequently visit these sections to stay informed about
          any changes. Modifications will be effective on the day they are
          posted.
        </p>
        <p className="text-gray-600 leading-relaxed my-4">
          We accept all <strong>Master / Visa Credit / Debit cards</strong> in
          AED.
        </p>
        <Image src={Payment} alt="payments" />
      </div>
      <HelpSection />
    </div>
  );
}
