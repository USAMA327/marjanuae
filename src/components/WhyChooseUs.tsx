import React from "react";
import Image from "next/image";
import CarWithSpec from "../../public/cars/MG_RX5.png";
import { Icon } from "@iconify/react/dist/iconify.js";

const benefits = [
  {
    icon: "ic:baseline-star",
    title: "Most trusted in our Town",
    description: "We are a 5-star people’s trusted car rental company in Ras Al Khaimah UAE.",
  },
  {
    icon: "fluent:vehicle-car-16-filled",
    title: "Wide Range of Vehicles",
    description: "Al Marjan Rent a Car offers a variety of vehicles to suit your rental needs without putting pressure on your pockets.",
  },
  {
    icon: "eva:pricetags-fill",
    title: "Competitive Pricing",
    description: "We offer attractive tailor-made pricing and flexible rental terms, making it affordable for short-term or long-term rentals.",
  },
  {
    icon: "carbon:user-certification",
    title: "Quality Service",
    description: "Here at Al Marjan, we provide excellent customer service, including prompt delivery, assistance, and immediate support.",
  },
  {
    icon: "carbon:location-filled",
    title: "Convenient Locations",
    description: "We offer free pick-up and drop-off in our RAK CITY office, as well as free delivery & collection from any hotels within RAK CITY limits. On top of that, we do delivery & collection to and from any hotel in AL MARJAN ISLAND or RAK Intl AIRPORT.",
  },
  {
    icon: "carbon:calendar-heat-map",
    title: "Easy Booking Process",
    description: "Our booking & payment process is very simple and convenient at your fingertips; Count 1.2.3 and it's Done!",
  },
  {
    icon: "carbon:security",
    title: "Insurance",
    description: "Offering comprehensive insurance options can give customers peace of mind while on the road.",
  },
  {
    icon: "carbon:tools",
    title: "Well-Maintained Fleet",
    description: "Our rental vehicles are regularly serviced and well-maintained, ensuring safety and reliability.",
  },
];

const BenefitItem = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="flex gap-3  items-start">
    <div className="h-16 w-16 flex justify-center items-center bg-[#ECF5FF] shadow-sm rounded-lg">
      <Icon icon={icon} className="text-4xl text-primary" />
    </div>
    <div className="flex-1">
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="text-[#b0b0b0]">{description}</p>
    </div>
  </div>
);

const WhyChooseUs = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center mx-4 lg:mx-20 pb-32">
      {/* Car Image */}
      <div className="w-full lg:w-1/2 relative">
        <Image
          className="transform -scale-x-[1]"
          src={CarWithSpec}
          priority
          alt="MG RX5 Car with specifications"
        />
      </div>

      {/* Benefits Section */}
      <div className="w-full lg:w-1/2">
        <h4 className="text-lg font-semibold text-[#b0b0b0] uppercase mb-2">Why Al Marjan?</h4>
        <h2 className="text-3xl font-semibold text-[#323234]">
          We offer the best experience with our rental deals
        </h2>
        <div className="mt-6 space-y-6">
          {benefits.map((benefit) => (
            <BenefitItem key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;