import * as Yup from "yup";
import { LoginFormValues, SignupFormValues } from "../types/types";

// Login form validation schema
export const loginValidationSchema = Yup.object<LoginFormValues>({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Signup form validation schema
export const signupValidationSchema = Yup.object<SignupFormValues>({
  displayName: Yup.string().min(3).required().label("Full Name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone:Yup.string().required().label("Phone Number"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});