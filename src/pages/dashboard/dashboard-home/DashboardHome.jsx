import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import thinkhubImage from "../../../assets/images/developer_illustration.jpg";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <div className="text-white space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-1">
          Welcome back, {user?.displayName || "Developer"}!
        </h2>
        <p className="text-sm text-gray-300 capitalize">
          You are logged in as <span className="font-semibold">{role}</span>.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          to={
            role === "admin" ? "/dashboard/admin-profile" : "/dashboard/profile"
          }
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
        >
          <h3 className="text-lg font-semibold mb-1">View Profile</h3>
          <p className="text-sm text-gray-400">
            Check your developer profile info.
          </p>
        </Link>
        <Link
          to={
            role === "admin" ? "/dashboard/announcement" : "/dashboard/add-post"
          }
          className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
        >
          <h3 className="text-lg font-semibold mb-1">
            {role === "admin" ? "Post Announcement" : "Add New Post"}
          </h3>
          <p className="text-sm text-gray-400">
            {role === "admin"
              ? "Share updates with the community."
              : "Share your knowledge!"}
          </p>
        </Link>
        {role === "admin" && (
          <Link
            to="/dashboard/manage-users"
            className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
          >
            <h3 className="text-lg font-semibold mb-1">Manage Users</h3>
            <p className="text-sm text-gray-400">
              Control user roles and activity.
            </p>
          </Link>
        )}
        {role === "user" && (
          <Link
            to="/dashboard/my-posts"
            className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
          >
            <h3 className="text-lg font-semibold mb-1">My Posts</h3>
            <p className="text-sm text-gray-400">
              Review and manage your contributions.
            </p>
          </Link>
        )}
      </div>

      {/* Tip */}
      <div className="bg-slate-700 p-4 rounded-lg italic text-gray-300 text-sm">
        💡 "The best way to learn is by sharing what you know." – ThinkHub
      </div>

      {/* Responsive Image */}
      <div className="mt-6 flex justify-center">
        <img
          src={thinkhubImage}
          alt="ThinkHub community illustration"
          className="w-full h-full lg:h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
