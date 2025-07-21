import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startReading, finishReading } from "../../redux/books/booksOps";
import {
  setStartPage,
  setStopPage,
  setCurrentSession,
  addSession,
  updateSession,
  setIsRecording,
  setViewMode,
  setShowCompletionModal,
  removeSession,
} from "../../redux/books/booksSlice";
import { toast } from "react-toastify";

const ReadingInput = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentSession,
    sessionsByBookId = {},
    startPage,
    stopPage,
  } = useSelector((state) => state.books);

  const sessions = sessionsByBookId[id] || [];

  const handleStartReading = () => {
    if (!startPage || isNaN(startPage) || startPage <= 0) {
      toast.error("Please enter a valid start page.");
      return;
    }

    const newSession = {
      id: Date.now(),
      startPage: Number(startPage),
      startTime: new Date().toISOString(),
      isActive: true,
      isLoading: true,
    };

    dispatch(setCurrentSession(newSession));
    dispatch(addSession(newSession));
    dispatch(setIsRecording(true));
    dispatch(setStartPage(""));

    if (sessions.length === 0) {
      dispatch(setViewMode("diary"));
    }

    dispatch(startReading({ bookId: id, page: Number(startPage) }))
      .unwrap()
      .then(() => {
        toast.success("Reading started!");
        const updatedSession = {
          ...newSession,
          isLoading: false,
        };
        dispatch(updateSession(updatedSession));
        dispatch(setCurrentSession(updatedSession));
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
        dispatch(removeSession(newSession.id));
        dispatch(setCurrentSession(null));
        dispatch(setIsRecording(false));

        if (sessions.length === 1) {
          dispatch(setViewMode("progress"));
        }
      });
  };

  const handleStopReading = () => {
    if (!stopPage || isNaN(stopPage) || stopPage <= 0) {
      toast.error("Please enter a valid stop page.");
      return;
    }

    if (!currentSession) return;

    const endTime = new Date();
    const duration = Math.round(
      (new Date(endTime) - new Date(currentSession.startTime)) / 1000 / 60,
    );
    const pagesRead = Number(stopPage) - currentSession.startPage;
    const pagesPerHour = Math.round((pagesRead / duration) * 60);

    dispatch(finishReading({ bookId: id, page: Number(stopPage) }))
      .unwrap()
      .then((response) => {
        toast.success("Reading stopped!");

        const updatedSession = {
          ...currentSession,
          endPage: Number(stopPage),
          endTime: endTime.toISOString(),
          duration: duration,
          pagesRead: pagesRead,
          pagesPerHour: pagesPerHour,
          isActive: false,
          isLoading: false,
        };

        dispatch(updateSession(updatedSession));
        dispatch(setCurrentSession(null));
        dispatch(setIsRecording(false));
        dispatch(setStopPage(""));

        if (response.isCompleted) {
          dispatch(setShowCompletionModal(true));
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
      });
  };

  if (!currentSession?.isActive) {
    //Start Reading
    return (
      <div>
        <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
          Start page:
        </p>

        <div className="flex flex-1/3 flex-col gap-2 mt-2">
          <input
            type="text"
            placeholder="Page number:"
            value={startPage}
            onChange={(e) => dispatch(setStartPage(e.target.value))}
            className="w-[313px] h-[50px] border rounded-xl border-transparent bg-[#262626] p-3.5 text-[#F9F9F9] text-sm font-medium placeholder:text-[#686868]"
          />

          <button
            onClick={handleStartReading}
            className="w-[114px] h-[42px] border rounded-[30px] border-[#F9F9F9]/20 text-[#F9F9F9] text-[16px] font-bold mt-5 cursor-pointer"
          >
            To start
          </button>
        </div>
      </div>
    );
  }

  //Stop Reading
  return (
    <div>
      <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">Stop page:</p>

      <div className="flex flex-1/3 flex-col gap-2 mt-2">
        <input
          type="text"
          placeholder="Page number:"
          value={stopPage}
          onChange={(e) => dispatch(setStopPage(e.target.value))}
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
  );
};

export default ReadingInput;
