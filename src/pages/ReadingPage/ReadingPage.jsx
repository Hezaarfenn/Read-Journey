import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import MyTraining from "../../components/MyTraining/MyTraining";
import LeftProgress from "../../components/LeftProgress/LeftProgress";
import LeftDiary from "../../components/LeftDiary/LeftDiary";
import LeftStatistics from "../../components/LeftStatistics/LeftStatistics";
import { fetchBookDetails } from "../../redux/books/booksOps";

const ReadingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [viewMode, setViewMode] = useState("diary");
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [startPage, setStartPage] = useState("");
  const [stopPage, setStopPage] = useState("");

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (sessions.length === 0) {
      setViewMode("progress");
    } else if (viewMode === "progress") {
      setViewMode("diary");
    }
  }, [sessions.length, viewMode]);

  const renderLeftContent = () => {
    if (sessions.length === 0) {
      return (
        <LeftProgress
          currentSession={currentSession}
          setCurrentSession={setCurrentSession}
          sessions={sessions}
          setSessions={setSessions}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          startPage={startPage}
          setStartPage={setStartPage}
          setViewMode={setViewMode}
        />
      );
    }

    if (viewMode === "diary") {
      return (
        <LeftDiary
          sessions={sessions}
          currentSession={currentSession}
          setSessions={setSessions}
          setCurrentSession={setCurrentSession}
          viewMode={viewMode}
          setViewMode={setViewMode}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          startPage={startPage}
          setStartPage={setStartPage}
          stopPage={stopPage}
          setStopPage={setStopPage}
        />
      );
    }

    if (viewMode === "statistics") {
      return (
        <LeftStatistics
          viewMode={viewMode}
          setViewMode={setViewMode}
          sessions={sessions}
          currentSession={currentSession}
          setSessions={setSessions}
          setCurrentSession={setCurrentSession}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          startPage={startPage}
          setStartPage={setStartPage}
          stopPage={stopPage}
          setStopPage={setStopPage}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <Header />
      <div className="flex gap-4 mt-2">
        {renderLeftContent()}
        <MyTraining recActive={isRecording} />
      </div>
    </div>
  );
};

export default ReadingPage;
