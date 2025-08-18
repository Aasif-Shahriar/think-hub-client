import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import NotificationBell from "../../pages/home-page/announcements/NotificationBell";
import ThinkHubLogo from "../logo/ThinkHubLogo";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { Link as ScrollLink } from "react-scroll";

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
  const closeMobileMenu = () => setMobileMenuOpen(false);


  const navLinkClasses =
    "transition-colors duration-200 hover:text-blue-500 dark:hover:text-yellow-300";
  const activeLinkClass = "text-blue-600 dark:text-yellow-400 font-semibold";

  const navLinks = (
    <>
      <ScrollLink
        to="latest" spy={true} smooth={true} offset={-80} duration={500}
        className={`cursor-pointer ${navLinkClasses}`} activeClass={activeLinkClass}
        onClick={closeMobileMenu}
      >
        Latest
      </ScrollLink>
      <ScrollLink
        to="trending" spy={true} smooth={true} offset={-80} duration={500}
        className={`cursor-pointer ${navLinkClasses}`} activeClass={activeLinkClass}
        onClick={closeMobileMenu}
      >
        Trending
      </ScrollLink>
      <ScrollLink
        to="challenges" spy={true} smooth={true} offset={-80} duration={500}
        className={`cursor-pointer ${navLinkClasses}`} activeClass={activeLinkClass}
        onClick={closeMobileMenu}
      >
        Challenges
      </ScrollLink>
      <ScrollLink
        to="leaderboard" spy={true} smooth={true} offset={-80} duration={500}
        className={`cursor-pointer ${navLinkClasses}`} activeClass={activeLinkClass}
        onClick={closeMobileMenu}
      >
        Leaderboard
      </ScrollLink>
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl text-slate-900 dark:text-white shadow-md"
          : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow"
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link to="/" onClick={closeMobileMenu}>
            <ThinkHubLogo />
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6 font-medium">
          <NavLink
            to="/" end
            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClass : ""}`}
          >
            Home
          </NavLink>
          {navLinks}
          {user && (
            <>
              <NavLink
                to="/membership"
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClass : ""}`}
              >
                Membership
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClass : ""}`}
              >
                Dashboard
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell />
          {user ? (
            <div className="hidden lg:block dropdown dropdown-end">
              <label
                tabIndex={0}
                className="px-3 py-1 cursor-pointer rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover bg-white"
                />
                <h5 className="text-sm font-medium">
                  {user.displayName || "User"}
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
                <li><Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-yellow-400">Dashboard</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-600 w-full text-left">
                    Logout
                  </button>
                </li>
                <li className="pt-3 border-t border-gray-300 dark:border-gray-600 mt-2">
                  <ThemeToggle />
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/join-us"
              className="hidden lg:inline-block px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Join Us
            </Link>
          )}

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-2 sm:px-6">
          {user && (
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover bg-white"
              />
              <div>
                <div className="font-semibold">{user.displayName || "Anonymous"}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
              </div>
            </div>
          )}

          <NavLink to="/" end onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? "text-blue-600 dark:text-yellow-400 bg-gray-100 dark:bg-slate-800" : "hover:bg-gray-100 dark:hover:bg-slate-800"}`}>Home</NavLink>
          <div className="flex flex-col gap-2 px-3">{navLinks}</div>

          {user && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2">
              <NavLink to="/membership" onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? "text-blue-600 dark:text-yellow-400 bg-gray-100 dark:bg-slate-800" : "hover:bg-gray-100 dark:hover:bg-slate-800"}`}>Membership</NavLink>
              <NavLink to="/dashboard" onClick={closeMobileMenu} className={({ isActive }) => `block px-3 py-2 rounded ${isActive ? "text-blue-600 dark:text-yellow-400 bg-gray-100 dark:bg-slate-800" : "hover:bg-gray-100 dark:hover:bg-slate-800"}`}>Dashboard</NavLink>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-4">
            {user ? (
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold">
                Logout
              </button>
            ) : (
              <Link to="/join-us" onClick={closeMobileMenu} className="block text-center px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Join Us
              </Link>
            )}
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;