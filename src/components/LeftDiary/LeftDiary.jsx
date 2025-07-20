import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { startReading, finishReading } from "../../redux/books/booksOps";
import BaseModal from "../BaseModal/BaseModal";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import BookLoader from "../../assets/book-loader.json";

const LeftDiary = ({
  sessions,
  setSessions,
  currentSession,
  setCurrentSession,
  viewMode,
  setViewMode,
  setIsRecording,
  startPage,
  setStartPage,
  stopPage,
  setStopPage,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showCompletionModal, setShowCompletionModal] = useState(false);

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

    setCurrentSession(newSession);
    setSessions((prev) => [...prev, newSession]);
    setIsRecording(true);
    setStartPage("");

    dispatch(startReading({ bookId: id, page: Number(startPage) }))
      .unwrap()
      .then(() => {
        toast.success("Reading started!");
        setSessions((prev) =>
          prev.map((session) =>
            session.id === newSession.id
              ? { ...session, isLoading: false }
              : session,
          ),
        );
        setCurrentSession((prev) => ({ ...prev, isLoading: false }));
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
        setSessions((prev) =>
          prev.filter((session) => session.id !== newSession.id),
        );
        setCurrentSession(null);
        setIsRecording(false);
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

        setSessions((prev) =>
          prev.map((session) =>
            session.id === currentSession.id ? updatedSession : session,
          ),
        );

        setCurrentSession(null);
        setIsRecording(false);
        setStopPage("");

        if (response.isCompleted) {
          setShowCompletionModal(true);
        }
      })
      .catch(() => {
        toast.error("Something went wrong. Try again.");
      });
  };

  const handleDeleteSession = (sessionId) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
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
      {/* Stop Reading */}
      {!currentSession?.isActive && (
        <div>
          <p className="ml-4 text-[14px] font-medium text-[#F9F9F9]">
            Start page:
          </p>

          <div className="flex flex-1/3 flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Page number:"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
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
      )}

      {/* Stop Reading */}
      {currentSession?.isActive && (
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
      )}

      {/* Diary */}
      <div
        className={`w-[313px] ${currentSession?.isActive || sessions.some((s) => !s.isActive) ? "mt-10" : ""} flex justify-between`}
      >
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

              {session.isLoading ? (
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
                      {((session.pagesRead / 500) * 100).toFixed(1)}%
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
                      {session.pagesPerHour} pages per hour
                    </p>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && (
        <BaseModal
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          title="Congratulations!"
        >
          <div className="h-[320px] flex flex-col items-center text-center py-12">
            <img
              src="/img/book.png"
              alt=""
              className="w-[68px] h-[70px] mb-[32px]"
            />
            <h2 className="text-[20px] font-bold text-[#F9F9F9]">
              The book is read
            </h2>
            <p className="w-[242px] text-sm font-medium text-[#686868] mt-3.5">
              It was an <span className="text-[#F9F9F9]">exciting journey</span>{" "}
              , where each page revealed new horizons, and the characters became
              inseparable friends.
            </p>
          </div>
        </BaseModal>
      )}
    </section>
  );
};

export default LeftDiary;
