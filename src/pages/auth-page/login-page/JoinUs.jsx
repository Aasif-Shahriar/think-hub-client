import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import SocialLogin from "../social-login/SocialLogin";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

const JoinUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { signIn } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    setLoginError("");
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
        background: "#1e293b",
        color: "#fff",
      }).then(() => {
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.error("Login error:", err);
      setLoginError(
        err.message.includes("wrong-password")
          ? "Incorrect password. Please try again."
          : err.message.includes("user-not-found")
          ? "No account found with this email."
          : "Login failed. Please try again."
      );
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4 sm:p-6">
      <title>Login | ThinkHub</title>

      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-md grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Left Section - Illustration/Info */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 lg:p-12 hidden lg:flex flex-col justify-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg mb-8 text-blue-100">
              Continue your journey with thousands of developers sharing
              knowledge and building connections.
            </p>

            <div className="space-y-4">
              {[
                { icon: "👥", text: "50K+ Active Members" },
                { icon: "💬", text: "Daily Technical Discussions" },
                { icon: "🔍", text: "Personalized Feed" },
                { icon: "🏆", text: "Earn Achievements" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-blue-100">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-blue-500/30">
              <p className="text-blue-200">
                New to ThinkHub?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-white hover:underline inline-flex items-center gap-1"
                >
                  Join now <FaArrowRight className="text-sm" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-6 sm:p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Sign in to ThinkHub
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome back! Please enter your details.
              </p>
            </div>

            {loginError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
                {loginError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
                <div className="text-right mt-1">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <SocialLogin />

            <div className="text-center mt-6">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
