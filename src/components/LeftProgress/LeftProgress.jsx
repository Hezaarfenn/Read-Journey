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
    <div className="flex flex-col md:flex-row lg:flex-col gap-0 md:gap-10 lg:gap-0 md:h-[336px] lg:h-full border rounded-[30px] border-transparent bg-[#1F1F1F] py-10 px-5">
      {/* Start Reading */}
      <ReadingInput />

      {/* Progress */}
      <div>
        <div className="w-[313px] mt-10 md:mt-0 lg:mt-10">
          <h2 className="text-xl font-bold">Progress</h2>
          <p className="text-sm font-medium text-[#686868] mt-2">
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
        </div>

        <div className="flex items-center justify-center mt-[60px] mb-10 md:mb-[203px]">
          <div className="border rounded-full border-transparent bg-[#262626] w-[80px] md:w-[100px] h-[80px] md:h-[100px] flex items-center justify-center">
            <img
              src="/img/star.png"
              alt="star"
              className="w-8 h-8 md:w-[50px] md:h-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftProgress;
