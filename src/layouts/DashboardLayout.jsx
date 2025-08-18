import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router";
import {
  FaUser,
  FaPlus,
  FaList,
  FaUsers,
  FaFlag,
  FaBullhorn,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingBar from "../components/loding/LoadingBar";
import logo from "../assets/images/Think.png";
import ThemeToggle from "../components/theme-toggle/ThemeToggle";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { role, roleLoading } = useUserRole();
  console.log(role, " from dash");

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500 shadow-[inset_6px_0_8px_-8px_rgba(59,130,246,0.5)]"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:translate-x-1"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-white dark:bg-gray-800 w-64 space-y-6 z-20 overflow-y-auto fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 shadow-xl
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl cursor-pointer transition-colors p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo */}
        <Link to="/" className="group block px-4 pt-2">
          <div className="flex items-center gap-3 p-3 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 transition-colors">
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt="ThinkHub Logo"
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ThinkHub
              </h1>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Developer Forum
              </p>
            </div>
          </div>
        </Link>

        <hr className="border-gray-200 dark:border-gray-700 mx-4 my-2" />

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-default">
          <div className="relative">
            <img
              src={user?.photoURL || "https://i.ibb.co/tMzM9sm/user.png"}
              alt="User profile"
              className="w-10 h-10 object-cover rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-700"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></span>
          </div>
          <div className="overflow-hidden">
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {user?.displayName || "User Name"}
            </p>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 capitalize block truncate">
              {role}
            </span>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mx-4 my-2" />

        {/* Navigation */}
        {roleLoading ? (
          <div className="px-4">
            <LoadingBar />
          </div>
        ) : (
          <div className="px-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-semibold px-3 uppercase tracking-wider">
              {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </p>

            <div className="space-y-1">
              {role === "user" ? (
                <>
                  <NavLink to="/dashboard" className={navLinkClass} end>
                    <FaUser className="text-lg opacity-80" />
                    <span>Overview</span>
                  </NavLink>
                  <NavLink to="/dashboard/profile" className={navLinkClass}>
                    <FaUser className="text-lg opacity-80" />
                    <span>My Profile</span>
                  </NavLink>
                  <NavLink to="/dashboard/add-post" className={navLinkClass}>
                    <FaPlus className="text-lg opacity-80" />
                    <span>Add Post</span>
                  </NavLink>
                  <NavLink to="/dashboard/my-posts" className={navLinkClass}>
                    <FaList className="text-lg opacity-80" />
                    <span>My Posts</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/dashboard" className={navLinkClass} end>
                    <FaUser className="text-lg opacity-80" />
                    <span>Overview</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/admin-profile"
                    className={navLinkClass}
                  >
                    <FiUser className="text-lg opacity-80" />
                    <span>Admin Profile</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={navLinkClass}
                  >
                    <FaUsers className="text-lg opacity-80" />
                    <span>Manage Users</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/reported-comments"
                    className={navLinkClass}
                  >
                    <FaFlag className="text-lg opacity-80" />
                    <span>Reported Content</span>
                  </NavLink>
                  <NavLink
                    to="/dashboard/announcement"
                    className={navLinkClass}
                  >
                    <FaBullhorn className="text-lg opacity-80" />
                    <span>Announcements</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}

        <hr className="border-gray-200 dark:border-gray-700 mx-4 my-2" />

        {/* Logout */}
        <div className="px-2 pb-4">
          <ThemeToggle />
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:ml-64 min-h-screen">
        {/* Mobile Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl cursor-pointer transition-colors p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Open sidebar"
          >
            <FaBars />
          </button>
        </div>

        <div
          className="
         bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-100 dark:border-gray-700"
        >
          <Outlet />
        </div>
      </div>
      <title>Dashboard Home | ThinkHub</title>
    </div>
  );
};

export default DashboardLayout;
