import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../hooks/useAuth";
import { auth } from "../../../../firebase.init";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SocialLogin from "../social-login/SocialLogin";

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

  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

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
      });

      // 8. Reset form
      reset();
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left Section - Static content */}
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

        {/* Right Section - Register Form */}
        <div className="md:p-8 lg:p-12 bg-base-200">
          <div className="bg-white p-4 shadow-xl rounded">
            <h2 className="text-2xl font-bold mb-2">Register for ThinkHub</h2>
            <p className="mb-6 text-gray-500">Connect. Discuss. Grow.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-bordered w-full"
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm">Photo is required</p>
                )}
              </div>
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
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">Password is required</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirm", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="input input-bordered w-full"
                  placeholder="Confirm your password"
                />
                {errors.confirm && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm.message}
                  </p>
                )}
              </div>
              <button className="btn btn-primary w-full">Register</button>
            </form>

            <div className="text-center mt-4">
              <p>
                Already have an account?{" "}
                <Link to="/join-us" className="text-blue-600 font-semibold">
                  Login
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

export default Register;
