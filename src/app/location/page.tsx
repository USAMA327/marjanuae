import locations from "@/data/location.json";
import { OfficeLocation } from "@/types/types";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Car Rental Locations | AL Marjan Car Rental UAE",
  description:
    "Find AL Marjan Car Rental locations in Ras Al Khaimah, including Al Nakheel City, RAK International Airport, and Al Marjan Island. Rent luxury, economy, or SUVs with flexible pricing and excellent service in the UAE.",
  keywords: [
    "Car rental Ras Al Khaimah",
    "RAK car rental locations",
    "Rent a car near me",
    "Luxury car rental UAE",
    "SUV rental RAK",
    "Airport car rental Ras Al Khaimah",
    "Best car rental in Ras Al Khaimah",
  ],
  authors: [{ name: "AL MARJAN RENT CARS" }],
  openGraph: {
    title: "Locations | AL Marjan Car Rental UAE",
    description:
      "Explore AL Marjan Car Rental locations in Ras Al Khaimah. Get car rental services at Al Nakheel City, RAK International Airport, and Al Marjan Island with 24/7 availability and convenient booking.",
    type: "website",
    url: "https://marjanuae.com/location",
    images: [
      {
        url: "/locations/cityoffice.jpg",
        width: 1200,
        height: 630,
        alt: "AL Marjan Car Rental City Office Ras Al Khaimah",
      },
      {
        url: "/locations/airport.jpg",
        width: 1200,
        height: 630,
        alt: "AL Marjan Car Rental at RAK International Airport",
      },
      {
        url: "/locations/island.jpg",
        width: 1200,
        height: 630,
        alt: "AL Marjan Car Rental at Al Marjan Island",
      },
    ],
  },
};

const Location = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 mt-32 px-2">
      <div className="text-center mb-10">
        <h4 className="text-lg font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4 inline-block">
          OUR LOCATION
        </h4>

        <h2 className="text-3xl font-bold text-[#323234]">
          Explore Our Location
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((location: OfficeLocation, index: number) => (
          <div
            key={index}
            className="p-5 border border-gray-300 rounded-sm shadow-md bg-white"
          >
            <Image
              src={location.img}
              alt={location.name}
              width={400}
              height={250}
              className="w-full h-40 object-cover rounded-sm shadow-lg"
            />
            <h2 className="text-xl font-semibold mt-3 pb-1">{location.name}</h2>
            <hr className="py-1" />
            <a className="flex  cursor-pointer items-center gap-1 ">
              <span className="icon-[ph--clock-thin] size-5"></span>
              <p className="text-gray-600">{location.openingHours}</p>
            </a>
            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              className="flex mt-2 cursor-pointer  items-center gap-1 "
            >
              <span className="icon-[ph--map-pin-line-thin] size-5"></span>
              <p className="text-gray-600">{location.address}</p>
            </a>

            <a
              href={`tel:${location.phone}`}
              className="flex mt-2 cursor-pointer  items-center gap-1 "
            >
              <span className="icon-[ph--phone-light] text-gray-800 size-5"></span>
              <p className="text-gray-800 font-medium">{location.phone}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
