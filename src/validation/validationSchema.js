import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "At least 2 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password must be at least 6 characters")
    .min(6, "At least 6 characters"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password must be at least 6 characters")
    .min(6, "At least 6 characters"),
});

export const appointmentSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "At least 2 characters"),
  phone: Yup.string().required("Phone is required"),
  meetingTime: Yup.string()
    .notOneOf(["00:00"], "Meeting time is required")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  comment: Yup.string()
    .required("Comment is required")
    .max(500, "Comment cannot exceed 500 characters"),
});
