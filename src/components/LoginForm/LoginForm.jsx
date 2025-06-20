import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../validation/validationSchema";
import { loginUser } from "../../redux/auth/authOps";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/recommended");
    }
  }, [isLoggedIn, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login successful!");
    } else {
      const errorPayload = resultAction.payload;

      if (errorPayload?.code === "auth/invalid-credential") {
        toast.error(
          "Invalid email or password. Please check your credentials.",
        );
      } else if (errorPayload?.code === "auth/user-not-found") {
        toast.error("User not found. Please check your email.");
      } else if (errorPayload?.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (errorPayload?.code === "auth/too-many-requests") {
        toast.error("Too many failed attempts. Please try again later.");
      } else {
        toast.error(
          errorPayload?.message ||
            "An unexpected error occurred. Please try again.",
        );
      }
    }
    setSubmitting(false);
  };

  return (
    <section className="py-8 px-16 w-full max-w-[600px] h-[736px] border rounded-[30px] border-transparent bg-[#1F1F1F] flex flex-col">
      <div>
        <p className="text-lg font-bold">READ JOURNEY</p>
      </div>
      <p className="mt-[107px] text-[64px]/[60px] tracking-[0.02em] font-bold ">
        Expand your mind, reading{" "}
        <span className="text-[#E3E3E3]/50">a book</span>
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleLoginSubmit}
      >
        <Form>
          <div className="relative mt-10">
            <label
              htmlFor="email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#E3E3E3]/50 pointer-events-none"
            >
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full pl-[60px] pr-4 py-2 rounded-xl bg-[#262626] text-[#F9F9F9] border border-transparent hover:border-[#F9F9F9]/10 focus:outline-none"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-xs mt-2 ml-3.5"
          />

          <div className="relative mt-3.5">
            <label
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#E3E3E3]/50 pointer-events-none"
            >
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full pl-[90px] pr-4 py-2 rounded-xl bg-[#262626] text-[#F9F9F9] border border-transparent hover:border-[#F9F9F9]/10 focus:outline-none"
            />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="border-[#E90516] text-[#E90516] text-xs mt-2 ml-3.5"
          />

          <div className="flex items-center mt-[146px] gap-5">
            <button
              type="submit"
              disabled={isLoading}
              className="w-[225px] h-[52px] border hover:border-[#F9F9F9]/20 hover:bg-transparent hover:text-[#F9F9F9] rounded-[30px] bg-[#F9F9F9] text-[#1F1F1F] text-xl/tight font-bold tracking-[0.02em] cursor-pointer"
            >
              Login
            </button>
            <a
              href="/register"
              className="text-[#686868] hover:text-[#F9F9F9] underline font-medium text-sm cursor-pointer"
            >
              Don’t have an account?
            </a>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default LoginForm;
