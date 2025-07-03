import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  setAuthorFilter,
  setTitleFilter,
} from "../../redux/books/booksSlice";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import BaseModal from "../BaseModal/BaseModal";

const Recommended = () => {
  const dispatch = useDispatch();
  const {
    items: books = [],
    isLoading,
    error,
    filter,
  } = useSelector((state) => state.books || {});

  const [titleInput, setTitleInput] = useState(filter.title || "");
  const [authorInput, setAuthorInput] = useState(filter.author || "");

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(filter.title.toLowerCase());
    const authorMatch = book.author
      .toLowerCase()
      .includes(filter.author.toLowerCase());
    return titleMatch && authorMatch;
  });

  const [selectedBook, setSelectedBook] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter.title, filter.author]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    dispatch(setTitleFilter(titleInput));
    dispatch(setAuthorFilter(authorInput));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex gap-4 mt-2">
      {/* Left Sidebar */}
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Filter */}
        <form onSubmit={handleFilterSubmit}>
          <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
            Filters:
          </p>
          <div className="flex flex-1/3 flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Book title:"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868] hover:border-[#262626] focus:outline-none"
            />
            <input
              type="text"
              placeholder="The author:"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868] hover:border-[#262626] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-[122px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer hover:bg-[#F9F9F9] hover:text-[#1F1F1F]"
          >
            To apply
          </button>
        </form>

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
            <div
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
                <use href="/chevron-left.svg" />
              </svg>
            </div>
            <div
              className={`w-7 h-7 flex border rounded-full mt-5 justify-center items-center ${
                currentPage === totalPages
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => {
                if (currentPage < totalPages)
                  setCurrentPage((prev) => prev + 1);
              }}
            >
              <svg
                width="20"
                height="20"
                className="cursor-pointer items-center justify-center flex text-center"
              >
                <use href="/chevron-right.svg" />
              </svg>
            </div>
          </div>
        </div>

        <ul className="flex flex-wrap gap-5 mt-7">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
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
            <button className="w-[162px] h-[46px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-8 cursor-pointer hover:bg-[#F9F9F9] hover:text-[#1F1F1F]">
              Add to library
            </button>
          </div>
        </BaseModal>
      )}
    </section>
  );
};

export default Recommended;
