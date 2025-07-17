import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { finishReading } from "../../redux/books/booksOps";
import BaseModal from "../BaseModal/BaseModal";
import { toast } from "react-toastify";

const LeftStatistics = ({ viewMode, setViewMode }) => {
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

      {/* Statistic */}
      <div className="w-[313px] mt-10 flex justify-between">
        <h2 className="text-xl font-bold">Statistic</h2>
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

      <div className="w-[293px] mt-5">
        <p className="text-sm font-medium text-[#686868]">
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      </div>

      <div className="w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-5">
        <div className="flex flex-col items-center justify-center h-[189px]">
          <svg className="w-[189px] h-[189px]">
            <use href="/sprite.svg#icon-block" />
          </svg>
          <div className="flex items-baseline gap-2 mt-5">
            <p className="w-3.5 h-3.5 bg-[#30B94D] border border-transparent rounded-[4px]"></p>
            <div>
              <p className="text-xl font-medium text-[#F9F9F9]">19.14%</p>
              <p className="text-[12px] font-medium text-[#686868]">
                171 pages read
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Completion Modal */}
      {showCompletionModal && (
        <BaseModal
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          title="Congratulations!"
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

export default LeftStatistics;
