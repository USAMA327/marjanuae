'use client';
import React, { useState } from 'react';
import Cars from '../../data/cars.json';
import CarCard from '@/components/CarCard';
import CarBrand from '@/data/brand.json';
import { Icon } from "@iconify/react";
import { useSearchParams } from 'next/navigation';
import AdditionalFeaturesModal from '@/components/AdditionalFeaturesModal';
import { Car } from '@/types/types';

function Fleet() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const dropOffLocation = searchParams.get('dropOffLocation');
  const pickupDate = searchParams.get('pickupDate');
  const dropOffDate = searchParams.get('dropOffDate');

  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car|undefined>(undefined);

  const handleBrandClick = (brand: number | null) => {
    setSelectedBrand(brand);
  };

  const openModal = (car: Car | undefined) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(undefined);
  };

  const filteredDeals = selectedBrand ? Cars.filter((item) => item.brand_id === selectedBrand) : Cars;

  return (
    <section className="text-black bg-blend-soft-light py-32">
      <div className="flex flex-wrap items-center justify-center gap-4 mt-12 max-w-4xl mx-auto">
        <div
          onClick={() => handleBrandClick(null)}
          className={`flex items-center justify-center gap-2 w-32 h-12 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
            selectedBrand === null ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 hover:bg-primary hover:text-white hover:shadow-lg'
          }`}
        >
          <span className="text-sm font-medium">All</span>
        </div>
        {CarBrand.map((brand) => (
          <div
            key={brand.id}
            onClick={() => handleBrandClick(brand.id)}
            className={`flex items-center group justify-center gap-2 w-32 h-12 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
              selectedBrand === brand.id ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg'
            }`}
          >
            <Icon icon={brand.icon} className={`size-10 ${selectedBrand === brand.id ? "text-white" : "text-primary"}`} />
            <span className="text-sm font-medium">{brand.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-6 lg:mx-20 gap-6">
        {filteredDeals.length > 0 && filteredDeals.map((car, index) => (
          <div key={index} className="flex flex-col">
            <CarCard car={car} onClick={() => openModal(car)} />
          </div>
        ))}
      </div>

      {modalOpen && <AdditionalFeaturesModal pickupDate={pickupDate} dropOffDate={dropOffDate}  car={selectedCar} onClose={closeModal} />}
    </section>
  );
}

export default Fleet;
