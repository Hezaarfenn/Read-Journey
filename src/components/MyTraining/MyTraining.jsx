import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

const MyTraining = ({ recActive }) => {
  const book = useSelector((state) => state.books.bookDetails);

  return (
    <section className="flex flex-1 flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] p-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[28px]/[32px] font-bold">My reading</h1>
      </div>

      {book && book.title ? (
        <div className="flex flex-col gap-5 mt-10 items-center">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-[224px] h-[340px] object-cover rounded-lg"
          />
          <div className="flex flex-col gap-2 items-center text-white">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-sm text-[#686868] font-medium">{book.author}</p>
          </div>

          {/* Rec/Stop Button */}
          <div className="cursor-pointer">
            {recActive ? (
              <svg width="50" height="50" className="cursor-pointer">
                <use href="/sprite.svg#icon-stop" />
              </svg>
            ) : (
              <svg width="50" height="50" className="cursor-pointer">
                <use href="/sprite.svg#icon-rec" />
              </svg>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-20 flex items-center justify-center h-20 w-20">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default MyTraining;
