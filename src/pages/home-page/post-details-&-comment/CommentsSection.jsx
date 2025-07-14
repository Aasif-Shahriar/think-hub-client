import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingBar from "../../../components/loding/LoadingBar";

const CommentsSection = ({ postId }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  // Fetch comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${postId}/comments`);
      return res.data;
    },
  });

  // Submit comment
  const onSubmit = async (data) => {
    if (!user) return toast.error("Login required to comment");

    const commentData = {
      text: data.comment,
      userName: user?.displayName,
      userImage: user?.photoURL,
    };

    try {
      setLoading(true);
      await axiosSecure.post(`/posts/${postId}/comments`, commentData);
      toast.success("Comment added!");
      reset();
      queryClient.invalidateQueries(["comments", postId]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-10 text-white">
      {/* Top Heading */}
      <h2 className="text-2xl font-semibold mb-6">
        Comments ({comments.length})
      </h2>

      {/* Comment Input Section */}
      {user ? (
        <div className="bg-slate-800 p-5 rounded-lg mb-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4">
              {/* User Image */}
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full object-cover bg-white"
              />

              {/* Textarea */}
              <div className="flex-1">
                {/* Textarea */}
                <textarea
                  {...register("comment", { required: "Comment is required." })}
                  placeholder="Write your comment..."
                  className={`w-full bg-slate-700 text-white p-3 rounded-md resize-none h-24 ${
                    errors.comment ? "border border-red-500" : ""
                  }`}
                  disabled={loading}
                ></textarea>

                {/* Error Message */}
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Post Comment"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p className="text-gray-400 mb-8">Please log in to leave a comment.</p>
      )}

      {/* Comments Section */}
      {isLoading ? (
        <LoadingBar />
      ) : comments.length === 0 ? (
        <p className="text-gray-400">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((c) => {
            const isLong = c.text.length > 150;

            return (
              <div
                key={c._id}
                className="bg-slate-800 p-4 rounded-md flex gap-4"
              >
                <img
                  src={c.userImage}
                  alt={c.userName}
                  className="w-10 h-10 object-cover rounded-full bg-white"
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{c.userName}</h4>
                    <span className="text-xs text-gray-400">
                      {moment(c.createdAt).fromNow()}
                    </span>
                  </div>

                  <p className="text-gray-200 line-clamp-2">{c.text}</p>

                  {isLong && (
                    <button
                      onClick={() => setSelectedComment(c)}
                      className="text-sm text-blue-400 mt-1 hover:underline cursor-pointer"
                    >
                      Read More
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Full Comment */}
      {selectedComment && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-center justify-center px-4">
          <div className="bg-slate-900 p-6 rounded-lg max-w-lg w-full relative text-white">
            <button
              onClick={() => setSelectedComment(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-3">
              {selectedComment.userName}
            </h3>
            <p className="text-gray-200 whitespace-pre-wrap">
              {selectedComment.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
