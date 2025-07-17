import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchBookDetails,
  startReading,
  finishReading,
} from "../../redux/books/booksOps";
import { toast } from "react-toastify";

const LeftProgress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [startPage, setStartPage] = useState("");
  const [readingStarted, setReadingStarted] = useState(false);
  const [stopPage, setStopPage] = useState("");

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
        setReadingStarted(true);
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
      });
  };

  const handleStopReading = () => {
    if (!stopPage || isNaN(stopPage) || stopPage <= 0) {
      toast.error("Please enter a valid stop page.");
      return;
    }

    dispatch(finishReading({ bookId: id, page: Number(stopPage) }))
      .unwrap()
      .then(() => {
        toast.success("Reading stopped!");
        setReadingStarted(false);
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
      });
  };

  return (
    <div>
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Start Reading */}
        {!readingStarted ? (
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
        ) : (
          <div>
            <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
              Stop page:
            </p>

            <div className="flex flex-1/3 flex-col gap-2 mt-2">
              <input
                type="text"
                placeholder="Page number:"
                value={stopPage}
                onChange={(e) => setStopPage(e.target.value)}
                className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
              />

              <button
                onClick={handleStopReading}
                className="w-[114px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer"
              >
                To stop
              </button>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default LeftProgress;
