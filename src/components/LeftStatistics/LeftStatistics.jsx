import { useState } from "react";

const LeftStatistics = () => {
  const [viewMode, setViewMode] = useState("statistics");

  return (
    <div>
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Stop Reading */}
        <div>
          <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
            Stop page:
          </p>

          <div className="flex flex-1/3 flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Page number:"
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />

            <button className="w-[114px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer">
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
      </div>
    </div>
  );
};

export default LeftStatistics;
