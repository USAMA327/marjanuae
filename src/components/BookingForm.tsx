"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import CustomSelect from "@/components/CustomSelect";
import bookingJson from "../data/bookingData.json";

export default function BookingForm() {
  const router = useRouter(); // Use Next.js router

  // State to track selected pickup location
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);

  // State to track selected filters
  const [filters, setFilters] = useState<{
    samePickupDropoff: boolean;
    freeOfCost: boolean;
  }>({
    samePickupDropoff: true,
    freeOfCost: false,
  });

  // Handle filter changes
  const handleFilterChange = (filter: keyof typeof filters) => {
    // Reset the selectedPickup and formik location value when filters change
    setSelectedPickup(null);
    formik.setFieldValue("location", "");

    // Toggle the filter
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  // Filter options based on selected pickup location and filters
  const filteredOptions = bookingJson.filter((option) => {
    const [pickup, dropoff] = option.value.split("|");

    // Apply pickup location filter
    if (selectedPickup && !option.value.startsWith(`${selectedPickup}|`)) {
      return false;
    }

    // Apply "Same Pickup and Dropoff" filter
    if (filters.samePickupDropoff && pickup !== dropoff) {
      return false;
    }

    // Apply "Free of Cost" filter
    if (filters.freeOfCost && option.price !== 0) {
      return false;
    }

    return true;
  });

  // Formik setup with TypeScript
  const formik = useFormik({
    initialValues: {
      location: "",
    },
    validationSchema: Yup.object({
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: (values) => {
      const queryParams = new URLSearchParams({
        location: values.location,
      });

      // Navigate to the next page with query parameters
      router.push(`/fleet?${queryParams.toString()}`);
    },
  });

  return (
    <div className="flex items-center justify-center mt-[13vw] lg:mt-0">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-7xl bg-white p-4 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl"
      >
        {/* Filter Options */}
        <div className="mb-2">
          <div className="flex  sm:flex-row gap-4">
            <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={filters.samePickupDropoff}
                onChange={() => handleFilterChange("samePickupDropoff")}
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Pickup & Dropoff</span>
            </label>
            {/* <label className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={filters.freeOfCost}
                onChange={() => handleFilterChange("freeOfCost")}
                className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">
                Free Pickup & Dropoff
              </span>
            </label> */}
          </div>
        </div>

        {/* Location Input with CustomSelect */}
        <div className="mb-3 flex flex-col md:flex-row gap-2 bg-gray-50  rounded-lg hover:bg-gray-100 transition-colors px-2">
          <div className="flex md:w-[90%]  gap-3 items-center ">
            <span className="icon-[proicons--location] size-10 text-[#747474]"></span>
            <div className="w-full">
              <CustomSelect
                isTop={false}
                options={filteredOptions}
                selectedValue={formik.values.location}
                onSelect={(e: string) => {
                  formik.setFieldValue("location", e);
                  const [pickup] = e.split("|");
                  setSelectedPickup(pickup);
                }}
                placeholder="Choose a pick-up location"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full md:w-[10%] py-3 my-2 bg-primary  rounded-md text-white font-semibold hover:bg-secondary transition-colors transform "
          >
            <h4 className="text-lg sm:text-xl">Submit</h4>
          </button>
        </div>
      </form>
    </div>
  );
}
