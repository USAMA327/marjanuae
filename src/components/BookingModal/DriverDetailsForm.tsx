import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

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
  rentalPolicy: Yup.boolean().oneOf(
    [true],
    "You must accept the Rental Policy"
  ),
});

const DriverDetailsForm: React.FC<DriverDetailsFormProps> = ({
  onSubmit,
  prevStep,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      displayName: user?.displayName || "",
      contactNumber: "",
      email: user?.email || "",
      nationality: "",
      driverAgeAbove22: false,
      termsAndConditions: false,
      rentalPolicy: false,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          formik.setValues({
            displayName: userData.displayName || user.displayName,
            contactNumber: userData.phone || "",
            email: userData.email || user.email,
            nationality: userData.nationality || "",
            driverAgeAbove22: userData.driverAgeAbove22 || false,
            termsAndConditions: userData.termsAndConditions || false,
            rentalPolicy: userData.rentalPolicy || false,
          });
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user?.uid]);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          {loading ? (
            <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <input
              type="text"
              name="displayName"
              placeholder="Enter Full Name"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          )}
        </div>

        {/* Contact Number */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Contact Number
          </label>
          {loading ? (
            <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <PhoneInput
              inputClassName="w-full pl-10 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              name="contactNumber"
              defaultCountry="ae"
              value={formik.values.contactNumber}
              onChange={(phone) => formik.setFieldValue("contactNumber", phone)}
              onBlur={formik.handleBlur}
            />
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          {loading ? (
            <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <input
              disabled
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-100"
            />
          )}
        </div>

        {/* Nationality */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Nationality
          </label>
          {loading ? (
            <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <input
              type="text"
              name="nationality"
              placeholder="Enter Nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          )}
        </div>

        {/* Driver's Age Above 22 */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            {loading ? (
              <div className="w-48 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="driverAgeAbove22"
                  checked={formik.values.driverAgeAbove22}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Driver's age is above 22 years
                </span>
              </>
            )}
          </label>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            {loading ? (
              <div className="w-48 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="termsAndConditions"
                  checked={formik.values.termsAndConditions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I accept the{" "}
                  <a
                    href="/refund-returns"
                    target="_blank"
                    className="text-secondary cursor-pointer font-semibold"
                  >
                    Terms & Conditions
                  </a>
                </span>
              </>
            )}
          </label>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3">
            {loading ? (
              <div className="w-48 h-6 bg-gray-300 animate-pulse rounded-md"></div>
            ) : (
              <>
                <input
                  type="checkbox"
                  name="rentalPolicy"
                  checked={formik.values.rentalPolicy}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I accept the{" "}
                  <a
                    href="/refund-returns"
                    target="_blank"
                    className="text-secondary cursor-pointer font-semibold"
                  >
                    Rental Policy
                  </a>
                </span>
              </>
            )}
          </label>
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
          disabled={!formik.isValid || loading}
          className={`${
            formik.isValid && !loading ? "bg-green-600" : "bg-gray-400"
          } text-white px-8 py-2 rounded-sm text-lg font-medium transition-all duration-300`}
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default DriverDetailsForm;
