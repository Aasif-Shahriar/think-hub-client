import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import thinkhubImage from "../../../assets/images/developer_illustration.jpg";
import {
  FaBullhorn,
  FaChartBar,
  FaCrown,
  FaLightbulb,
  FaList,
  FaPlus,
  FaRegCommentDots,
  FaUser,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// --- Mock Data for Stats and Chart (Replace with actual data) ---
const userStats = {
  posts: 28,
  upvotes: 124,
  comments: 76,
};

const adminStats = {
  totalUsers: "1,245",
  postsToday: 89,
  activeDiscussions: 312,
};

const weeklyActivityData = [
  { name: "Mon", posts: 4 },
  { name: "Tue", posts: 3 },
  { name: "Wed", posts: 8 },
  { name: "Thu", posts: 5 },
  { name: "Fri", posts: 7 },
  { name: "Sat", posts: 11 },
  { name: "Sun", posts: 6 },
];

// --- Reusable Card Component ---
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-5 rounded-xl shadow-md border border-white/20 flex items-center gap-4">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <p className="text-2xl font-bold text-slate-800 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const { role } = useUserRole(); // Assuming role is 'user' or 'admin'

  const stats = role === "admin" ? adminStats : userStats;

  return (
    <div className="space-y-6">
      {/* --- Welcome Banner --- */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-6 rounded-2xl shadow-lg text-white overflow-hidden">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-8 -left-2 w-48 h-48 bg-white/10 rounded-lg transform rotate-45"></div>
        <div className="relative z-10 flex items-center gap-4">
          <img
            src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.uid}`}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-4 border-white/30 shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold mb-1">
              Welcome Back,{" "}
              <span className="text-yellow-300">
                {user?.displayName || "Developer"}
              </span>
              !
            </h2>
            <p className="text-sm text-blue-100 dark:text-blue-200 capitalize font-medium px-3 py-1 bg-white/10 rounded-full inline-block">
              {role} Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Left Column (Main) --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* --- Stats Overview --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {role === "admin" ? (
              <>
                <StatCard
                  icon={<FaUsers size={20} className="text-white" />}
                  title="Total Users"
                  value={stats.totalUsers}
                  color="bg-purple-500"
                />
                <StatCard
                  icon={<FaPlus size={20} className="text-white" />}
                  title="Posts Today"
                  value={stats.postsToday}
                  color="bg-green-500"
                />
                <StatCard
                  icon={<FaRegCommentDots size={20} className="text-white" />}
                  title="Active Discussions"
                  value={stats.activeDiscussions}
                  color="bg-sky-500"
                />
              </>
            ) : (
              <>
                <StatCard
                  icon={<FaList size={20} className="text-white" />}
                  title="Posts Created"
                  value={stats.posts}
                  color="bg-amber-500"
                />
                <StatCard
                  icon={<FaArrowUp size={20} className="text-white" />}
                  title="Total Upvotes"
                  value={stats.upvotes}
                  color="bg-green-500"
                />
                <StatCard
                  icon={<FaRegCommentDots size={20} className="text-white" />}
                  title="Comments Received"
                  value={stats.comments}
                  color="bg-sky-500"
                />
              </>
            )}
          </div>

          {/* --- Weekly Activity Chart --- */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-white/20">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <FaChartBar className="text-indigo-500" /> Weekly Activity
            </h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart
                  data={weeklyActivityData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "currentColor", opacity: 0.6 }}
                  />
                  <YAxis tick={{ fill: "currentColor", opacity: 0.6 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(5px)",
                      border: "none",
                      borderRadius: "10px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="posts"
                    name="New Posts"
                    fill="#4f46e5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* --- Right Column (Sidebar) --- */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-white/20">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <QuickActionLink
                to={
                  role === "admin"
                    ? "/dashboard/admin-profile"
                    : "/dashboard/profile"
                }
                icon={<FaUser />}
                title="View Profile"
              />
              <QuickActionLink
                to={
                  role === "admin"
                    ? "/dashboard/announcement"
                    : "/dashboard/add-post"
                }
                icon={role === "admin" ? <FaBullhorn /> : <FaPlus />}
                title={role === "admin" ? "Make Announcement" : "Add New Post"}
              />
              <QuickActionLink
                to={
                  role === "admin"
                    ? "/dashboard/manage-users"
                    : "/dashboard/my-posts"
                }
                icon={role === "admin" ? <FaUsers /> : <FaList />}
                title={role === "admin" ? "Manage Users" : "My Posts"}
              />
            </div>
          </div>

          {/* Tip */}
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/50">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-800 rounded-lg text-amber-600 dark:text-amber-300">
                <FaLightbulb className="text-lg" />
              </div>
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-200 italic">
                  "The best way to learn is by sharing what you know."
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-300 mt-1 font-medium">
                  — ThinkHub Community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Quick Action Link Component
const QuickActionLink = ({ to, icon, title }) => (
  <Link
    to={to}
    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
  >
    <div className="p-2 bg-slate-100 dark:bg-slate-700/80 rounded-lg text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <span className="font-semibold text-slate-700 dark:text-slate-200">
      {title}
    </span>
  </Link>
);

export default DashboardHome;
