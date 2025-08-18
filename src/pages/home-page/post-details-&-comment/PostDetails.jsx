import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PostInfo from "./PostInfo";
import CommentsSection from "./CommentsSection";
import { toast } from "react-hot-toast";
import LoadingBar from "../../../components/loding/LoadingBar";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingBar />;
  if (isError) {
    toast.error("Failed to load post");
    return <div className="text-center text-red-500">Error loading post</div>;
  }

  return (
    <>
      <div className="bg-gray-100 dark:bg-slate-700 min-h-[calc(100vh-16rem)] text-gray-900 dark:text-white px-4 py-8 transition-colors duration-300">
        {/* Post Info */}
        <PostInfo post={post} />

        {/* Comments Section */}
        <section id="comment-section" className="mt-8">
          <CommentsSection postId={id} />
        </section>

        {/* Page Title */}
        <title>Post Details | ThinkHub</title>
      </div>
    </>
  );
};

export default PostDetails;
