import React from "react";
import { useFormik } from "formik";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";

interface DriverDetailsFormProps {
  onSubmit: (values: any) => void;
  prevStep: () => void;
}

const validationSchema = Yup.object({
  displayName: Yup.string().required("First Name is required"),
  contactNumber: Yup.string().required("Contact Number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  nationality: Yup.string().required("Nationality is required"),
  driverAgeAbove22: Yup.boolean().oneOf(
    [true],
    "Driver's age must be above 22 years"
  ),
  termsAndConditions: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const DriverDetailsForm: React.FC<DriverDetailsFormProps> = ({
  onSubmit,
  prevStep,
}) => {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      displayName: user?.displayName ? user.displayName : "",
      contactNumber: user?.phoneNumber ? user.phoneNumber : "",
      email: user?.email ? user.email : "",
      nationality: "",
      driverAgeAbove22: false,
      termsAndConditions: false,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="displayName"
              placeholder="Enter Full Name"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4  py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          {formik.touched.displayName && formik.errors.displayName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.displayName}
            </div>
          ) : null}
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <div className="relative">
            <PhoneInput
              inputClassName="w-full pl-10  py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              name="contactNumber"
              defaultCountry="ae"
              value={formik.values.contactNumber}
              onChange={(phone) => formik.setFieldValue("contactNumber", phone)}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.contactNumber && formik.errors.contactNumber ? (
            <div className="text-red-500 text-sm">
              {formik.errors.contactNumber}
            </div>
          ) : null}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <input
              disabled
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-100"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nationality
          </label>

          <input
            type="text"
            name="nationality"
            placeholder="Enter Nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4  py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          {formik.touched.nationality && formik.errors.nationality ? (
            <div className="text-red-500 text-sm">
              {formik.errors.nationality}
            </div>
          ) : null}
        </div>

        {/* Driver's Age Above 22 */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="driverAgeAbove22"
              checked={formik.values.driverAgeAbove22}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Drivers age is above 22 years
            </span>
          </label>
          {formik.touched.driverAgeAbove22 && formik.errors.driverAgeAbove22 ? (
            <div className="text-red-500 text-sm">
              {formik.errors.driverAgeAbove22}
            </div>
          ) : null}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="termsAndConditions"
              checked={formik.values.termsAndConditions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I accept the terms and conditions
            </span>
          </label>
          {formik.touched.termsAndConditions &&
          formik.errors.termsAndConditions ? (
            <div className="text-red-500 text-sm">
              {formik.errors.termsAndConditions}
            </div>
          ) : null}
        </div>
      </div>

      {/* Submit Button */}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="bg-gray-600 text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!formik.isValid}
          className={`${
            formik.isValid ? "bg-green-600" : "bg-gray-400"
          } text-white px-8 py-2 rounded-sm text-lg font-medium ${
            formik.isValid ? "bg-green-700" : "bg-gray-500"
          } transition-all duration-300`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default DriverDetailsForm;
