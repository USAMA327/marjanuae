import React from "react";
import CarBrand from "../data/brand.json";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Nissan from '../../public/logo/nissan.png'
import Toyota from '../../public/logo/toyota.png'
import Hyundai from '../../public/logo/hyundai.png'
import Kia from '../../public/logo/kia.png'
import Mg from '../../public/logo/mg.png'
import Mitsubishi from '../../public/logo/mitsubishi.png'
import Renault from '../../public/logo/renault.png'
export default function BrandSlider() {
  return (
    <div className="bg-slate-100 py-4 overflow-hidden">
      {/* Slider Wrapper */}
      <div className="flex whitespace-nowrap animate-scroll">
        {/* First Set of Logos */}
        {[
          { "id": 1, "icon": Nissan, "name": "Nissan" },
          { "id": 7, "icon": Toyota, "name": "Toyota" },
  { "id": 2, "icon": Mg, "name": "MG" },
  { "id": 3, "icon": Hyundai, "name": "Hyundai" },
  { "id": 4, "icon": Kia, "name": "Kia" },
  { "id": 5, "icon": Mitsubishi, "name": "Mitsubishi" },
  { "id": 6, "icon": Renault, "name": "Renault" },
  
].concat([
  { "id": 1, "icon": Nissan, "name": "Nissan" },
  { "id": 7, "icon": Toyota, "name": "Toyota" },
  { "id": 2, "icon": Mg, "name": "MG" },
  { "id": 3, "icon": Hyundai, "name": "Hyundai" },
  { "id": 4, "icon": Kia, "name": "Kia" },
  { "id": 5, "icon": Mitsubishi, "name": "Mitsubishi" },
  { "id": 6, "icon":Renault, "name": "Renault" }
]).map((brand, index) => (
          <div key={index} className="inline-flex gap-4 group items-center justify-center px-12">
            <Image alt={brand.name}   src={brand.icon} className=" size-[5.5rem] text-[#b0b0b0] group-hover:text-orange-400" />
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
