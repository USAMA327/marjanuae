import { Car } from '@/types/types';
import Image from 'next/image';
import React, { ReactNode } from 'react'
import BookNowButton from './BookNowButton';
import { Icon } from '@iconify/react';


// Component: Feature
const Feature: React.FC<{ icon: ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex justify-between">
      <p className="flex items-center gap-2">
       {icon}
        <span className="text-[16px]">{label}</span>
      </p>
    </div>
  );
  


 const CarCard: React.FC<{ car: Car,onClick?:()=>void }> = ({ car,onClick }) => {
    return (
      <div className="bg-white py-6 px-6 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Car Image */}
        <div className="relative w-full h-32">
          <Image src={car.image} alt={car.name} fill className="object-contain absolute z-20" />
        </div>
  
        {/* Car Name */}
        <h3 className="font-medium text-lg mt-4 mb-2">{car.name}  <small className="text-slate-500 text-xs">| Similar</small></h3>
        <hr className="my-2" />
  
        {/* Features */}
        <div className="py-2 space-y-2">
          <Feature icon={<Icon icon="fluent:people-audience-24-regular"  className='size-5 text-primary' />} label={`${car.passengers} Passenger`} />
          <Feature icon={<Icon icon="game-icons:gear-stick-pattern" className='size-5 text-primary' />} label={car.isAuto ? "Automatic" : "Manual"} />
          <Feature icon={<Icon icon="ph:suitcase-light" className='size-5 text-primary' />} label={`${car.bags} Bags`} />
        </div>
  
        <hr className="my-2" />
  
        {/* Price */}
        <div className="flex justify-between items-center text-xl font-semibold mb-4">
          <h3 className="text-sm text-[#959595]">From</h3>
          <h3 className="text-lg font-serif">AED {car.price}</h3>
        </div>
  
        {/* Rent Button */}
        <BookNowButton  onClick={() => {
          if(onClick){
            onClick()
          }
        }}/>
      </div>
    );
 };
  
 export default CarCard;