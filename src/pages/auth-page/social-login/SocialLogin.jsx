import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await googleLogin();
      const user = res.user;

      const firebaseToken = await user.getIdToken();

      // 1. Send token to backend for JWT
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { firebaseToken },
        { withCredentials: true }
      );

      //  2. Save user to database
      await axiosSecure.post("/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      //3. swal and redirect
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome to ThinkHub 👋",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2563EB",
      }).then(() => {
        navigate(from || "/");
        setIsLoading(false);
      });
    } catch (err) {
      console.error("Google login error:", err);
      toast.error(err.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            OR CONTINUE WITH
          </span>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
        aria-label="Continue with Google"
      >
        {isLoading ? (
          <FaSpinner className="animate-spin text-gray-400" size={20} />
        ) : (
          <>
            <FcGoogle size={20} />
            <span>Google</span>
          </>
        )}
      </button>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
        By continuing, you agree to our{" "}
        <a
          href="/terms"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="/privacy"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default SocialLogin;
