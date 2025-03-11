'use client';
import React, { useState, useEffect } from "react";
import { Car } from "@/types/types";
import CarCard from "./CarCard";
import Link from "next/link";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";

// Component: Best Services Section
const BestServices: React.FC = () => {
  const [loading, setLoading] = useState(true); // State to manage loading
  const [topCars, setTopCars] = useState<Car[]>([]); // State to store top cars

  // Function to listen for real-time updates on top cars
  useEffect(() => {
    const q = query(collection(db, "cars"), where("isTop", "==", true));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const topCars = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }) as Car); // Cast to Car type
      setTopCars(topCars);
      setLoading(false); // Set loading to false after data is fetched
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg h-64"></div>
      <div className="mt-4 bg-gray-200 h-6 w-3/4 rounded"></div>
      <div className="mt-2 bg-gray-200 h-4 w-1/2 rounded"></div>
    </div>
  );

  return (
    <section className="text-black bg-blend-soft-light pb-32 flex flex-col items-center justify-center">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h4 className="text-lg uppercase font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4 inline-block">
        Explore our new Models
        </h4>
        <h2 className="text-3xl font-bold text-[#323234]">
          Explore Our Top Deal From <br /> Top-Rated Dealer
        </h2>
      </div>

      {/* Display Filtered Deals */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-10">
        {loading
          ? // Show skeleton loaders while loading
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <SkeletonLoader />
              </div>
            ))
          : // Show actual car cards after loading
            topCars.map((car) => <CarCard key={car.id} car={car} />)}
      </div>

      {/* Explore All Button */}
      <Link href={"/fleet"}>
        <button className="mt-10 px-10 bg-white text-primary hover:text-white border-2 border-primary py-3 rounded-sm hover:bg-secondary transition-colors duration-300">
          Explore All
        </button>
      </Link>
    </section>
  );
};

export default BestServices;