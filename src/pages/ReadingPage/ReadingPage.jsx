import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import MyTraining from "../../components/MyTraining/MyTraining";
import LeftProgress from "../../components/LeftProgress/LeftProgress";
import LeftDiary from "../../components/LeftDiary/LeftDiary";
import LeftStatistics from "../../components/LeftStatistics/LeftStatistics";
import { fetchBookDetails } from "../../redux/books/booksOps";
import { initializeReading } from "../../redux/books/booksSlice";

const ReadingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const booksState = useSelector((state) => state.books);

  const viewMode = booksState?.viewMode || "progress";
  const sessionsByBookId = booksState?.sessionsByBookId || {};
  const sessions = sessionsByBookId[id] || [];
  const bookDetails = booksState?.bookDetails;

  const lastSession = sessions
    .filter((s) => !s.isActive)
    .sort((a, b) => new Date(b.endTime) - new Date(a.endTime))[0];
  const lastPageRead = lastSession?.endPage || 0;
  const totalPages = bookDetails?.totalPages || 0;
  const isBookCompleted = totalPages > 0 && lastPageRead >= totalPages;

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetails(id));
      dispatch(initializeReading(id));
    }
  }, [dispatch, id]);

  const renderLeftContent = () => {
    if (sessions.length === 0) {
      return <LeftProgress />;
    }

    if (isBookCompleted) {
      return <LeftStatistics />;
    }

    if (viewMode === "diary") {
      return <LeftDiary />;
    }
    if (viewMode === "statistics") {
      return <LeftStatistics />;
    }

    return <LeftDiary />;
  };

  return (
    <div>
      <Header />
      <div className="flex gap-4 mt-2">
        {renderLeftContent()}
        <MyTraining />
      </div>
    </div>
  );
};

export default ReadingPage;
