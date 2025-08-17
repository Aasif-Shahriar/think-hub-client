import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { auth } from "../../../../firebase.init";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SocialLogin from "../social-login/SocialLogin";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUD_UPLOAD_PRESET;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const { createUser, updateUserProfile, setLoading, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(cloudinaryUrl, formData);
    return response.data.secure_url;
  };

  const onSubmit = async (data) => {
    const file = data.photo[0];
    try {
      // 1. Upload photo
      const imageUrl = await uploadImageToCloudinary(file);

      // 2. Create Firebase user
      await createUser(data.email, data.password);

      // 3. Update Firebase profile
      await updateUserProfile(data.name, imageUrl);

      // 4. Get Firebase token
      const user = auth.currentUser;
      const firebaseToken = await user.getIdToken();

      // 5. Send token to backend to get JWT
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { firebaseToken },
        { withCredentials: true }
      );

      //  6. Save user to database
      await axiosSecure.post("/users", {
        name: data.name,
        email: data.email,
        photoURL: imageUrl,
      });

      // 7. Success alert
      Swal.fire({
        icon: "success",
        title: "Welcome to ThinkHub!",
        text: "Your account was created successfully 🎉",
        confirmButtonText: "Continue",
        confirmButtonColor: "#2563EB",
      }).then(() => {
        navigate(from || "/");
        setLoading(false);
      });

      // 8. Reset form
      reset();
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-700 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden transition-colors duration-300">
        {/* Left Section - Enhanced with Gradient and Animations */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-10 hidden lg:flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Welcome to ThinkHub
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of developers sharing knowledge, building
            connections, and growing together.
          </p>
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white/20 p-4 rounded-lg text-center backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              👥 50K+ Members
            </div>
            <div className="bg-white/20 p-4 rounded-lg text-center backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              💬 Daily Discussions
            </div>
            <div className="bg-white/20 p-4 rounded-lg text-center backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              ✅ Code Reviews
            </div>
            <div className="bg-white/20 p-4 rounded-lg text-center backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              🏆 Achievements
            </div>
          </div>
        </div>

        {/* Right Section - Refined Register Form */}
        <div className="p-6 sm:p-8 md:p-12 bg-white dark:bg-gray-800">
          <div className="bg-transparent">
            <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
              Register for ThinkHub
            </h2>
            <p className="mb-8 text-gray-500 dark:text-gray-400">
              Connect. Discuss. Grow.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">Name is required</p>
                )}
              </div>

              {/* Photo Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Photo
                </label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-400 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-600 dark:file:text-gray-200 dark:hover:file:bg-gray-500 transition"
                />
                {errors.photo && (
                  <p className="text-red-500 text-xs mt-1">Photo is required</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">Email is required</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="input input-bordered w-full pr-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Enter your password"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    Password is required
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirm", {
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="input input-bordered w-full pr-10 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Confirm your password"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer transition-colors"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.confirm && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirm.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all duration-300 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed">
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/join-us"
                  className="text-blue-600 hover:underline dark:text-blue-400 font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>

            <SocialLogin />
          </div>
        </div>
      </div>
      <title>Register | ThinkHub</title>
    </div>
  );
};

export default Register;
