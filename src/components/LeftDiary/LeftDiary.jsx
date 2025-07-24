import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { removeSession } from "../../redux/books/booksSlice";
import ReadingInput from "../ReadingInput/ReadingInput";
import ViewModeSwitcher from "../ViewModeSwitcher/ViewModeSwitcher";
import CompletedModal from "../CompletedModal/CompletedModal";
import Lottie from "lottie-react";
import BookLoader from "../../assets/book-animation.json";

const LeftDiary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { sessionsByBookId = {}, bookDetails } = useSelector(
    (state) => state.books,
  );

  const sessions = sessionsByBookId[id] || [];
  const totalPages = bookDetails?.totalPages || 0;

  const getSessionPercentage = (session) => {
    if (totalPages === 0 || !session.pagesRead) return 0;
    return ((session.pagesRead / totalPages) * 100).toFixed(1);
  };

  const handleDeleteSession = (sessionId) => {
    dispatch(removeSession(sessionId));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
      {/* Reading Input */}
      <ReadingInput />

      {/* View Mode Switcher */}
      <ViewModeSwitcher />

      {/* Sessions List */}
      <div className="w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-5">
        <ul>
          {sessions.map((session, index) => (
            <li key={session.id} className={index > 0 ? "mt-10" : ""}>
              <div className="flex gap-2.5">
                {/* Box */}
                <div
                  className={`border-4 ${session.isActive ? "border-[#F9F9F9]" : "border-[#686868]"} rounded-[4px] w-5 h-5`}
                >
                  <p className="w-3 h-3 bg-[#141414] rounded-[2px]"></p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-[16px] font-bold text-[#F9F9F9]">
                    {formatDate(session.startTime)}
                  </p>
                  {!session.isLoading && !session.isActive && (
                    <p className="text-sm font-medium text-[#686868]">
                      {session.pagesRead} pages
                    </p>
                  )}
                </div>
              </div>

              {session.isLoading || session.isActive ? (
                <div>
                  <Lottie
                    animationData={BookLoader}
                    loop={true}
                    className="w-20 h-20"
                  />
                </div>
              ) : !session.isActive && session.endTime ? (
                <div className="ml-7 flex items-center justify-between mt-7">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-medium">
                      {getSessionPercentage(session)}%
                    </p>
                    <p className="text-[12px] font-medium text-[#686868]">
                      {session.duration} minutes
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-[7px]">
                    <div className="flex gap-2 items-center justify-center">
                      <img
                        src="/img/block.png"
                        alt="chart"
                        className="w-[59px] h-[25px]"
                      />
                      <svg
                        width={14}
                        height={14}
                        className="cursor-pointer"
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        <use href="/sprite.svg#icon-trash-2" />
                      </svg>
                    </div>

                    <p className="w-[55px] text-[12px] font-medium text-[#686868]">
                      {session.pagesRead} pages per hour
                    </p>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {/* Completion Modal */}
      <CompletedModal type="reading" />
    </section>
  );
};

export default LeftDiary;
