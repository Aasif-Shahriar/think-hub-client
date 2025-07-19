import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import SocialLogin from "../social-login/SocialLogin";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const JoinUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useAuth();
  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const userCred = await signIn(data.email, data.password);
      const user = userCred.user;
      const firebaseToken = await user.getIdToken();

      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { firebaseToken },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to ThinkHub 👋",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2563EB",
      }).then(() => {
        navigate(from || "/");
      });
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <title>Join Us | ThinkHub</title>

      <div className="max-w-6xl w-full bg-white rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="bg-blue-600 text-white p-10 hidden lg:flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to ThinkHub</h2>
          <p className="text-lg mb-6">
            Join thousands of developers sharing knowledge, building
            connections, and growing together.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 p-4 rounded text-center">
              👥 50K+ Members
            </div>
            <div className="bg-blue-500 p-4 rounded text-center">
              💬 Daily Discussions
            </div>
            <div className="bg-blue-500 p-4 rounded text-center">
              ✅ Code Reviews
            </div>
            <div className="bg-blue-500 p-4 rounded text-center">
              🏆 Achievements
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:p-8 lg:p-12 bg-base-200">
          <div className="bg-white p-4 shadow-xl rounded">
            <h2 className="text-2xl font-bold mb-2">Log in to ThinkHub</h2>
            <p className="mb-6 text-gray-500">
              Welcome back! Let's continue the journey.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">Email is required</p>
                )}
              </div>

              {/* Password Field with Toggle */}
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="input input-bordered w-full pr-10"
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">Password is required</p>
                )}
              </div>

              <button className="btn btn-primary w-full">Log In</button>
            </form>

            <div className="text-center mt-4">
              <p>
                New to this website?{" "}
                <Link to="/register" className="text-blue-600 font-semibold">
                  Register
                </Link>
              </p>
            </div>

            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
