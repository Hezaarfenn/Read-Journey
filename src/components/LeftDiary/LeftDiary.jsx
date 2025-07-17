import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { finishReading } from "../../redux/books/booksOps";
import BaseModal from "../BaseModal/BaseModal";
import { toast } from "react-toastify";

const LeftDiary = ({ viewMode, setViewMode }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [stopPage, setStopPage] = useState("");
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const handleStopReading = () => {
    if (!stopPage || isNaN(stopPage) || stopPage <= 0) {
      toast.error("Please enter a valid stop page.");
      return;
    }

    dispatch(finishReading({ bookId: id, page: Number(stopPage) }))
      .unwrap()
      .then((response) => {
        toast.success("Reading stopped!");

        if (response.isCompleted) {
          setShowCompletionModal(true);
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
      });
  };

  return (
    <section className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
      {/* Stop Reading */}
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

      {/* Diary */}
      <div className="w-[313px] mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Diary</h2>
        <div className="flex gap-2">
          <svg
            className={`cursor-pointer w-5 h-5 ${viewMode === "diary" ? "opacity-100" : "opacity-50"}`}
            onClick={() => setViewMode("diary")}
          >
            <use href="/sprite.svg#icon-hourglass" />
          </svg>
          <svg
            className={`cursor-pointer w-5 h-5 ${viewMode === "statistics" ? "opacity-100" : "opacity-50"}`}
            onClick={() => setViewMode("statistics")}
          >
            <use href="/sprite.svg#icon-pie-chart-02" />
          </svg>
        </div>
      </div>

      <div className="w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-5">
        <ul>
          <li>
            <div className="flex gap-2.5">
              {/* Box */}
              <div className="border-4 border-[#F9F9F9] rounded-[4px] w-5 h-5 ">
                <p className="w-3 h-3 bg-[#141414] rounded-[2px]"></p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-[16px] font-bold text-[#F9F9F9]">
                  21.10.2023
                </p>
                <p className="text-sm font-medium text-[#686868]">42 pages</p>
              </div>
            </div>

            <div className="ml-7 flex items-center justify-between mt-7">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-medium">7.6%</p>
                <p className="text-[12px] font-medium text-[#686868]">
                  29 minutes
                </p>
              </div>

              <div className="flex flex-col items-center gap-[7px]">
                <img
                  src="/img/block.png"
                  alt="chart"
                  className="w-[59px] h-[25px]"
                />
                <p className="w-[55px] text-[12px] font-medium text-[#686868]">
                  45 pages per hour
                </p>
              </div>
            </div>
          </li>

          <li className="mt-10">
            <div className="flex gap-2.5">
              {/* Box */}
              <div className="border-4 border-[#686868] rounded-[4px] w-5 h-5 ">
                <p className="w-3 h-3 bg-[#141414] rounded-[2px]"></p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-[16px] font-bold text-[#F9F9F9]">
                  19.10.2023
                </p>
                <p className="text-sm font-medium text-[#686868]">87 pages</p>
              </div>
            </div>

            <div className="ml-7 flex items-center justify-between mt-7">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-medium">10.5%</p>
                <p className="text-[12px] font-medium text-[#686868]">
                  40 minutes
                </p>
              </div>

              <div className="flex flex-col items-center gap-[7px]">
                <img
                  src="/img/block.png"
                  alt="chart"
                  className="w-[59px] h-[25px]"
                />
                <p className="w-[55px] text-[12px] font-medium text-[#686868]">
                  50 pages per hour
                </p>
              </div>
            </div>

            <div className="ml-7 flex items-center justify-between mt-7">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-medium">1.04%</p>
                <p className="text-[12px] font-medium text-[#686868]">
                  4 minutes
                </p>
              </div>

              <div className="flex flex-col items-center gap-[7px]">
                <img
                  src="/img/block.png"
                  alt="chart"
                  className="w-[59px] h-[25px]"
                />
                <p className="w-[55px] text-[12px] font-medium text-[#686868]">
                  37 pages per hour
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* Completion Modal */}
      {showCompletionModal && (
        <BaseModal
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          title="Congratulations!"
        >
          <div className="h-[320px] flex flex-col items-center text-center py-12">
            <img
              src="/img/book.png"
              alt=""
              className="w-[68px] h-[70px] mb-[32px]"
            />
            <h2 className="text-[20px] font-bold text-[#F9F9F9]">
              The book is read
            </h2>
            <p className="w-[242px] text-sm font-medium text-[#686868] mt-3.5">
              It was an <span className="text-[#F9F9F9]">exciting journey</span>{" "}
              , where each page revealed new horizons, and the characters became
              inseparable friends.
            </p>
          </div>
        </BaseModal>
      )}
    </section>
  );
};

export default LeftDiary;
