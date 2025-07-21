import { useDispatch, useSelector } from "react-redux";
import { setShowCompletionModal } from "../../redux/books/booksSlice";
import BaseModal from "../BaseModal/BaseModal";

const CompletedModal = () => {
  const dispatch = useDispatch();
  const { showCompletionModal } = useSelector((state) => state.books);
  const handleClose = () => {
    dispatch(setShowCompletionModal(false));
  };

  return (
    <BaseModal
      isOpen={showCompletionModal}
      onRequestClose={handleClose}
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
          It was an <span className="text-[#F9F9F9]">exciting journey</span>,
          where each page revealed new horizons, and the characters became
          inseparable friends.
        </p>
      </div>
    </BaseModal>
  );
};

export default CompletedModal;
