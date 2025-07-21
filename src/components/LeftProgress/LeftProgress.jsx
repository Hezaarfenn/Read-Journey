import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchBookDetails } from "../../redux/books/booksOps";
import ReadingInput from "../ReadingInput/ReadingInput";

const LeftProgress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
      {/* Start Reading */}
      <ReadingInput />

      {/* Progress */}
      <div className="w-[313px] mt-10">
        <h2 className="text-xl font-bold">Progress</h2>
        <p className="text-sm font-medium text-[#686868] mt-2">
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
      </div>

      <div className="flex items-center justify-center mt-[60px] mb-[203px]">
        <div className="border rounded-full w-[100px] h-[100px] flex items-center justify-center">
          <img src="/img/star.png" alt="star" width={50} height={70} />
        </div>
      </div>
    </div>
  );
};

export default LeftProgress;
