import Lottie from "lottie-react";
import bookAnimation from "../../assets/book-loader.json";

const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-64 h-64 mx-auto">
      <Lottie animationData={bookAnimation} loop={true} />
    </div>
  </div>
);

export default Loader;
