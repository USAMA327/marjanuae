"use client";

import { useFormik } from "formik";
import { SignupFormValues, SignupProps } from "@/types/types";
import { signupValidationSchema } from "@/utils/validatioSchema";
import { signUpWithEmail } from "@/firebase/firebase";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
const Register = ({ onSwitchToLogin }: SignupProps) => {
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      displayName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      const user = await signUpWithEmail(
        values.email,
        values.password,
        values.displayName,
        values.phone
      );
      if (user) {
        console.log("Email/Password Sign-Up Success:", user);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all">
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <input
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={formik.values.displayName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {formik.touched.displayName && formik.errors.displayName ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.displayName}
              </div>
            ) : null}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Phone Field */}
          <div className="mb-4 ">
            <PhoneInput
         
             
    
  inputClassName="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              name="phone"
           
  defaultCountry="ua"
  value={formik.values.phone}
  onChange={(e)=>formik.setFieldValue("phone",e)} // Fix here
  onBlur={formik.handleBlur} // Ensure touch tracking
/>


          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.phone}
            </div>
            ) : null}
            </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-secondary transition duration-300 mb-4"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-primary hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
