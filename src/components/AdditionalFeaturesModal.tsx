'use client';

import { Car } from '@/types/types';
import Image from 'next/image';
import React, { useState } from 'react';

interface ModalProps {
  car?: Car;
  onClose: () => void;
  pickupDate?: string | null; // ISO 8601 format
  dropOffDate?: string | null; // ISO 8601 format
}

const AdditionalFeaturesModal: React.FC<ModalProps> = ({ car, onClose, pickupDate, dropOffDate }) => {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<number, number>>({});

  const addOns = [
    { id: 1, name: "Additional Driver", description: "The person named on the booking must be present at the time of vehicle pick-up.", price: 15, perDay: false },
    { id: 2, name: "Buy the Full Tank", description: "Get a full tank and return empty.", price: 180, perDay: false },
    { id: 3, name: "Child Seat", description: "Safety seat for children.", price: 15, perDay: false },
    { id: 4, name: "Collection", description: "Mandatory charge if delivery is required @ Sharjah Airport, Al Marjan Island.", price: 75, perDay: false },
    { id: 5, name: "Collision Damage Waiver", description: "Covers external body damages @ 0 deductible excess. AED 45 per day.", price: 45, perDay: true },
    { id: 6, name: "Delivery", description: "Mandatory charge if delivery is required @ Sharjah Airport, Al Marjan Island.", price: 75, perDay: false },
    { id: 7, name: "Express Tolls", description: "Unlimited toll crossings for AED 25 per day.", price: 25, perDay: true },
    { id: 8, name: "GPS-Navigation", description: "Navigation system for your rental.", price: 5, perDay: true },
    { id: 9, name: "Personal Accidental Cover", description: "PAI covers medical costs & accidental death up to AED 200,000.", price: 25, perDay: true },
    { id: 10, name: "Premium Coverage", description: "Full coverage including interior & exterior damage @ 0 deductible excess. AED 95 per day.", price: 95, perDay: true },
  ];


  if (!car || !pickupDate || !dropOffDate) return null;

  const pickup = new Date(pickupDate);
  const dropOff = new Date(dropOffDate);
  const numberOfDays = Math.ceil((dropOff.getTime() - pickup.getTime()) / (1000 * 3600 * 24));
  const basePrice = car.price * numberOfDays;

  // Toggle Add-On Selection
  const toggleAddOn = (id: number) => {
    setSelectedAddOns((prev) => {
      const updated = { ...prev };
      updated[id] ? delete updated[id] : (updated[id] = 1);
      return updated;
    });
  };

  // Calculate Add-Ons Total
  const addOnsTotal = addOns.reduce((total, addOn) => {
    const quantity = selectedAddOns[addOn.id] || 0;
    return total + (quantity > 0 ? (addOn.perDay ? addOn.price * numberOfDays : addOn.price) * quantity : 0);
  }, 0);

  const finalTotal = basePrice + addOnsTotal;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-screen h-screen md:w-[90%] md:h-[90%] lg:w-[80%] lg:h-[80%] xl:w-[70%] xl:h-[70%] rounded-lg shadow-lg relative overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Car Image and Name */}
          <div className="flex flex-col items-center mb-8">
            <Image src={car.image} alt={car.name} width={300} height={200}  className="object-contain " />
            <h2 className="text-2xl font-bold mt-4">Book {car.name}</h2>
            <h2 className="text-xl font-semibold text-gray-600 mt-2">From AED {car.price} per day</h2>
          </div>

          {/* Add-ons Table */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Additional Features</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Item</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Per day?</th>
                  <th className="p-3">Select</th>
                </tr>
              </thead>
              <tbody>
                {addOns.map((addOn) => (
                  <tr key={addOn.id} className="border-b hover:bg-gray-50 transition-all duration-300">
                    <td className="p-3">
                      <div className="font-semibold">{addOn.name}</div>
                      <div className="text-sm text-gray-600">{addOn.description}</div>
                    </td>
                    <td className="p-3">AED {addOn.price}</td>
                    <td className="p-3">{addOn.perDay ? "Yes" : "No"}</td>
                    <td className="p-3">
                      <input type="checkbox" checked={!!selectedAddOns[addOn.id]} onChange={() => toggleAddOn(addOn.id)} className="w-5 h-5 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Price Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-lg">Base Price ({numberOfDays} days):</span>
                <span className="text-lg font-semibold">AED {basePrice}</span>
              </div>
              {addOns
                .filter((addOn) => selectedAddOns[addOn.id])
                .map((addOn) => (
                  <div key={addOn.id} className="flex justify-between">
                    <span className="text-lg">{addOn.name} ({addOn.perDay ? `${numberOfDays} days` : "1 time"}):</span>
                    <span className="text-lg font-semibold">AED {addOn.perDay ? addOn.price * numberOfDays : addOn.price}</span>
                  </div>
                ))}
              <div className="flex justify-between border-t pt-3">
                <span className="text-xl font-bold">Total Price:</span>
                <span className="text-xl font-bold">AED {finalTotal}</span>
              </div>
            </div>
          </div>

          {/* Pay Now Button */}
          <div className="flex justify-end ">
            <button onClick={() => alert(`Total Amount: AED ${finalTotal}`)} className="bg-green-600 text-white px-16  py-3 rounded-sm text-xl font-medium hover:bg-green-600 transition-all duration-300">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeaturesModal;
