import { Link } from "react-router";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="bg-slate-800 text-white">
      <div className="navbar max-w-[1440px] mx-auto px-4">
        {/* Start - Logo and Brand */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src="/logo.png" alt="logo" className="w-8 h-8 rounded" />
            <span className="hidden sm:inline-block text-blue-500">ThinkHub</span>
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
                  className="w-8 h-8 rounded-full object-cover"
                />
                <h5>{user.displayName || 'null'}</h5>
                <FaChevronDown className="text-xs" />
              </label>

              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-slate-900 text-white rounded-box w-64"
              >
                <p className="mb-2 border-b border-gray-700 pb-2">
                  <div className="font-semibold">
                    {user.displayName || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-400">{user.email}</div>
                </p>
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
