import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
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
      });
    } catch (err) {
      console.error("Google login error:", err);
      toast.error(err.message || "Google login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleLogin}
        className="btn w-full border border-gray-300 text-black flex items-center justify-center gap-2"
      >
        <FcGoogle className="text-xl" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
