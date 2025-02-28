"use client"; // Mark this as a Client Component

import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation"; // Use Next.js navigation
import { BookingContext } from "@/context/BookingContext"; // Adjust the import path
import locations from "@/data/location.json"; // Adjust the import path
import CustomSelect from "@/components/CustomSelect"; // Adjust the import path

// Define the shape of the location options
interface LocationOption {
  value: string;
  label: string;
}

export default function BookingForm() {
  const { setBookingData } = useContext(BookingContext);
  const router = useRouter(); // Use Next.js router
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Map locations to options for the dropdown
  const locationOptions: LocationOption[] = locations.map((e) => ({
    value: e.name,
    label: e.name,
  }));

  // Formik setup with TypeScript
  const formik = useFormik({
    initialValues: {
      location: "",
      dropOffLocation: "",
      pickupDate: today,
      dropOffDate: tomorrow,
    },
    validationSchema: Yup.object({
      location: Yup.string().required("Location is required"),
      dropOffLocation: Yup.string().required("Drop-off location is required"),
      pickupDate: Yup.date().nullable().required("Pickup date is required"),
      dropOffDate: Yup.date()
        .nullable()
        .required("Drop-off date is required")
        .when("pickupDate", (pickupDate, schema) => {
          if (pickupDate && pickupDate instanceof Date) {
            return schema.min(
              new Date(pickupDate.getTime() + 24 * 60 * 60 * 1000),
              "Drop-off date must be at least one day after pickup"
            );
          }
          return schema;
        }),
    }),
    onSubmit: (values) => {
      setBookingData(values); // Save data to context
    // Construct query parameters
    const queryParams = new URLSearchParams({
      location: values.location,
      dropOffLocation: values.dropOffLocation,
      pickupDate: values.pickupDate.toISOString(),
      dropOffDate: values.dropOffDate.toISOString(),
    });
  
    // Navigate to the next page with query parameters
    router.push(`/fleet?${queryParams.toString()}`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div
        className={`${
          !formik.isValid ? "border-red-500 border" : ""
        } bg-white mt-32 lg:mt-0 p-5 flex flex-col lg:flex-row items-center justify-between gap-4 rounded-sm shadow-lg`}
      >
        {/* Location Input with CustomSelect */}
        <div className="w-full flex gap-3 lg:border-r-2 items-center md:w-1/4">
          <span className="icon-[proicons--location] size-10 text-[#747474]"></span>
          <div className="w-full">
            <h3 className="font-semibold text-lg sm:text-xl">Pick-up Location</h3>
            <CustomSelect
              options={locationOptions}
              selectedValue={formik.values.location}
              onSelect={(e: string) => formik.setFieldValue("location", e)}
              placeholder="Choose a pick-up location"
            />
          </div>
        </div>

        {/* Pickup Date Input */}
        <div className="w-full lg:border-r-2 flex gap-3 items-center md:w-1/4">
          <span className="icon-[ph--calendar-dots-light] size-10 text-[#747474]"></span>
          <div className="w-full">
            <h3 className="font-semibold text-lg sm:text-xl">Pickup Date</h3>
            <DatePicker
              placeholderText="Select a date"
              className="w-full py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              selected={formik.values.pickupDate}
              onChange={(date) => formik.setFieldValue("pickupDate", date)}
              onBlur={formik.handleBlur("pickupDate")}
              popperPlacement="top"
              wrapperClassName="w-[90%]"
            />
          </div>
        </div>

        {/* Drop-off Location Input with CustomSelect */}
        <div className="w-full flex gap-3 lg:border-r-2 items-center md:w-1/4">
          <span className="icon-[proicons--location] size-10 text-[#747474]"></span>
          <div className="w-full">
            <h3 className="font-semibold text-lg sm:text-xl">Drop-off Location</h3>
            <CustomSelect
              options={locationOptions}
              selectedValue={formik.values.dropOffLocation}
              onSelect={(e: string) => formik.setFieldValue("dropOffLocation", e)}
              placeholder="Choose a drop-off location"
            />
          </div>
        </div>

        {/* Drop-off Date Input */}
        <div className="w-full flex gap-3 items-center md:w-1/4">
          <span className="icon-[ph--calendar-dots-light] size-10 text-[#747474]"></span>
          <div className="w-full">
            <h3 className="font-semibold text-lg sm:text-xl">Drop-off Date</h3>
            <DatePicker
              placeholderText="Select a date"
              className="w-full py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              selected={formik.values.dropOffDate}
              onChange={(date) => formik.setFieldValue("dropOffDate", date)}
              onBlur={formik.handleBlur("dropOffDate")}
              minDate={new Date(formik.values.pickupDate.getTime() + 24 * 60 * 60 * 1000)}
              popperPlacement="top"
              wrapperClassName="w-[90%]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-primary py-3 px-12 rounded-md text-white hover:bg-secondary transition-colors"
        >
          <h4 className="text-lg sm:text-xl">Submit</h4>
        </button>
      </div>
    </form>
  );
}