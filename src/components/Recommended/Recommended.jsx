const Recommended = () => {
  return (
    <section className="flex gap-4 mt-2">
      {/* Left Sidebar */}
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Filter */}
        <div>
          <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
            Filters:
          </p>
          <div className="flex flex-1/3 flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Book title:"
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />
            <input
              type="text"
              placeholder="The author:"
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />
          </div>
          <button className="w-[122px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer">
            To apply
          </button>
        </div>

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
        <h2>Recomended</h2>
      </div>
    </section>
  );
};

export default Recommended;
