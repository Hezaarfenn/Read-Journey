import { Link } from "react-router-dom";
import NotFoundBook from "/not-found-book.svg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white text-center px-4">
      <img
        src={NotFoundBook}
        alt="Lost Book"
        className="w-60 mb-8 animate-pulse"
      />
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">404 Not Found</h1>
      <p className="text-xl text-gray-700 mb-2">
        Page not found... It's like a missing page fell out of a book 📖
      </p>
      <p className="text-md text-gray-500 mb-6">
        Maybe it’s time to start a new chapter.
      </p>
      <Link
        to="/"
        className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
