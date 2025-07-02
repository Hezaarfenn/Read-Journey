const MyLibrary = () => {
  return (
    <section className="flex gap-4 mt-2">
      {/* Left Sidebar */}
      <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
        {/* Create your library */}
        <div>
          <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
            Create your library:
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
            <input
              type="text"
              placeholder="Number of pages:"
              className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
            />
          </div>
          <button className="w-[131px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer">
            Add book
          </button>
        </div>

        {/* Recommended books */}
        <div className="w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-[78px]">
          <h2 className="text-xl font-bold">Recommended books</h2>

          <ul className="w-full flex gap-5 mt-5">
            <li className="flex flex-col gap-3 items-start">
              <img
                src="/img/image 1.png"
                alt="Book 1"
                className="w-[71px] h-[107px] rounded-lg"
              />
              <div className="font-bold text-[10px]/[12px] flex flex-col gap-0.5">
                <p className="text-[#E3E3E3]">The Orphanage</p>
                <p className="text-[#686868]">Serhiy Zhadan</p>
              </div>
            </li>

            <li className="flex flex-col gap-3 items-start">
              <img
                src="/img/image 1.png"
                alt="Book 1"
                className="w-[71px] h-[107px] rounded-lg"
              />
              <div className="font-bold text-[10px]/[12px] flex flex-col gap-0.5">
                <p className="text-[#E3E3E3]">Melodіja kavi...</p>
                <p className="text-[#686868]">Natalia Gurnyt...</p>
              </div>
            </li>

            <li className="flex flex-col gap-3 items-start">
              <img
                src="/img/image 1.png"
                alt="Book 1"
                className="w-[71px] h-[107px] rounded-lg"
              />
              <div className="font-bold text-[10px]/[12px] flex flex-col gap-0.5">
                <p className="text-[#E3E3E3]">SIx doors</p>
                <p className="text-[#686868]">Irene Rozdobu...</p>
              </div>
            </li>
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
          <select className="w-[153px] h-[46px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]">
            <option value="all">Unread</option>
            <option value="all">In progress</option>
            <option value="all">Done</option>
            <option value="all">All books</option>
          </select>
        </div>

        <div className="w-full flex flex-col justify-center items-center mt-[147px]">
          <div className="w-[274px] gap-5 flex flex-col items-center">
            <img src="/img/book-1.png" alt="Book" className="w-40 h-40" />
            <p className="text-[#F9F9F9] text-[14px]/[18px] font-medium text-center">
              To start training, add{" "}
              <span className="text-[#686868]">some of your books</span> or from
              the recommended ones
            </p>
          </div>
        </div>

        {/* <ul className="flex flex-wrap gap-5">
          <li className="flex flex-col gap-3 items-start">
            <img
              src="/img/image 2.png"
              alt="Book 1"
              className="w-[137px] h-[208px] rounded-lg"
            />
            <div className="w-[137px] flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <p className="text-[#E3E3E3] font-bold text-[14px]">
                  I See You Ar...
                </p>
                <p className="text-[#686868] font-medium text-[10px]">
                  Hilarion Pavlyuk
                </p>
              </div>
              <svg width="28" height="28">
                <use href="/sprite.svg#icon-basket" />
              </svg>
            </div>
          </li>
          <li className="flex flex-col gap-3 items-start">
            <img
              src="/img/image 2.png"
              alt="Book 1"
              className="w-[137px] h-[208px] rounded-lg"
            />
            <div className="w-[137px] flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <p className="text-[#E3E3E3] font-bold text-[14px]">
                  I See You Ar...
                </p>
                <p className="text-[#686868] font-medium text-[10px]">
                  Hilarion Pavlyuk
                </p>
              </div>
              <svg width="28" height="28">
                <use href="/sprite.svg#icon-basket" />
              </svg>
            </div>
          </li>
        </ul> */}
      </div>
    </section>
  );
};

export default MyLibrary;
