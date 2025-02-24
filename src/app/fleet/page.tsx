'use client';
import React, { useState } from 'react';
import Cars from '../../data/cars.json';
import Brands from '../../data/brand.json';
import CarCard from '@/components/CarCard';

function Fleet() {
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

  // Function to update selected brand
  const handleBrandClick = (brand: number | null) => {
    setSelectedBrand(brand);
  };

  // Filter deals based on selected brand
  const filteredDeals = selectedBrand
    ? Cars.filter((item) => item.brand_id === selectedBrand)
    : Cars;

  return (
    <section className="text-black bg-blend-soft-light py-32 ">
   
      {/* Car Brands Filter */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-12 max-w-4xl mx-auto">
        <div
          onClick={() => handleBrandClick(null)}
          className={`flex items-center justify-center gap-2 w-32 h-12 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
            selectedBrand === null
              ? 'bg-primary text-white shadow-lg'
              : 'bg-gray-100 hover:bg-primary hover:text-white hover:shadow-lg'
          }`}
        >
          <span className="text-sm font-medium">All</span>
        </div>
        {Brands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => handleBrandClick(brand.id)}
            className={`flex items-center justify-center gap-2 w-32 h-12 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
              selectedBrand === brand.id
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 hover:bg-primary hover:text-white hover:shadow-lg'
            }`}
          >
            <i className={`${brand.icon} size-6`} />
            <span className="text-sm font-medium">{brand.name}</span>
          </div>
        ))}
      </div>

      {/* Display Filtered Deals */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-20 gap-6  ">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((car, index) => (
            <CarCard key={index} car={car} />
          ))
        ) : null}
      </div>
    </section>
  );
}

export default Fleet;