import React from "react";
import { Metadata } from "next";
import HelpSection from "@/components/HelpSection";

export const metadata: Metadata = {
  title: "FAQ - AL MARJAN RENT CARS",
  description:
    "Find answers to frequently asked questions about car rentals with AL MARJAN RENT CARS. Learn about required documents, payment methods, delivery charges, and more.",
  keywords:
    "FAQ, Car Rental Questions, Rent a Car, UAE, AL MARJAN RENT CARS, Car Rental Requirements, Car Rental Payment, Car Rental Policies",
  authors: [{ name: "AL MARJAN RENT CARS" }],
  openGraph: {
    title: "FAQ - AL MARJAN RENT CARS",
    description:
      "Discover answers to common questions about renting a car with AL MARJAN RENT CARS in UAE. Know about documentation, payments, and rental policies.",
    type: "website",
  },
};

const faqs = [
  {
    question: "What documents are required for renting a car?",
    answer:
      "• Valid Passport\n• Valid Driver License if not in English - Original + Translated Copy required\n\nTo know more about the validity of your driver license please refer to this page.",
  },
  {
    question: "Do I need a credit card or is a cash deposit accepted?",
    answer:
      "A credit card is required for renting a car, but to know the exceptional cases please chat on our official WhatsApp for 24/7 support.",
  },
  {
    question: "Is there a delivery & collection charge?",
    answer:
      "Depends on your location of delivery/collection. Please refer to the Add-Ons page to see the applicable charges (if any).",
  },
  {
    question: "Can I change my booking and do I have to pay cancellation fees?",
    answer:
      "Al Morjan currently does not impose any cancellation or no-show fee on the reservations.\n\nSecure your booking by paying online, and you may cancel anytime free of charge and get a full refund, if needed, without incurring any additional cost.",
  },
  {
    question: "Can I drive the rented car outside UAE border?",
    answer:
      "Rented cars are not allowed to cross UAE borders. However, border authority rules are subject to change from time to time. Please refer to the border authority website for updated rules & requirements.",
  },
  {
    question: "Can I rent a car from one location and drop it off at another location?",
    answer:
      "Yes, you can get it delivered or pick it up from one location and drop it off at another location with an extra charge.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col pt-28 items-center">
      <HelpSection />

      <div className="w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Find quick answers to some of our most frequently asked questions.
        </p>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-2">
              <details className="group">
                <summary className="list-none flex justify-between items-center text-lg font-semibold text-gray-800 py-3 cursor-pointer focus:outline-none">
                  <span>{faq.question}</span>
                  <span className="text-xl text-blue-500 transition-transform duration-300 group-open:rotate-180">
                    ➕
                  </span>
                </summary>
                <div className="text-gray-600 mt-2 overflow-hidden">
                  <p className="whitespace-pre-line p-2">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;