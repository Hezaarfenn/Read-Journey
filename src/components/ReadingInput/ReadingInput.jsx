import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startReading, finishReading } from "../../redux/books/booksOps";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  setCurrentSession,
  addSession,
  updateSession,
  setIsRecording,
  setViewMode,
  setShowCompletionModal,
  removeSession,
} from "../../redux/books/booksSlice";
import { ReadingInputSchema } from "../../validation/validationSchema";
import { toast } from "react-toastify";

const ReadingInput = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentSession,
    sessionsByBookId = {},
    bookDetails,
  } = useSelector((state) => state.books);

  const sessions = sessionsByBookId[id] || [];
  const totalPages = bookDetails?.totalPages || 0;

  const lastSession = sessions
    .filter((s) => !s.isActive)
    .sort((a, b) => new Date(b.endTime) - new Date(a.endTime))[0];

  const lastPageRead = lastSession?.endPage || 0;

  const isBookCompleted = totalPages > 0 && lastPageRead >= totalPages;

  const handleStartReading = (
    values,
    { setSubmitting, setFieldError, resetForm },
  ) => {
    const startPageNum = Number(values.page);

    if (startPageNum <= lastPageRead) {
      setFieldError(
        "page",
        `Please enter a page number greater than ${lastPageRead}`,
      );
      setSubmitting(false);
      return;
    }

    const newSession = {
      id: Date.now(),
      startPage: startPageNum,
      startTime: new Date().toISOString(),
      isActive: true,
      isLoading: true,
    };

    dispatch(setCurrentSession(newSession));
    dispatch(addSession(newSession));
    dispatch(setIsRecording(true));

    if (sessions.length === 0) {
      dispatch(setViewMode("diary"));
    }

    dispatch(startReading({ bookId: id, page: startPageNum }))
      .unwrap()
      .then(() => {
        toast.success("Reading started!");
        const updatedSession = { ...newSession, isLoading: false };
        dispatch(updateSession(updatedSession));
        dispatch(setCurrentSession(updatedSession));
        resetForm();
      })
      .catch(() => {
        setFieldError("page", "Something went wrong. Try again.");
        dispatch(removeSession(newSession.id));
        dispatch(setCurrentSession(null));
        dispatch(setIsRecording(false));

        if (sessions.length === 1) {
          dispatch(setViewMode("progress"));
        }
      })
      .finally(() => setSubmitting(false));
  };

  const handleStopReading = (
    values,
    { setSubmitting, setFieldError, resetForm },
  ) => {
    const stopPageNum = Number(values.page);

    if (!currentSession) return;

    if (stopPageNum <= currentSession.startPage) {
      setFieldError(
        "page",
        `Stop page must be greater than start page (${currentSession.startPage})`,
      );
      setSubmitting(false);
      return;
    }

    const endTime = new Date();
    const duration = Math.round(
      (new Date(endTime) - new Date(currentSession.startTime)) / 1000 / 60,
    );

    const pagesRead = stopPageNum - currentSession.startPage + 1;
    const pagesPerHour = Math.round((pagesRead / duration) * 60);

    dispatch(finishReading({ bookId: id, page: stopPageNum }))
      .unwrap()
      .then(() => {
        toast.success("Reading stopped!");

        const updatedSession = {
          ...currentSession,
          endPage: stopPageNum,
          endTime: endTime.toISOString(),
          duration,
          pagesRead, // Bu oturumda okunan sayfa sayısı
          pagesPerHour,
          isActive: false,
          isLoading: false,
        };

        dispatch(updateSession(updatedSession));
        dispatch(setCurrentSession(null));
        dispatch(setIsRecording(false));

        if (stopPageNum >= totalPages) {
          dispatch(setShowCompletionModal(true));
        }
        resetForm();
      })
      .catch(() => {
        setFieldError("page", "Something went wrong. Try again.");
      })
      .finally(() => setSubmitting(false));
  };

  if (isBookCompleted) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-green-500">
              <use href="/sprite.svg#icon-check-circle" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#F9F9F9] mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-sm text-[#686868]">
            You have completed this book!
          </p>
        </div>
      </div>
    );
  }

  if (!currentSession?.isActive) {
    //Start Reading
    return (
      <div>
        <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
          Start page:
        </p>

        <div className="flex flex-1/3 flex-col gap-2 mt-2">
          <Formik
            initialValues={{ page: "" }}
            validationSchema={ReadingInputSchema}
            onSubmit={handleStartReading}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col">
                <Field
                  name="page"
                  type="text"
                  placeholder="Page number:"
                  className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868] hover:border-[#F9F9F9]/10 focus:outline-none"
                />
                <ErrorMessage
                  name="page"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mb-8 w-[114px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer"
                >
                  To start
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }

  //Stop Reading
  return (
    <div>
      <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">Stop page:</p>

      <div className="flex flex-1/3 flex-col gap-2 mt-2">
        <Formik
          initialValues={{ page: "" }}
          validationSchema={ReadingInputSchema}
          onSubmit={handleStopReading}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col">
              <Field
                name="page"
                type="text"
                placeholder="Page number:"
                className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868] hover:border-[#F9F9F9]/10 focus:outline-none"
              />
              <ErrorMessage
                name="page"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[114px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer"
              >
                To stop
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ReadingInput;
