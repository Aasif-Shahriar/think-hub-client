import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React from "react";
import toast from "react-hot-toast";
import { TbArrowDown, TbArrowUp } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router";

const PostCard = ({ post, user, axiosSecure, queryClient }) => {
  const {
    _id,
    authorImage,
    authorName,
    createdAt,
    title,
    tags = [],
    upVote = 0,
    downVote = 0,
    upVoters = [],
    downVoters = [],
    postImage,
  } = post;

  const userEmail = user?.email;
  const isUpVoted = upVoters.includes(userEmail);
  const isDownVoted = downVoters.includes(userEmail);
  const score = upVote - downVote;

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${_id}/comments`);
      return res.data;
    },
  });

  const handleVote = async (type) => {
    if (!user) {
      toast.error("Please login to vote");
      return;
    }

    try {
      await axiosSecure.patch(`/posts/${_id}/vote`, { voteType: type });
      toast.success(`Voted ${type === "up" ? "👍 Upvote" : "👎 Downvote"}`);
      queryClient.invalidateQueries(["featured-posts"]);
      queryClient.invalidateQueries(["comments", _id]);
    } catch (err) {
      toast.error(err.response?.data?.error || "Vote failed");
    }
  };

  return (
    <article className="group relative flex flex-col min-h-60 rounded-2xl bg-gray-100 dark:bg-slate-900/60 backdrop-blur-sm border border-white/20 shadow-md hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 overflow-hidden">
      {/* Post Image */}
      {postImage && (
        <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
          <Link to={`/posts/${_id}`} className="block w-full h-full">
            <img
              src={postImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </Link>
        </div>
      )}

      {/* Content Section */}
      <div className="flex-grow p-5 flex flex-col justify-between">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
          />
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {authorName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="h-[56px] overflow-hidden">
          <Link to={`/posts/${_id}`}>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {title}
            </h3>
          </Link>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 text-xs font-semibold rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Voting Footer */}
      <div className="flex justify-between items-center bg-slate-50/70 dark:bg-slate-800/50 p-4 border-t border-slate-200/50 dark:border-slate-700/50 flex-shrink-0">
        <div className="flex gap-2">
          <button
            onClick={() => handleVote("up")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
              isUpVoted
                ? "bg-green-500 text-white shadow-lg"
                : "bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 hover:bg-green-100 dark:hover:bg-green-900/50 hover:text-green-600 dark:hover:text-white"
            }`}
          >
            <TbArrowUp
              size={18}
              className={isUpVoted ? "scale-110" : "group-hover:scale-105"}
            />
            <span>{upVote}</span>
          </button>

          <button
            onClick={() => handleVote("down")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
              isDownVoted
                ? "bg-red-500 text-white shadow-lg"
                : "bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-white"
            }`}
          >
            <TbArrowDown
              size={18}
              className={isDownVoted ? "scale-110" : "group-hover:scale-105"}
            />
            <span>{downVote}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <TiMessages size={18} />
            <span>{comments.length}</span>
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {score}
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
