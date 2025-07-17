import { useState } from "react";

const LeftDiary = () => {
  const [viewMode, setViewMode] = useState("diary");

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
            className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
          />

          <button className="w-[114px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer">
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
    </section>
  );
};

export default LeftDiary;
