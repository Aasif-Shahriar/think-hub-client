import Lottie from "lottie-react";
import loading from "../../assets/lotties/Ripple loading animation.json";

const LoadingBar = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Lottie
        className="w-[200px]"
        animationData={loading}
        loop={true}
      ></Lottie>
    </div>
  );
};

export default LoadingBar;
