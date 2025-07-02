import Modal from "react-modal";

Modal.setAppElement("#root");

const BaseModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="relative w-full max-w-[500px] bg-[#1F1F1F] border-[#686868]/20 rounded-[12px] px-10 pt-10 pb-6 shadow-lg text-white outline-none"
      overlayClassName="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
    >
      {/* X Close Button */}
      <button
        onClick={onRequestClose}
        aria-label="Close modal"
        className="absolute top-4 right-4 text-[#F9F9F9] hover:text-[#686868] cursor-pointer"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {children}
    </Modal>
  );
};

export default BaseModal;
