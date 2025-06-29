import Lottie from "lottie-react";
import logoutAnimation from "../../assets/animation-logout.json";

const Logout = ({ onRequestClose, onConfirm }) => {
  return (
    <div className="flex flex-col items-center">
      <Lottie
        animationData={logoutAnimation}
        loop
        autoplay
        className="w-60 h-60 mb-8"
      />
      <h2 className="text-2xl font-bold mb-4">
        Are you sure you want to get out?
      </h2>

      <div>
        <button
          className="border border-[#F9F9F9]/20 hover:bg-[#F9F9F9]/10 cursor-pointer text-white px-4 py-2 rounded-md mr-2"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="border border-[#F9F9F9]/20 hover:bg-[#F9F9F9]/10 cursor-pointer text-white px-4 py-2 rounded-md mr-2"
          onClick={onRequestClose}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Logout;
