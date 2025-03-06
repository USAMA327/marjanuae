import React from "react";
import CarBrand from "../data/brand.json";
import { Icon } from "@iconify/react";

export default function BrandSlider() {
  return (
    <div className="bg-gray-100 py-4 overflow-hidden">
      {/* Slider Wrapper */}
      <div className="flex whitespace-nowrap animate-scroll">
        {/* First Set of Logos */}
        {CarBrand.concat(CarBrand).map((brand, index) => (
          <div key={index} className="inline-flex gap-4 group items-center justify-center px-12">
            <Icon icon={brand.icon} className="size-14 md:size-20 text-[#b0b0b0] group-hover:text-orange-400" />
            <span className="mt-2 text-lg md:text-2xl font-medium text-[#b0b0b0] group-hover:text-orange-400">{brand.name}</span>
          </div>
        ))}
      </div>

      {/* Tailwind Keyframe Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
}
