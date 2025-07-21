import { useSelector, useDispatch } from "react-redux";
import { setViewMode } from "../../redux/books/booksSlice";

const ViewModeSwitcher = ({ title = "Diary" }) => {
  const dispatch = useDispatch();
  const { viewMode, sessions, currentSession } = useSelector(
    (state) => state.books,
  );

  const shouldShowSwitcher =
    currentSession?.isActive || sessions.some((s) => !s.isActive);

  return (
    <div
      className={`w-[313px] ${shouldShowSwitcher ? "mt-10" : ""} flex justify-between`}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex gap-2">
        <svg
          className={`cursor-pointer w-5 h-5 ${viewMode === "diary" ? "opacity-100" : "opacity-50"}`}
          onClick={() => dispatch(setViewMode("diary"))}
        >
          <use href="/sprite.svg#icon-hourglass" />
        </svg>
        <svg
          className={`cursor-pointer w-5 h-5 ${viewMode === "statistics" ? "opacity-100" : "opacity-50"}`}
          onClick={() => dispatch(setViewMode("statistics"))}
        >
          <use href="/sprite.svg#icon-pie-chart-02" />
        </svg>
      </div>
    </div>
  );
};

export default ViewModeSwitcher;
