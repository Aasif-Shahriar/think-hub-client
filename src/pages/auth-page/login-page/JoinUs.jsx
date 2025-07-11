import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";

const JoinUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, googleLogin } = useAuth();

  const location = useLocation();
  const from = location.state?.from;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userCred = await signIn(data.email, data.password);
      const user = userCred.user;

      const firebaseToken = await user.getIdToken();

      // ⬇ Send Firebase token to backend to get JWT cookie
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { firebaseToken },
        { withCredentials: true }
      );

      navigate(from || "/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      const user = res.user;

      const firebaseToken = await user.getIdToken();

      //Send Firebase token to backend to get JWT cookie
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { firebaseToken },
        { withCredentials: true }
      );

      navigate(from || "/");
    } catch (err) {
      console.error("Google login error:", err);
      toast.error(err.message || "Google login failed. Please try again.");
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

            <div className="divider">OR</div>
            <button
              onClick={handleGoogleLogin}
              className="btn w-full border border-gray-300 text-black flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
