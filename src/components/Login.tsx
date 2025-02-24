"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { LoginFormValues, LoginProps } from "@/types/types";
import { loginValidationSchema } from "@/utils/validatioSchema";
import { signInWithEmail, signInWithGoogle } from "@/firebase/firebase";

const Login = ({ onSwitchToSignup }: LoginProps) => {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const user = await signInWithEmail(values.email, values.password);
      if (user) {
        console.log("Email/Password Sign-In Success:", user);
      }
    },
  });

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Google Sign-In Success:", user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 w-full border border-red-600 text-red-600 py-2 px-4 rounded-md hover:bg-red-50 transition duration-300 mb-4"
        >
          <span className="icon-[logos--google-icon]"></span>
          <p>Sign in with Google</p>
        </button>

    
                  {/* OR Divider */}
        <div className="relative flex items-center my-6">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

              
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-secondary transition duration-300 mb-4"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <button   onClick={onSwitchToSignup} className="text-primary hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
