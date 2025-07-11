import { Link, useNavigate } from "react-router";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Firebase signOut
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out!");
      navigate("/join-us");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="bg-slate-800 text-white">
      <div className="navbar max-w-[1440px] mx-auto px-4">
        {/* Start - Logo and Brand */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src="/logo.png" alt="logo" className="w-8 h-8 rounded" />
            <span className="hidden sm:inline-block text-blue-500">
              ThinkHub
            </span>
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="navbar-center hidden lg:flex gap-6">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/membership" className="hover:text-blue-400">
            Membership
          </Link>
        </div>

        {/* End - Notification + Profile */}
        <div className="navbar-end gap-4">
          {/* Notification Icon with Badge */}
          <div className="relative">
            <FaBell className="text-xl cursor-pointer hover:text-blue-500" />
            <div className="badge badge-sm bg-blue-500 text-white absolute -top-2 -right-2">
              3
            </div>
          </div>

          {/* User Profile or Join Button */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="px-3 py-0.5 cursor-pointer rounded bg-blue-600 hover:bg-blue-700 border-none text-white flex items-center gap-2"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover bg-white"
                />
                <h5 className="text-sm font-medium">
                  {user.displayName || "null"}
                </h5>
                <FaChevronDown className="text-xs" />
              </label>

              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-slate-900 text-white rounded-box w-64"
              >
                <div className="mb-2 border-b border-gray-700 pb-2">
                  <div className="font-semibold">
                    {user.displayName || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-400">{user.email}</div>
                </div>
                <li className="hover:text-blue-500">
                  <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/join-us"
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Join Us
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
