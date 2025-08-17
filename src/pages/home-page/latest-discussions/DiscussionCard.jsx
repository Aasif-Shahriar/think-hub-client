import { Link } from "react-router";
import { TiMessages } from "react-icons/ti";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  TbArrowBigDown,
  TbArrowBigUp,
  TbArrowBigUpFilled,
} from "react-icons/tb";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import CommentsSection from "../post-details-&-comment/CommentsSection";

const DiscussionCard = ({ post }) => {
  const {
    _id,
    authorImage,
    authorName,
    createdAt,
    title,
    tags,
    upVote = 0,
    downVote = 0,
    upVoters = [],
    downVoters = [],
    description,
    postImage,
  } = post;

  const [showCommentSection, setShowCommentSection] = useState(false);

  const isLongDescription = description && description.length > 150;
  const truncatedDescription = isLongDescription
    ? `${description.substring(0, 150)}...`
    : description;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const userEmail = user?.email;
  const isUpVoted = upVoters.includes(userEmail);
  const isDownVoted = downVoters.includes(userEmail);

  const score = upVote - downVote;

  const handleVote = async (type) => {
    if (!user) return toast.error("Login required to vote");

    try {
      await axiosSecure.patch(`/posts/${_id}/vote`, { voteType: type });
      toast.success(`Voted ${type === "up" ? "👍 Upvote" : "👎 Downvote"}`);

      queryClient.invalidateQueries(["post", _id]);
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
    } catch (err) {
      toast.error(err.response?.data?.error || "Vote failed");
    }
  };

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${_id}/comments`);
      return res.data;
    },
  });

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Card Content */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-12 h-12 object-cover rounded-full border-2 border-gray-200 dark:border-slate-600"
          />
          <div>
            <p className="font-semibold text-lg text-gray-900 dark:text-white">
              {authorName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {moment(createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-5">
          <Link
            to={`/posts/${_id}`}
            className="block text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-3"
          >
            {title}
          </Link>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {truncatedDescription}
          </p>
          {isLongDescription && (
            <Link
              to={`/posts/${_id}`}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-semibold mt-3 inline-block"
            >
              See More &rarr;
            </Link>
          )}
        </div>
        {/* Post Image - Placed at the top for immediate visual impact */}
        {postImage && (
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={postImage}
              alt={title}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 my-6">
          {tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 text-xs font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Votes & Comments - Footer */}
      <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-700/50 py-4 px-6 rounded-b-2xl border-t border-gray-200 dark:border-slate-700">
        <div className="flex gap-2 items-center">
          {/* Upvote */}
          <button
            onClick={() => handleVote("up")}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 ease-in-out group ${
              isUpVoted
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-slate-600 text-green-500 hover:bg-green-100 dark:hover:bg-green-900"
            }`}
            aria-label="Upvote"
          >
            <TbArrowBigUp
              size={20}
              className={`transform transition-transform duration-200 ${
                isUpVoted ? "scale-110" : "group-hover:scale-110"
              }`}
            />
            <span className="font-bold text-sm">{upVote}</span>
          </button>

          {/* Downvote */}
          <button
            onClick={() => handleVote("down")}
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 ease-in-out group ${
              isDownVoted
                ? "bg-red-500 text-white"
                : "bg-gray-200 dark:bg-slate-600 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
            }`}
            aria-label="Downvote"
          >
            <TbArrowBigDown
              size={20}
              className={`transform transition-transform duration-200 ${
                isDownVoted ? "scale-110" : "group-hover:scale-110"
              }`}
            />
            <span className="font-bold text-sm">{downVote}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          {/* Total Votes */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">Votes:</span>
            <span className="font-bold">{score}</span>
          </div>

          {/* Comments */}
          {/* Comment Button */}
          <button
            onClick={() => setShowCommentSection(!showCommentSection)}
            className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <TiMessages size={18} />
            <span className="font-semibold">
              {isLoading ? "..." : comments.length}
            </span>
          </button>
        </div>

      </div>
      {/* comment section */}
       <div className="p-4">
         {showCommentSection && <CommentsSection postId={_id} />}
       </div>
    </div>
  );
};

export default DiscussionCard;
