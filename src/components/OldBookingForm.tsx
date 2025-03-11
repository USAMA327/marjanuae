"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locations = [
  "Ras Al Khaimah City Office",
  "Ras Al Khaimah-Airport",
  "Ras Al Khaimah-Al Marjan Island",
];

const OldBookingForm = () => {
  const router = useRouter();
  const [isDifferentReturn, setIsDifferentReturn] = useState(false);

  const formik = useFormik({
    initialValues: {
      location: "",
      dropOffLocation: "",
      pickupDate: undefined as Date | undefined,
      pickupTime: undefined as Date | undefined,
      dropOffDate: undefined as Date | undefined,
      dropOffTime: undefined as Date | undefined,
    },
    validationSchema: Yup.object({
      location: Yup.string().required("Required"),
      pickupDate: Yup.date().required("Required"),
      pickupTime: Yup.date().required("Required"),
      dropOffDate: Yup.date()
        .required("Required")
        .test(
          "is-after-pickup",
          "Return must be after pickup",
          function (value) {
            return value && this.parent.pickupDate
              ? value > this.parent.pickupDate
              : true;
          }
        ),
      dropOffTime: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      const queryParams = new URLSearchParams({
        location: values.location,
        dropOffLocation: isDifferentReturn
          ? values.dropOffLocation
          : values.location,
        pickupDate: values.pickupDate?.toISOString() || "",
        pickupTime: values.pickupTime?.toISOString() || "",
        dropOffDate: values.dropOffDate?.toISOString() || "",
        dropOffTime: values.dropOffTime?.toISOString() || "",
      });

      router.push(`/fleet?${queryParams.toString()}`);
    },
  });

  return (
    <>
      {/* For lg Screen's */}
      <div className="bg-white shadow-lg rounded-lg p-6     hidden lg:flex lg:bg-blend-saturation lg:justify-between lg:items-center gap-4   ">
        {/* Location Section */}
        <div className="flex flex-col md:flex-row gap-4 w-full items-end ">
          {/* Pickup Location */}
          <div className="flex-1">
            <label className="block text-sm font-semibold  mb-1">
              Pick-up Location
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              {...formik.getFieldProps("location")}
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Return Location Dropdown */}
          {isDifferentReturn ? (
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Return Location
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                {...formik.getFieldProps("dropOffLocation")}
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <button
              className="p-3  text-sm font-semibold text-primary  rounded-lg w-full md:w-auto  "
              onClick={() => setIsDifferentReturn(!isDifferentReturn)}
            >
              + Add Different Return Location
            </button>
          )}
        </div>

        {/* Date and Time Section */}
        <div className="flex flex-col md:flex-row gap-4 w-full items-end">
          {/* Pickup Date & Time */}
          <div className="flex-1">
            <label className="text-sm font-semibold ">Pickup Date</label>
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden">
              <DatePicker
                selected={formik.values.pickupDate}
                onChange={(date) => formik.setFieldValue("pickupDate", date)}
                dateFormat="dd. MMM"
                className="w-full p-3 focus:outline-none"
                placeholderText="Date"
                minDate={new Date()}
              />
              <DatePicker
                selected={formik.values.pickupTime}
                onChange={(time) => formik.setFieldValue("pickupTime", time)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="hh:mm aa"
                timeIntervals={30}
                dateFormat="hh:mm aa"
                className="w-full p-3 border-l border-gray-300 focus:outline-none"
                placeholderText="Time"
              />
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="flex-1">
            <label className="text-sm font-semibold">Return Date</label>
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden">
              <DatePicker
                selected={formik.values.dropOffDate}
                onChange={(date) => formik.setFieldValue("dropOffDate", date)}
                dateFormat="dd. MMM"
                className="w-full p-3 focus:outline-none"
                placeholderText="Date"
                minDate={new Date()}
              />
              <DatePicker
                selected={formik.values.dropOffTime}
                onChange={(time) => formik.setFieldValue("dropOffTime", time)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="hh:mm aa"
                timeIntervals={30}
                dateFormat="hh:mm aa"
                className="w-full p-3 border-l border-gray-300 focus:outline-none"
                placeholderText="Time"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="mb-[0.1rem] bg-red-500 hover:bg-red-600 p-3  text-white rounded-lg  transition duration-300 w-full md:w-auto "
            onClick={formik.handleSubmit as any}
          >
            Show cars
          </button>
        </div>
      </div>

      {/* For md/sm Screen's */}
      <div className="bg-white mt-6 sm:mt-40 shadow-lg flex-col rounded-lg p-6 flex md:hidden">
        {/* Location Section */}
        <div className="flex flex-col gap-4">
          {/* Pickup Location */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Pick-up Location
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              {...formik.getFieldProps("location")}
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Return Location Dropdown */}
          {isDifferentReturn ? (
            <div>
              <label className="block text-sm font-semibold mb-1">
                Return Location
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                {...formik.getFieldProps("dropOffLocation")}
              >
                <option value="">Select location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <button
              className="p-3 text-sm font-semibold text-primary rounded-lg w-full"
              onClick={() => setIsDifferentReturn(!isDifferentReturn)}
            >
              + Add Different Return Location
            </button>
          )}
        </div>

        {/* Date and Time Section */}
        <div className="flex flex-col gap-4">
          {/* Pickup Date & Time */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm font-semibold">Pickup Date</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden flex">
                <DatePicker
                  selected={formik.values.pickupDate}
                  onChange={(date) => formik.setFieldValue("pickupDate", date)}
                  dateFormat="dd. MMM"
                  className="w-full p-3 focus:outline-none"
                  placeholderText="Date"
                  minDate={new Date()}
                />
                <DatePicker
                  selected={formik.values.pickupTime}
                  onChange={(time) => formik.setFieldValue("pickupTime", time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  dateFormat="hh:mm aa"
                  className="w-full p-3 border-l border-gray-300 focus:outline-none"
                  placeholderText="Time"
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="text-sm font-semibold">Return Date</label>
              <div className="border border-gray-300 rounded-lg overflow-hidden flex">
                <DatePicker
                  selected={formik.values.dropOffDate}
                  onChange={(date) => formik.setFieldValue("dropOffDate", date)}
                  dateFormat="dd. MMM"
                  className="w-full p-3 focus:outline-none"
                  placeholderText="Date"
                  minDate={new Date()}
                />
                <DatePicker
                  selected={formik.values.dropOffTime}
                  onChange={(time) => formik.setFieldValue("dropOffTime", time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  dateFormat="hh:mm aa"
                  className="w-full p-3 border-l border-gray-300 focus:outline-none"
                  placeholderText="Time"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-red-500 p-3 text-white rounded-lg hover:bg-red-600 transition duration-300 w-full"
          onClick={formik.handleSubmit as any}
        >
          Show cars
        </button>
      </div>
    </>
  );
};

export default OldBookingForm;
