"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-dropdown-select";

export default function BookingForm() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const locationOptions = [
    { label: "Dubai", value: "Dubai" },
    { label: "New York", value: "New York" },
    { label: "London", value: "London" },
  ];

  const formik = useFormik({
    initialValues: {
      location: "",
      pickupDate: today,
      dropOffDate: tomorrow,
    },
    validationSchema: Yup.object({
      location: Yup.string().required("Location is required"),
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
      console.log("Form Submitted", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-white mt-32 lg:mt-0 p-5 flex flex-col md:flex-row items-center justify-between gap-4 rounded-sm shadow-lg">
        {/* Location Input with react-dropdown-select */}
        <div className="w-full flex gap-3 border-r-2 items-center md:w-1/4">
          <span className="icon-[proicons--location] size-10 text-[#747474]"></span>
          <div className="w-1/2">
            <h3 className="font-semibold text-lg sm:text-xl">Location</h3>
            <Select
              searchable={false}
              dropdownHandle={false}
              style={{
                border: 0,
                height: "8px",
            
              }}
          
              dropdownPosition="top"
              options={locationOptions}
              values={locationOptions.filter(
                (option) => option.value === formik.values.location
              )}
              onChange={(values) =>
                formik.setFieldValue("location", values[0]?.value || "")
              }
              placeholder="Select a location"
              className="w-full cursor-pointer -ml-1  "
            />
            {formik.touched.location && formik.errors.location && (
              <p className="text-red-500 text-sm">{formik.errors.location}</p>
            )}
          </div>
        </div>

        {/* Pickup Date Input */}
        <div className="w-full border-r-2 flex gap-3 items-center md:w-1/4">
          <span className="icon-[ph--calendar-dots-light] size-10 text-[#747474]"></span>
          <div>
            <h3 className="font-semibold text-lg sm:text-xl">Pickup Date</h3>
            <DatePicker
              placeholderText="Select a date"
              className="w-full cursor-pointer"
              selected={formik.values.pickupDate}
              onChange={(date) => formik.setFieldValue("pickupDate", date)}
              onBlur={formik.handleBlur("pickupDate")}
              popperPlacement="top"
            />
            {formik.touched.pickupDate && formik.errors.pickupDate && (
              <p className="text-red-500 text-sm">
                {String(formik.errors.pickupDate)}
              </p>
            )}
          </div>
        </div>

        {/* Drop-off Date Input */}
        <div className="w-full flex gap-3 items-center md:w-1/4">
          <span className="icon-[ph--calendar-dots-light] size-10 text-[#747474]"></span>
          <div>
            <h3 className="font-semibold text-lg sm:text-xl">Return Date</h3>
            <DatePicker
              placeholderText="Select a date"
              className="w-full cursor-pointer"
              selected={formik.values.dropOffDate}
              onChange={(date) => formik.setFieldValue("dropOffDate", date)}
              onBlur={formik.handleBlur("dropOffDate")}
              minDate={formik.values.pickupDate || new Date()}
              popperPlacement="top"
            />
            {formik.touched.dropOffDate && formik.errors.dropOffDate && (
              <p className="text-red-500 text-sm">
                {String(formik.errors.dropOffDate)}
              </p>
            )}
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
