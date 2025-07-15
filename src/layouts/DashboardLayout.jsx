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

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { role, roleLoading } = useUserRole();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-700"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-slate-800 w-64 space-y-6 z-20 overflow-y-auto fixed top-0 left-0 h-screen transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white text-xl cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        {/* Logo */}
        <Link to="/">
          <div className="space-y-1 p-4">
            <h1 className="text-2xl font-bold">ThinkHub</h1>
            <p className="text-xs font-semibold text-gray-400">
              Developer Forum
            </p>
          </div>
        </Link>

        <hr className="border-gray-600 my-4" />

        {/* User Info */}
        <div className="flex items-center gap-3 px-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/tMzM9sm/user.png"}
            alt="user"
            className="w-12 h-12 object-cover rounded-full bg-white"
          />
          <div>
            <p className="font-medium">{user?.displayName || "User Name"}</p>
            <span className="text-xs font-semibold text-gray-400 capitalize">
              {role}
            </span>
          </div>
        </div>

        <hr className="border-gray-600 my-4" />

        {/* Navigation */}
        {roleLoading ? (
          <LoadingBar />
        ) : (
          <div>
            <p className="text-xs text-gray-400 mb-2 font-semibold px-4 uppercase tracking-wide">
              {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </p>

            <div className="space-y-2">
              {role === "user" ? (
                <>
                  <NavLink to="/dashboard/profile" className={navLinkClass}>
                    <FaUser /> My Profile
                  </NavLink>
                  <NavLink to="/dashboard/add-post" className={navLinkClass}>
                    <FaPlus /> Add Post
                  </NavLink>
                  <NavLink to="/dashboard/my-posts" className={navLinkClass}>
                    <FaList /> My Posts
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/dashboard/admin-profile" className={navLinkClass}>
                    <FiUser /> Admin Profile
                  </NavLink>
                  <NavLink to="/dashboard/manage-users" className={navLinkClass}>
                    <FaUsers /> Manage Users
                  </NavLink>
                  <NavLink
                    to="/dashboard/reported-comments"
                    className={navLinkClass}
                  >
                    <FaFlag /> Reported Comments
                  </NavLink>
                  <NavLink to="/dashboard/announcement" className={navLinkClass}>
                    <FaBullhorn /> Make Announcement
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}

        <hr className="border-gray-600 my-4" />

        {/* Logout */}
        <div className="px-2 pb-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-red-600 hover:bg-red-500/10 px-3 cursor-pointer py-2 rounded-lg transition-colors duration-200"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:ml-64">
        {/* Mobile Toggle Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-300 text-2xl cursor-pointer"
          >
            <FaBars />
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
