import Header from "../../components/Header/Header";
import MyTraining from "../../components/MyTraining/MyTraining";
import LeftProgress from "../../components/LeftProgress/LeftProgress";
import LeftDiary from "../../components/LeftDiary/LeftDiary";
import LeftStatistics from "../../components/LeftStatistics/LeftStatistics";

const ReadingPage = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-4 mt-2">
        <LeftProgress />
        <MyTraining />
      </div>
    </div>
  );
};

export default ReadingPage;
