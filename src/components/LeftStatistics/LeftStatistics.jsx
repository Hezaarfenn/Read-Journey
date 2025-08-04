import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ReadingInput from "../ReadingInput/ReadingInput";
import ViewModeSwitcher from "../ViewModeSwitcher/ViewModeSwitcher";
import CompletedModal from "../CompletedModal/CompletedModal";

ChartJS.register(ArcElement, Tooltip, Legend);

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
    progressPercentage = "100";
  } else {
    progressPercentage =
      totalPages > 0
        ? ((totalPagesRead / totalPages) * 100).toFixed(2)
        : "0.00";
  }

  const doughnutData = {
    labels: ["Read", "Unread"],
    datasets: [
      {
        data: [totalPagesRead, totalPages - totalPagesRead],
        backgroundColor: ["#30B94D", "#393939"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} pages`,
        },
      },
    },
  };

  return (
    <section className="flex flex-col md:flex-row lg:flex-col gap-0 md:gap-10 lg:gap-0 border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
      {/* Reading Input */}
      <ReadingInput />

      <div className="flex flex-col">
        {/* View Mode Switcher */}
        <ViewModeSwitcher title="Statistics" />

        {/* Statistics */}
        <div className="w-[293px] mt-5">
          <p className="text-sm font-medium text-[#686868]">
            Each page, each chapter is a new round of knowledge, a new step
            towards understanding. By rewriting statistics, we create our own
            reading history.
          </p>
        </div>

        {/* Doughnut */}
        <div className="relative w-[313px] border border-transparent rounded-xl bg-[#262626] p-5 mt-5">
          <div className="flex flex-col items-center justify-center h-[189px] relative">
            <Doughnut
              data={doughnutData}
              options={doughnutOptions}
              width={189}
              height={189}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
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
