import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeBook,
  fetchRecommendedBooks,
  addBook,
} from "../../redux/books/booksOps";
import BaseModal from "../BaseModal/BaseModal";
import { toast } from "react-toastify";

const MyLibrary = () => {
  const dispatch = useDispatch();

  const booksInLibrary = useSelector((state) => state.books.ownBooks);
  const recommendedBooks = useSelector((state) =>
    Array.isArray(state.books?.recommended) ? state.books.recommended : [],
  );

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const handleStartReading = (bookId) => {
    setSelectedBook(null);
    navigate(`/reading/${bookId}`);
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");

  const filteredBooks = booksInLibrary.filter((book) => {
    if (selectedFilter === "all") return true;
    return book.status === selectedFilter;
  });

  useEffect(() => {
    dispatch(fetchRecommendedBooks({ page: 1, limit: 20 }));
  }, [dispatch]);

  const randomRecommendedBooks = useMemo(() => {
    if (!recommendedBooks.length) return [];
    const shuffled = [...recommendedBooks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [recommendedBooks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !pages.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isNaN(pages) || pages <= 0) {
      toast.error("Please enter a valid number of pages.");
      return;
    }

    dispatch(addBook({ title, author, totalPages: Number(pages) }))
      .unwrap()
      .then(() => {
        setTitle("");
        setAuthor("");
        setPages("");
        toast.success("Book added successfully!");
      })
      .catch((error) => {
        if (error?.message?.includes("already exists")) {
          toast.error("This book already exists in your library.");
        } else {
          toast.error("Failed to add book. Please try again.");
        }
      });
  };

  return (
    <section className="flex gap-4 mt-2">
      {/* Left Sidebar */}
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Create your library */}
        <div>
          <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
            Create your library:
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-1/3 flex-col gap-2 mt-2"
          >
            <input
              type="text"
              placeholder="Book title:"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />
            <input
              type="text"
              placeholder="The author:"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />
            <input
              type="text"
              placeholder="Number of pages:"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />

            <button
              type="submit"
              className="w-[131px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer"
            >
              Add book
            </button>
          </form>
        </div>

        {/* Recommended books */}
        <div className="w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-[78px]">
          <h2 className="text-xl font-bold">Recommended books</h2>

          <ul className="w-full flex gap-5 mt-5">
            {randomRecommendedBooks.map((book) => (
              <li key={book._id} className="flex flex-col gap-3 items-start">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-[71px] h-[107px] rounded-lg"
                />
                <div className="font-bold text-[10px]/[12px] flex flex-col gap-0.5">
                  <p className="text-[#E3E3E3] truncate max-w-[71px]">
                    {book.title}
                  </p>
                  <p className="text-[#686868]">{book.author}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="/recommended"
            className="mt-[26px] flex justify-between text-[#686868] text-[14px] font-medium cursor-pointer underline hover:text-[#F9F9F9]/50"
          >
            <span>Home</span>
            <svg width="24" height="24">
              <use href="/sprite.svg#icon-log-in" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-2 border rounded-[30px] border-transparent bg-[#1F1F1F] p-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-[28px]/[32px] font-bold">My library</h1>

          <select
            className="w-[153px] h-[46px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="unread">Unread</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
            <option value="all">All books</option>
          </select>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="w-full flex flex-col justify-center items-center mt-[147px]">
            <div className="w-[274px] gap-5 flex flex-col items-center">
              <img src="/img/book-1.png" alt="Book" className="w-40 h-40" />
              <p className="text-[#F9F9F9] text-[14px]/[18px] font-medium text-center">
                To start training, add{" "}
                <span className="text-[#686868]">some of your books</span> or
                from the recommended ones
              </p>
            </div>
          </div>
        ) : (
          <ul className="flex flex-wrap gap-5">
            {filteredBooks.map((book) => (
              <li key={book._id} className="flex flex-col gap-3 items-start">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  onClick={() => setSelectedBook(book)}
                  className="w-[137px] h-[208px] object-cover mx-auto rounded-lg"
                />
                <div className="w-[137px] flex justify-between items-center">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#E3E3E3] font-bold text-[14px] truncate max-w-[89px] text-center">
                      {book.title}
                    </p>
                    <p className="text-[#686868] font-medium text-[10px]">
                      {book.author}
                    </p>
                  </div>
                  <svg
                    width="28"
                    height="28"
                    onClick={() => dispatch(removeBook(book._id))}
                    className="cursor-pointer hover:scale-110 transition-transform"
                  >
                    <use href="/sprite.svg#icon-basket" />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        )}
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

            <button
              onClick={() => handleStartReading(selectedBook._id)}
              className="mt-8 w-[162px] h-[46px] border rounded-[30px] cursor-pointer"
            >
              Start reading
            </button>
          </div>
        </BaseModal>
      )}
    </section>
  );
};

export default MyLibrary;
