import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import NotificationBell from "../../pages/home-page/announcements/NotificationBell";
import ThinkHubLogo from "../logo/ThinkHubLogo";
import ThemeToggle from "../theme-toggle/ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
      toast.success("Logged out!");
      navigate("/join-us");
      setMobileMenuOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-transparent backdrop-blur-2xl text-slate-900 dark:text-white shadow"
          : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md"
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <ThinkHubLogo />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-yellow-400"
                  : "hover:text-blue-500 dark:hover:text-yellow-300"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/membership"
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-yellow-400"
                  : "hover:text-blue-500 dark:hover:text-yellow-300"
              }`
            }
          >
            Membership
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 dark:text-yellow-400"
                  : "hover:text-blue-500 dark:hover:text-yellow-300"
              }`
            }
          >
            Dashboard
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <NotificationBell />
          {user ? (
            <div className="hidden lg:block dropdown dropdown-end">
              <label
                tabIndex={0}
                className="px-3 py-0.5 cursor-pointer rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
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
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-box w-64"
              >
                <div className="mb-2 border-b border-gray-300 dark:border-gray-700 pb-2">
                  <div className="font-semibold">
                    {user.displayName || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>

                <li className="hover:text-blue-600 dark:hover:text-yellow-400">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
                <li className="py-3 border-t border-gray-400 dark:border-gray-600">
                  <ThemeToggle />
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/join-us"
              className="hidden lg:inline-block px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Join Us
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 px-4 py-4 space-y-4 shadow-lg">
          {/* User Profile */}
          {user && (
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover bg-white"
                />
                <div>
                  <div className="font-semibold">{user.displayName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Home */}
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive
                  ? "text-blue-600 dark:text-yellow-400"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }`
            }
          >
            Home
          </NavLink>

          {/* Membership */}
          <NavLink
            to="/membership"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive
                  ? "text-blue-600 dark:text-yellow-400"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }`
            }
          >
            Membership
          </NavLink>

          {/* Dashboard (only shown when logged in) */}
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              Dashboard
            </Link>
          )}

          {/* Join Us/Logout */}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/join-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              Join Us
            </Link>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
