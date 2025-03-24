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


const getMinTime = (selectedDate: Date | undefined) => {
  const now = new Date();
  if (!selectedDate || selectedDate.toDateString() !== now.toDateString()) {
    // If the selected date is not today, set min time to 9:00 AM
    const minTime = new Date();
    minTime.setHours(9, 0, 0);
    return minTime;
  }
  // If the selected date is today, set min time to one hour from now
  const minTime = new Date();
  minTime.setHours(now.getHours() + 1, now.getMinutes(), 0);

  // Ensure the min time is never before 9:00 AM
  const minAllowedTime = new Date();
  minAllowedTime.setHours(9, 0, 0);
  return minTime > minAllowedTime ? minTime : minAllowedTime;
};

const minTime = new Date();
minTime.setHours(9, 0, 0); // 9:00 AM

const maxTime = new Date();
maxTime.setHours(22, 0, 0); // 7:00 PM

const OldBookingForm = ({
  setValues,
  showFull = true,
  defaultValues,
  nextStep,
  title,
}: {
  setValues?: any;
  showFull?: boolean;
  defaultValues?: any;
  nextStep?: () => void;
  title?: string;
}) => {
  const router = useRouter();
  const [isDifferentReturn, setIsDifferentReturn] = useState(
    defaultValues?.dropoffLocation ? true : false
  );

  const formik = useFormik({
    initialValues: {
      location: defaultValues ? defaultValues.location : "",
      dropoffLocation: defaultValues ? defaultValues.dropoffLocation : "",
      pickupDate: defaultValues
        ? defaultValues.pickupDate
        : (undefined as Date | undefined),
      pickupTime: defaultValues
        ? defaultValues.pickupTime
        : (undefined as Date | undefined),
      dropoffDate: defaultValues
        ? defaultValues.dropoffDate
        : (undefined as Date | undefined),
      dropoffTime: defaultValues
        ? defaultValues.dropoffTime
        : (undefined as Date | undefined),
    },
    validationSchema: Yup.object({
      location: Yup.string().required("Required"),
      pickupDate: Yup.date().required("Required"),
      pickupTime: Yup.date().required("Required"),
      dropoffDate: Yup.date()
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
      dropoffTime: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      if (setValues) {
        setValues(values);
        if (nextStep) {
          nextStep();
        }
      } else {
        const queryParams = new URLSearchParams({
          location: values.location,
          dropoffLocation: isDifferentReturn
            ? values.dropoffLocation
            : values.location,
          pickupDate: values.pickupDate?.toISOString() || "",
          pickupTime: values.pickupTime?.toISOString() || "",
          dropoffDate: values.dropoffDate?.toISOString() || "",
          dropoffTime: values.dropoffTime?.toISOString() || "",
        });
        router.push(`/fleet?${queryParams.toString()}`);
      }
    },
  });

  return (
    <>
      {/* For lg Screen's */}
      {showFull && (
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
                  {...formik.getFieldProps("dropoffLocation")}
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
                  onChange={(date) => {
                    formik.setFieldValue("dropoffDate", undefined);
                    formik.setFieldValue("pickupDate", date);
                  }}
             
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
                  minTime={getMinTime(formik.values.pickupDate)}
                  maxTime={maxTime}
                />
              </div>
            </div>

            {/* Return Date & Time */}
            <div className="flex-1">
              <label className="text-sm font-semibold">Return Date</label>
              <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden">
                <DatePicker
                  selected={formik.values.dropoffDate}
                  onChange={(date) => formik.setFieldValue("dropoffDate", date)}
                  dateFormat="dd. MMM"
                  className="w-full p-3 focus:outline-none"
                  placeholderText="Date"
                  minDate={
                    new Date(
                      new Date(formik.values.pickupDate).setDate(
                        new Date(formik.values.pickupDate).getDate() + 1
                      )
                    )
                  }
                />
                <DatePicker
                  selected={formik.values.dropoffTime}
                  onChange={(time) => formik.setFieldValue("dropoffTime", time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="hh:mm aa"
                  timeIntervals={30}
                  dateFormat="hh:mm aa"
                  className="w-full p-3 border-l border-gray-300 focus:outline-none"
                  placeholderText="Time"
                  minTime={minTime}
                  maxTime={maxTime}
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
      )}

      {
        <div
          className={`bg-white ${
            !defaultValues ? "mt-6 sm:mt-40" : ""
          } shadow-lg flex-col rounded-lg p-6 flex md:${
            !showFull ? "block" : "hidden"
          }`}
        >
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
              <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">
                  Return Location
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  {...formik.getFieldProps("dropoffLocation")}
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
                    onChange={(date) => {
                      formik.setFieldValue("dropoffDate", undefined);
                      formik.setFieldValue("pickupDate", date);
                    }}
                    dateFormat="dd. MMM"
                    className="w-full p-3 focus:outline-none"
                    placeholderText="Date"
                    minDate={new Date()}
                  />
                  <DatePicker
                    selected={formik.values.pickupTime}
                    onChange={(time) =>
                      formik.setFieldValue("pickupTime", time)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="hh:mm aa"
                    timeIntervals={30}
                    dateFormat="hh:mm aa"
                    className="w-full p-3 border-l border-gray-300 focus:outline-none"
                    placeholderText="Time"
                    minTime={getMinTime(formik.values.pickupDate)}
                    maxTime={maxTime}
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
                    selected={formik.values.dropoffDate}
                    onChange={(date) =>
                      formik.setFieldValue("dropoffDate", date)
                    }
                    dateFormat="dd. MMM"
                    className="w-full p-3 focus:outline-none"
                    placeholderText="Date"
                    minDate={
                      new Date(
                        new Date(formik.values.pickupDate).setDate(
                          new Date(formik.values.pickupDate).getDate() + 1
                        )
                      )
                    }
                  />
                  <DatePicker
                    selected={formik.values.dropoffTime}
                    onChange={(time) =>
                      formik.setFieldValue("dropoffTime", time)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeFormat="hh:mm aa"
                    timeIntervals={30}
                    dateFormat="hh:mm aa"
                    className="w-full p-3 border-l border-gray-300 focus:outline-none"
                    placeholderText="Time"
                    filterTime={(time) => time.getHours() > 8}
                    minTime={minTime}
                    maxTime={maxTime}
                  />
                </div>
              </div>
            </div>
          </div>

          {!title ? (
            <button
              type="submit"
              className="mt-4 bg-red-500 p-3 text-white rounded-lg hover:bg-red-600 transition duration-300 w-full"
              onClick={formik.handleSubmit as any}
            >
              {"Show Cars"}
            </button>
          ) : (
            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 bg-primary p-3 text-white rounded-lg hover:bg-secondary transition duration-300 px-12"
                onClick={formik.handleSubmit as any}
              >
                {title || "Show Cars"}
              </button>
            </div>
          )}
        </div>
      }
    </>
  );
};

export default OldBookingForm;
