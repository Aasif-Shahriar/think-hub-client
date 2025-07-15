import React, { useState } from "react";
import { Outlet, NavLink } from "react-router";
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

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, role, logout } = useAuth(); // Replace with your auth logic

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-700"
    }`;

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-64 bg-slate-800 space-y-6 fixed md:relative z-20 h-screen overflow-y-auto`}
      >
        {/* Close Button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Section 1: Logo */}
        <div className="space-y-1 p-4">
          <h1 className="text-2xl font-bold">ThinkHub</h1>
          <p className="text-sm text-gray-400">Developer Forum</p>
        </div>

        <hr className="border-gray-600 my-4" />

        {/* Section 2: User Info */}
        <div className="flex items-center gap-2 px-4">
          <img
            src={user?.photoURL || "https://i.ibb.co/tMzM9sm/user.png"}
            alt="user"
            className="w-12 h-12 object-cover rounded-full bg-white"
          />
          <div>
            <p className="font-medium">{user?.displayName || "User Name"}</p>
            <span className="text-sm text-gray-400 capitalize">
              {role || "undefine"}
            </span>
          </div>
        </div>

        <hr className="border-gray-600 my-4" />

        {/* Section 3: Navigation */}
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

        <hr className="border-gray-600 my-4" />

        {/* Section 4: Logout */}
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
      <div className="flex-1 ml-0 md:ml-64 p-4">
        {/* Mobile menu toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-300 text-2xl"
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
