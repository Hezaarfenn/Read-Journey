import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReadingInput from "../ReadingInput/ReadingInput";
import ViewModeSwitcher from "../ViewModeSwitcher/ViewModeSwitcher";
import CompletedModal from "../CompletedModal/CompletedModal";

const LeftStatistics = () => {
  const { id } = useParams();
  const { sessionsByBookId = {}, bookDetails } = useSelector(
    (state) => state.books,
  );

  const sessions = sessionsByBookId[id] || [];
  const totalPages = bookDetails?.totalPages || 0;

  const completedSessions = sessions.filter((s) => !s.isActive && s.endPage);
  const lastSession = completedSessions.sort(
    (a, b) => new Date(b.endTime) - new Date(a.endTime),
  )[0];

  const totalPagesRead = lastSession?.endPage || 0;

  let progressPercentage;
  if (totalPages > 0 && totalPagesRead >= totalPages) {
    progressPercentage = "100.00";
  } else {
    progressPercentage =
      totalPages > 0
        ? ((totalPagesRead / totalPages) * 100).toFixed(2)
        : "0.00";
  }

  return (
    <section className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
      <ReadingInput />
      <ViewModeSwitcher title="Statistics" />
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
              <p className="text-xl font-medium text-[#F9F9F9]">
                {progressPercentage}%
              </p>
              <p className="text-[12px] font-medium text-[#686868]">
                {totalPagesRead} pages read
              </p>
            </div>
          </div>
        </div>
      </div>

      <CompletedModal type="statistics" />
    </section>
  );
};

export default LeftStatistics;
