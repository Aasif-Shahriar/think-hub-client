import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../../../hooks/useAuth";
import useUserRole from "../../../../hooks/useUserRole";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingBar from "../../../../components/loding/LoadingBar";
import toast from "react-hot-toast";

const COLORS = ["#2563EB", "#10B981", "#F59E0B"];

const AdminProfile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();

  // for tags
  const queryClient = useQueryClient();
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return toast.error("Tag name cannot be empty");

    try {
      setLoading(true);
      await axiosSecure.post("/tags", { name: newTag.trim() });
      setNewTag("");
      toast.success("Tag added successfully!");
      queryClient.invalidateQueries(["tags"]);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warning("Tag already exists.");
      } else {
        toast.error("Failed to add tag.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <LoadingBar />;

  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load admin stats.
      </div>
    );

  const data = [
    { name: "Posts", value: stats.totalPosts },
    { name: "Comments", value: stats.totalComments },
    { name: "Users", value: stats.totalUsers },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-slate-800 p-6 rounded-2xl shadow-md text-white">
      <title>Admin Profile | ThinkHub</title>

      {/* admin profile */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user?.photoURL || "https://i.ibb.co/tMzM9sm/user.png"}
          alt="Admin"
          className="w-20 h-20 rounded-full border-4 border-blue-600"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <span className="text-xs font-medium text-green-500 uppercase">
            {role}
          </span>
        </div>
      </div>
      {/* stats card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-700 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-500">{stats.totalPosts}</p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">
            Total Comments
          </h3>
          <p className="text-3xl font-bold text-green-500">
            {stats.totalComments}
          </p>
        </div>
        <div className="bg-slate-700 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-300">Total Users</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {stats.totalUsers}
          </p>
        </div>
      </div>
      {/* overview chart */}
      <div className="bg-slate-700 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Overview Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* --- Tag Creation Form --- */}
      <div className="mt-10 bg-slate-700 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Tag</h3>
        <form onSubmit={handleAddTag} className="max-w-md">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 shadow-sm text-blue-500 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new tag name"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-md
                 hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Tag"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
