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
      <div className="flex flex-col lg:flex-row gap-4 mt-2">
        {renderLeftContent()}
        <MyTraining />
      </div>
    </div>
  );
};

export default ReadingPage;
