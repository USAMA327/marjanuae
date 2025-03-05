'use client';
import React, { useState, useEffect } from 'react';
import CarCard from '@/components/CarCard';
import CarBrand from '@/data/brand.json';
import { Icon } from "@iconify/react";
import { useSearchParams } from 'next/navigation';
import AdditionalFeaturesModal from '@/components/BookingModal/AdditionalFeaturesModal';
import { Car } from '@/types/types';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase/firebase';

function Fleet() {
  const searchParams = useSearchParams();
  const location = searchParams?.get('location');

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | undefined>(undefined);
  const [cars, setCars] = useState<Car[]>([]); // State to store cars from Firestore
  const [loading, setLoading] = useState(true); // State to manage loading

  // Fetch cars from Firestore
  useEffect(() => {
    const q = query(collection(db, "cars"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const carsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Car[]; // Explicitly cast to Car[]
      setCars(carsData);
      setLoading(false); // Set loading to false after data is fetched
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleBrandClick = (brand: string | null) => {
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

  // Filter cars based on selected brand
  const filteredDeals = selectedBrand
    ? cars.filter((car) => car.brand === selectedBrand)
    : cars;

  return (
    <section className="text-black bg-blend-soft-light py-32">
      {/* Brand Filter Section */}
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
        {CarBrand.map((brand) => (
          <div
            key={brand.id}
            onClick={() => handleBrandClick(brand.name)}
            className={`flex items-center group justify-center gap-2 w-32 h-12 px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ${
              selectedBrand === brand.name
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg'
            }`}
          >
            <Icon
              icon={brand.icon}
              className={`size-10 ${selectedBrand === brand.name ? "text-white" : "text-primary"}`}
            />
            <span className="text-sm font-medium">{brand.name}</span>
          </div>
        ))}
      </div>

      {/* Car Cards Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-6 lg:mx-20 gap-6">
        {loading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64"></div>
              <div className="mt-4 bg-gray-200 h-6 w-3/4 rounded"></div>
              <div className="mt-2 bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          ))
        ) : filteredDeals.length > 0 ? (
          // Show car cards after loading
          filteredDeals.map((car) => (
            <div key={car.id} className="flex flex-col">
              <CarCard car={car} onClick={() => openModal(car)} />
            </div>
          ))
        ) : (
          // Show message if no cars are found
          <p className="text-center col-span-full text-gray-500">No cars found.</p>
        )}
      </div>

      {/* Additional Features Modal */}
      {modalOpen && (
        <AdditionalFeaturesModal
          location={location}
          car={selectedCar}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

export default Fleet;