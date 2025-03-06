"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { contactDetails } from "@/utils/contact";

export default function HelpSection() {
  return (
    <>
  

      <section className="my-6 p-6 bg-white shadow-lg rounded-lg w-full  mx-auto text-center flex flex-col justify-center items-center">
        {/* Title */}
        <h3 className="text-lg font-semibold text-primary bg-blue-100 px-5 py-3 rounded-md mb-4">
          Need Help Booking?
        </h3>

        {/* Description */}
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Call our customer service team to speak to one of our advisers.
        </p>

        {/* Contact Numbers */}
        <div className="flex flex-wrap items-center justify-center gap-4 my-4">
          {[
            { href: contactDetails.phone.href, label:  contactDetails.phone.value },
            { href: contactDetails.phone2.href, label: contactDetails.phone2.value},
          ].map(({ href, label }, index) => (
            <a
              key={index}
              href={href}
              className="flex items-center gap-2 text-sm font-semibold text-primary group transition-all hover:text-orange-500"
              aria-label={`Call ${label}`}
            >
              <Icon icon="mdi:phone" className="text-lg text-primary group-hover:text-orange-500" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        {/* Contact Information */}
        <div className="flex flex-col items-center justify-center space-y-3 text-gray-700 w-full">
          {[
            { text: contactDetails.email.value, icon: "mdi:email-outline" ,href:contactDetails.email.href},
            {
              text:contactDetails.location.value,
              icon: "ph:map-pin-line",
              href: contactDetails.location.href
            },
          ].map(({ text, icon,href }, index) => (
            <a href={href} target="_blank" key={index} className="flex items-start gap-2 text-sm group transition-all hover:text-orange-500">
              <Icon icon={icon} className="text-lg text-primary group-hover:text-orange-500" />
              <strong className="font-medium">{text}</strong>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
