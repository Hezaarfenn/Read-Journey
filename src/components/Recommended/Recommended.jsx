import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  addRecommendedBook,
  fetchRecommendedBooks,
} from "../../redux/books/booksOps";
import { setAuthorFilter, setTitleFilter } from "../../redux/books/booksSlice";
import { recommendedFilterSchema } from "../../validation/validationSchema";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import BaseModal from "../BaseModal/BaseModal";

const Recommended = () => {
  const dispatch = useDispatch();
  const {
    recommended: books = [],
    isLoading,
    error,
    filter = { title: "", author: "" },
    pagination,
  } = useSelector((state) => state.books || {});

  const [selectedBook, setSelectedBook] = useState(null);
  const [addLibraryModalOpen, setAddLibraryModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchRecommendedBooks({
        page: currentPage,
        limit: 10,
        title: filter.title,
        author: filter.author,
      }),
    );
  }, [dispatch, currentPage, filter.title, filter.author]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const isAlreadyInLibrary = useSelector((state) =>
    state.books.ownBooks.some((b) => b.title === selectedBook?.title),
  );

  const handleFilterSubmit = (values) => {
    dispatch(setTitleFilter(values.title));
    dispatch(setAuthorFilter(values.author));
    setCurrentPage(1);
  };

  const handleAddBookToLibrary = () => {
    dispatch(addRecommendedBook(selectedBook._id));
    setSelectedBook(null);
    setAddLibraryModalOpen(true);

    setTimeout(() => {
      setAddLibraryModalOpen(false);
    }, 1000);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex gap-4 mt-2">
      {/* Left Sidebar */}
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Filter */}
        <Formik
          initialValues={{
            title: filter.title || "",
            author: filter.author || "",
          }}
          validationSchema={recommendedFilterSchema}
          onSubmit={handleFilterSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form>
              <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
                Filters:
              </p>
              <div className="flex flex-1/3 flex-col gap-2 mt-2">
                <div className="relative">
                  <label
                    htmlFor="title"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#E3E3E3]/50 pointer-events-none"
                  >
                    Book title:
                  </label>
                  <Field
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter text"
                    className={`pl-[85px] w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#F9F9F9] hover:border-[#F9F9F9]/10 focus:outline-none ${
                      errors.author && touched.author ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <div className="relative">
                  <label
                    htmlFor="author"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#E3E3E3]/50 pointer-events-none"
                  >
                    The author:
                  </label>
                  <Field
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Enter text"
                    className={`pl-[95px] w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#F9F9F9] hover:border-[#F9F9F9]/10 focus:outline-none ${
                      errors.author && touched.author ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="author"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-[122px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer hover:bg-[#F9F9F9] hover:text-[#1F1F1F]"
              >
                To apply
              </button>
            </Form>
          )}
        </Formik>

        {/* Workout */}
        <div className="w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-5">
          <h2 className="text-xl font-bold">Start your workout</h2>

          <ul className="flex flex-col gap-5 mt-10">
            <li className="flex gap-3 items-start">
              <span className="w-[44px] h-[44px] text-[#1F1F1F] border border-transparent rounded-full bg-[#F9F9F9] text-xl font-bold flex items-center justify-center">
                1
              </span>
              <p className="w-[197px] text-[#686868] text-[14px] font-medium">
                <span className="text-[#F9F9F9] font-medium text-[14px]">
                  Create a personal library:
                </span>{" "}
                add the books you intend to read to it.
              </p>
            </li>

            <li className="flex gap-3 items-start">
              <span className="w-[44px] h-[44px] text-[#1F1F1F] border border-transparent rounded-full bg-[#F9F9F9] text-xl font-bold flex items-center justify-center">
                2
              </span>
              <p className="w-[197px] text-[#686868] text-[14px] font-medium">
                <span className="text-[#F9F9F9] font-medium text-[14px]">
                  Create your first workout:
                </span>{" "}
                define a goal, choose a period, start training.
              </p>
            </li>
          </ul>

          <a
            href="/library"
            className="mt-[26px] flex justify-between text-[#686868] text-[14px] font-medium cursor-pointer underline hover:text-[#F9F9F9]/50"
          >
            <span>My library</span>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-log-in" />
            </svg>
          </a>
        </div>

        <div className="flex gap-3.5 items-center w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-5">
          <img src="/img/book.png" alt="Book" className="w-10 h-10" />
          <p className="text-[#686868] text-[14px] font-medium">
            "Books are <span className="text-[#F9F9F9]">windows</span> to the
            world, and reading is a journey into the unknown."
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-2 border rounded-[30px] border-transparent bg-[#1F1F1F] p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-[28px]/[32px] font-bold">Recomended</h1>
          <div className="flex items-center gap-2">
            {/* Left Arrow */}
            <button
              className={`w-7 h-7 flex border rounded-full mt-5 justify-center items-center ${
                currentPage === 1
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (currentPage > 1) setCurrentPage((prev) => prev - 1);
              }}
            >
              <svg
                width="20"
                height="20"
                className="cursor-pointer items-center justify-center flex text-center"
              >
                <use href="/sprite.svg#icon-chevron-left" />
              </svg>
            </button>
            <button
              className={`w-7 h-7 flex border rounded-full mt-5 justify-center items-center ${currentPage === pagination.totalPages ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                if (currentPage < pagination.totalPages)
                  setCurrentPage((prev) => prev + 1);
              }}
            >
              <svg
                width="20"
                height="20"
                className="cursor-pointer items-center justify-center flex text-center"
              >
                <use href="/sprite.svg#icon-chevron-right" />
              </svg>
            </button>
          </div>
        </div>

        <div className="text-sm text-[#686868] mt-2">
          Page {pagination.page} of {pagination.totalPages}
        </div>

        <ul className="flex flex-wrap gap-5 mt-7">
          {books.length > 0 ? (
            books.map((book) => (
              <li
                key={book._id}
                onClick={() => setSelectedBook(book)}
                className="flex flex-col gap-3 items-start cursor-pointer"
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-[137px] h-[208px] rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="w-[137px] flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#E3E3E3] font-bold text-[14px]">
                      {book.title}
                    </p>
                    <p className="text-[#686868] font-medium text-[10px]">
                      {book.author}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-[#686868] text-sm">No books found.</p>
          )}
        </ul>
      </div>

      {/* Modal */}
      {selectedBook && (
        <BaseModal isOpen={true} onRequestClose={() => setSelectedBook(null)}>
          <div className="flex flex-col items-center text-center">
            <img
              src={selectedBook.imageUrl}
              alt={selectedBook.title}
              className="w-[160px] h-[240px] rounded-md mb-4"
            />
            <h2 className="text-xl font-bold">{selectedBook.title}</h2>
            <p className="text-sm text-[#686868] mb-1">{selectedBook.author}</p>
            <p className="text-[10px]/[12px] font-medium text-[#F9F9F9]">
              {selectedBook.totalPages} pages
            </p>
            <button
              onClick={handleAddBookToLibrary}
              disabled={isAlreadyInLibrary}
              className={`mt-8 w-[162px] h-[46px] border rounded-[30px] ${
                isAlreadyInLibrary ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isAlreadyInLibrary ? "Already added" : "Add to library"}
            </button>
          </div>
        </BaseModal>
      )}
      {addLibraryModalOpen && (
        <BaseModal
          isOpen={true}
          onRequestClose={() => setAddLibraryModalOpen(false)}
        >
          <div className="h-[320px] flex flex-col items-center text-center py-12">
            <img src="/img/okey.png" alt="" className="w-20 h-20 mb-[32px]" />
            <h2 className="text-[20px] font-bold text-[#F9F9F9]">Good job</h2>
            <p className="w-[242px] text-sm font-medium text-[#686868] mt-3.5">
              Your book is now in{" "}
              <span className="text-[#F9F9F9]">the library!</span> The joy knows
              no bounds and now you can start your training
            </p>
          </div>
        </BaseModal>
      )}
    </section>
  );
};

export default Recommended;
