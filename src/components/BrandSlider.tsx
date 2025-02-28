import React from 'react';
import CarBrand from '../data/brand.json'
import { Icon } from "@iconify/react";

export default function BrandSlider() {

  return (
    <div className="bg-gray-100 py-4">
      {/* Slider Container */}
      <div className="flex overflow-hidden  whitespace-nowrap">
        {/* First Set of Logos with Names */}
        {CarBrand.map((brand, index) => (
          <div key={index} className="inline-flex   gap-2 items-center justify-center px-12">
            <Icon icon={brand.icon}  color='#b0b0b0' className='size-20'/>
            <span className="mt-2 text-2xl font-medium text-[#b0b0b0]">{brand.name}</span>
          </div>
        ))}
        {/* Duplicate Set for Infinite Effect */}
        {CarBrand.map((brand, index) => (
          <div key={index + CarBrand.length} className="inline-flex  items-center justify-center px-12">
            <span className={`${brand.icon} size-20 text-[#b0b0b0]`} />
            <span className="mt-2 text-2xl font-medium  text-[#b0b0b0]">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}