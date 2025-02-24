import React from "react";
import Image from "next/image";
import CarWithSpec from "../../public/cars/MG_RX5.png";

const benefits = [
  {
    icon: "icon-[marketeq--wallet-money]",
    title: "Best price guaranteed",
    description: "Find a lower price? We'll refund you 100% of the difference.",
  },
  {
    icon: "icon-[marketeq--user]",
    title: "Experienced driver",
    description:
      "Don't have a driver? Don't worry, we have many experienced drivers for you.",
  },
  {
    icon: "icon-[marketeq--chronometer-watch-3-second]",
    title: "24-hour car delivery",
    description: "Book your car anytime, and we will deliver it directly to you.",
  },
  {
    icon: "icon-[marketeq--chat-left-2]",
    title: "24/7 technical support",
    description:
      "Have a question? Contact Carentall support anytime  when you have a problem.",
  },
];

const BenefitItem = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
    <div className="flex gap-3 items-center">
      <div className="h-16 w-16 flex justify-center items-center bg-[#ECF5FF] shadow-sm rounded-lg">
        <i className={`${icon} text-4xl text-[#1572D3]`} aria-hidden="true"></i>
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
        <h4 className="text-lg font-semibold text-[#b0b0b0] mb-2">WHY CHOOSE US</h4>
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
