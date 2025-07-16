import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetails, startReading } from "../../redux/books/booksOps"; // senin thunk'ların
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const MyTraining = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [startPage, setStartPage] = useState("");
  const book = useSelector((state) => state.books.bookDetails);

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  const handleStartReading = () => {
    if (!startPage || isNaN(startPage) || startPage <= 0) {
      toast.error("Please enter a valid start page.");
      return;
    }

    dispatch(startReading({ bookId: id, page: Number(startPage) }))
      .unwrap()
      .then(() => {
        toast.success("Reading started!");
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
      });
  };

  return (
    <section className="flex gap-4 mt-2">
      {/* Left Sidebar */}
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Start Reading */}
        <div>
          <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
            Start page:
          </p>

          <div className="flex flex-1/3 flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Page number:"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />

            <button
              onClick={handleStartReading}
              className="w-[114px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer"
            >
              To start
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="w-[313px] mt-10">
          <h2 className="text-xl font-bold">Progress</h2>
          <p className="text-sm font-medium text-[#686868] mt-2">
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
        </div>

        <div className="flex items-center justify-center mt-[60px] mb-[203px]">
          <div className="border rounded-full w-[100px] h-[100px] flex items-center justify-center">
            <img src="/img/star.png" alt="star" width={50} height={70} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] p-10">
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
              <p className="text-sm text-[#686868] font-medium">
                {book.author}
              </p>
            </div>
            <svg width="50" height="50" className="cursor-pointer">
              <use href="/sprite.svg#icon-rec" />
            </svg>
          </div>
        ) : (
          <div className="mt-20 flex items-center justify-center h-20 w-20">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default MyTraining;
