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

export const readingInputSchema = Yup.object({
  page: Yup.number()
    .required("Page number is required")
    .min(1, "Page must be > 0"),
});

export const recommendedFilterSchema = Yup.object({
  title: Yup.string().trim(),
  author: Yup.string().trim(),
});

export const addBookSchema = Yup.object({
  title: Yup.string()
    .required("Book title is required")
    .min(1, "Title cannot be empty")
    .trim(),
  author: Yup.string()
    .required("Author is required")
    .min(1, "Author cannot be empty")
    .trim(),
  totalPages: Yup.number()
    .required("Number of pages is required")
    .positive("Number of pages must be positive")
    .integer("Number of pages must be a whole number")
    .min(1, "Book must have at least 1 page"),
});
