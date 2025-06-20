import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "At least 2 characters"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please do not use special characters. Only letters, numbers, and underscores are allowed.",
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 7 characters"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please do not use special characters. Only letters, numbers, and underscores are allowed.",
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 7 characters"),
});
