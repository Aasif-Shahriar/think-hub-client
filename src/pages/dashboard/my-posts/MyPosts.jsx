import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FaArrowUp,
  FaArrowDown,
  FaComments,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import LoadingBar from "../../../components/loding/LoadingBar";

const POSTS_PER_PAGE = 3;

const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myPosts", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts/user/${user.email}?page=${page}&limit=${POSTS_PER_PAGE}`
      );
      return res.data;
    },
  });

  const posts = data?.posts || [];
  const totalPosts = data?.total || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/posts/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        console.error("Delete error:", err);
        Swal.fire("Error", "Failed to delete post.", "error");
      }
    }
  };

  if (isLoading) return <LoadingBar />;

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">My Posts</h2>
          <p className="text-sm text-gray-400 font-semibold">
            You’ve created {totalPosts} post{totalPosts !== 1 && "s"}
          </p>
        </div>
        <Link
          to="/dashboard/add-post"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 px-4 py-2 rounded"
        >
          <FaPlus /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400">You haven’t posted anything yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-left text-white">
            <thead className="bg-slate-700 text-gray-200 text-sm uppercase">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Votes</th>
                <th className="p-4">Comments</th>
                <th className="p-4">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800">
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                >
                  <td className="p-4">
                    <div className="font-semibold text-gray-300">
                      {post.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {moment(post.createdAt).fromNow()}
                    </div>
                  </td>
                  <td className="p-4 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-400">
                      <FaArrowUp /> {post.upVote || 0}
                    </span>
                    <span className="flex items-center gap-1 text-red-400">
                      <FaArrowDown /> {post.downVote || 0}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300 text-sm mb-1">
                      {post.commentsCount || 0}{" "}
                      {post.commentsCount === 1 ? "Comment" : "Comments"}
                    </div>
                    <Link
                      to={`/dashboard/comments/${post._id}`}
                      className="inline-flex items-center gap-2 text-blue-400 hover:underline"
                    >
                      <FaComments /> Manage
                    </Link>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-500 bg-red-500/10 px-2 py-3 rounded-lg hover:bg-red-500/20 hover:text-red-600 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {/* Prev */}
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded cursor-pointer ${
                  page === 1
                    ? "bg-slate-600 text-gray-400 cursor-not-allowed"
                    : "bg-slate-700 text-gray-200 hover:bg-slate-600"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    page === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className={`px-3 py-1 rounded cursor-pointer ${
                  page === totalPages
                    ? "bg-slate-600 text-gray-400 cursor-not-allowed"
                    : "bg-slate-700 text-gray-200 hover:bg-slate-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
