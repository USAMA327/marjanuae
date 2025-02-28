import { Car } from '@/types/types';
import Image from 'next/image';
import React from 'react'
import BookNowButton from './BookNowButton';


// Component: Feature
const Feature: React.FC<{ icon: string; label: string }> = ({ icon, label }) => (
    <div className="flex justify-between">
      <p className="flex items-center gap-2">
        <i className={`icon-[${icon}] text-[16px] text-[#959595]`} />
        <span className="text-[16px]">{label}</span>
      </p>
    </div>
  );
  
  // Utility Function: Get Feature Icon
  const getFeatureIcon = (type: string): string => {
    return type === "Electric" ? "mdi--ev-station" : "mdi--gas-station";
  };

 const CarCard: React.FC<{ car: Car,onClick:()=>void }> = ({ car,onClick }) => {
    return (
      <div className="bg-white py-6 px-6 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Car Image */}
        <div className="relative w-full h-32">
          <Image src={car.image} alt={car.name} fill className="object-contain absolute z-20" />
          <span className={`absolute text-[#b0b0b0] text-3xl z-10 text-center ${getFeatureIcon(car.type)}`} />
        </div>
  
        {/* Car Name */}
        <h3 className="font-medium text-lg mt-4 mb-2">{car.name}</h3>
        <hr className="my-2" />
  
        {/* Features */}
        <div className="py-2 space-y-2">
          <Feature icon="mdi--account-group" label={`${car.passengers} Passenger`} />
          <Feature icon="mdi--car-shift-pattern" label={car.isAuto ? "Automatic" : "Manual"} />
          <Feature icon="mdi--snowflake" label={car.airConditioner ? "AC" : "No AC"} />
          <Feature icon="mdi--car-door" label={`${car.doors} Doors`} />
        </div>
  
        <hr className="my-2" />
  
        {/* Price */}
        <div className="flex justify-between items-center text-xl font-semibold mb-4">
          <h3 className="text-sm text-[#959595]">From</h3>
          <h3 className="text-lg font-serif">AED {car.price}</h3>
        </div>
  
        {/* Rent Button */}
        <BookNowButton onClick={onClick}/>
      </div>
    );
 };
  
 export default CarCard;