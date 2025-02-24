import React from "react";
import Cars from "../data/cars.json";
import { Car } from "@/types/types";
import CarCard from "./CarCard";
import Link from "next/link";


// Component: Best Services Section
const BestServices: React.FC = () => {
  return (
    <section className="text-black bg-blend-soft-light pb-32 flex flex-col items-center justify-center">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h4 className="text-lg font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4 inline-block">
          BEST SERVICES
        </h4>
        <h2 className="text-3xl font-bold text-[#323234]">
          Explore Our Top Deal From <br /> Top-Rated Dealer
        </h2>
      </div>

      {/* Display Filtered Deals */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-10">
        {Cars?.filter((car: Car) => car.isTop).map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
      <Link href={"/fleet"}>
      <button className="mt-10 px-10  bg-white text-primary hover:text-white border-2 border-primary py-3 rounded-sm hover:bg-secondary transition-colors duration-300">
         Explore All 
        </button>
      </Link>
    </section>
  );
};





export default BestServices;
