import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import thinkhubImage from "../../../assets/images/developer_illustration.jpg";
import { FaBullhorn, FaLightbulb, FaList, FaPlus, FaUser, FaUsers } from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-1">
          Welcome back,{" "}
          <span className="text-yellow-200">
            {user?.displayName || "Developer"}
          </span>
          !
        </h2>
        <p className="text-sm text-blue-100 dark:text-blue-200 capitalize">
          You are logged in as{" "}
          <span className="font-semibold text-white">{role}</span>
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          to={
            role === "admin" ? "/dashboard/admin-profile" : "/dashboard/profile"
          }
          className="group bg-white dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 transition-colors">
              <FaUser className="text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              View Profile
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 ml-11">
            {role === "admin"
              ? "Manage your admin profile"
              : "Check your developer profile info"}
          </p>
        </Link>

        <Link
          to={
            role === "admin" ? "/dashboard/announcement" : "/dashboard/add-post"
          }
          className="group bg-white dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-600 dark:text-green-400 group-hover:bg-green-600 group-hover:text-white dark:group-hover:bg-green-600 transition-colors">
              {role === "admin" ? (
                <FaBullhorn className="text-lg" />
              ) : (
                <FaPlus className="text-lg" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {role === "admin" ? "Post Announcement" : "Add New Post"}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 ml-11">
            {role === "admin"
              ? "Share updates with the community"
              : "Share your knowledge with others"}
          </p>
        </Link>

        {role === "admin" ? (
          <Link
            to="/dashboard/manage-users"
            className="group bg-white dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-600 transition-colors">
                <FaUsers className="text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Manage Users
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 ml-11">
              Control user roles and community activity
            </p>
          </Link>
        ) : (
          <Link
            to="/dashboard/my-posts"
            className="group bg-white dark:bg-gray-800 p-5 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-amber-600 transition-colors">
                <FaList className="text-lg" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                My Posts
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 ml-11">
              Review and manage your contributions
            </p>
          </Link>
        )}
      </div>

      {/* Tip */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50">
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-300">
            <FaLightbulb className="text-lg" />
          </div>
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200 italic">
              "The best way to learn is by sharing what you know."
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1 font-medium">
              — ThinkHub Community
            </p>
          </div>
        </div>
      </div>

      {/* Community Image */}
      <div className="mt-6 overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <img
          src={thinkhubImage}
          alt="ThinkHub community illustration"
          className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="bg-gradient-to-t from-gray-900/80 to-transparent p-4 relative -mt-16">
          <p className="text-white text-sm font-medium">
            Join our growing community of{" "}
            {role === "admin" ? "developers" : "learners"} today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
