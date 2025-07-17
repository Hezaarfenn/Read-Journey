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

  const [hasStartedReading, setHasStartedReading] = useState(false);
  const [viewMode, setViewMode] = useState("diary");

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  const renderLeftContent = () => {
    if (!hasStartedReading) {
      return <LeftProgress />;
    }

    if (viewMode === "diary") {
      return <LeftDiary setViewMode={setViewMode} />;
    }

    if (viewMode === "statistics") {
      return <LeftStatistics setViewMode={setViewMode} />;
    }
    return null;
  };

  return (
    <div>
      <Header />
      <div className="flex gap-4 mt-2">
        {renderLeftContent()}

        <MyTraining
          hasStartedReading={hasStartedReading}
          setHasStartedReading={setHasStartedReading}
          setViewMode={setViewMode}
        />
      </div>
    </div>
  );
};

export default ReadingPage;
