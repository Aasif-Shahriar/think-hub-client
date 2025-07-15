import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaCommentAlt,
  FaShareAlt,
} from "react-icons/fa";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaWhatsapp, FaCopy } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const PostInfo = ({ post }) => {
  const {
    _id,
    authorImage,
    authorName,
    title,
    description,
    tags,
    upVote = 0,
    downVote = 0,
    upVoters = [],
    downVoters = [],
    createdAt,
  } = post;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState({ up: upVote, down: downVote });
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    if (!user) return;
    const email = user?.email;
    if (upVoters.includes(email)) setUserVote("up");
    else if (downVoters.includes(email)) setUserVote("down");
    else setUserVote(null);
  }, [user, upVoters, downVoters]);

  const handleVote = async (type) => {
    if (!user) return toast.error("Login required to vote");

    try {
      await axiosSecure.patch(`/posts/${_id}/vote`, {
        voteType: type,
      });

      if (userVote === type) {
        // Undo vote
        toast.success(`${type === "up" ? "Upvote" : "Downvote"} removed`);
        setUserVote(null);
        setVoteCount((prev) => ({
          up: type === "up" ? prev.up - 1 : prev.up,
          down: type === "down" ? prev.down - 1 : prev.down,
        }));
      } else if (userVote === null) {
        // First time vote
        toast.success(`Voted ${type === "up" ? "👍" : "👎"}`);
        setUserVote(type);
        setVoteCount((prev) => ({
          up: type === "up" ? prev.up + 1 : prev.up,
          down: type === "down" ? prev.down + 1 : prev.down,
        }));
      } else {
        // Switch vote
        toast.success(
          `Switched to ${type === "up" ? "👍 Upvote" : "👎 Downvote"}`
        );
        setUserVote(type);
        setVoteCount((prev) => ({
          up: type === "up" ? prev.up + 1 : prev.up - 1,
          down: type === "down" ? prev.down + 1 : prev.down - 1,
        }));
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Vote failed");
    }
  };

  //total comments
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${_id}/comments`);
      return res.data;
    },
  });

  const postUrl = `${window.location.origin}/posts/${_id}`;
  const postTime = moment(createdAt).fromNow();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 max-w-3xl mx-auto text-white space-y-4 shadow-md">
      {/* Author and Time */}
      <div className="flex items-center gap-4">
        <img
          src={authorImage}
          alt={authorName}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <div>
          <h3 className="font-semibold">{authorName}</h3>
          <p className="text-sm text-gray-300">{postTime}</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold">{title}</h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-200 text-blue-800 font-medium px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-200 leading-relaxed">{description}</p>

      <hr className="border-gray-600" />

      {/* Reactions */}
      <div className="flex flex-wrap pt-3 items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-1">
          {/* up vote button */}
          <button
            onClick={() => handleVote("up")}
            className={`flex cursor-pointer items-center gap-1 px-2 py-1 rounded-lg transition-colors duration-200 ${
              userVote === "up"
                ? "bg-green-200 text-green-600"
                : "hover:bg-green-200 text-green-500"
            }`}
          >
            <FaThumbsUp /> <span>{voteCount.up}</span>
          </button>

          {/* down vote button */}
          <button
            onClick={() => handleVote("down")}
            className={`flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg transition-colors duration-200 ${
              userVote === "down"
                ? "bg-red-200 text-red-600"
                : "hover:bg-red-200 text-red-500"
            }`}
          >
            <FaThumbsDown /> <span>{voteCount.down}</span>
          </button>

          <div className="flex items-center gap-1 cursor-pointer hover:bg-blue-200 hover:text-blue-500 px-2 py-1 text-gray-400 transition-colors duration-200 rounded-lg">
            <FaCommentAlt /> <span>{isLoading ? "..." : comments.length}</span>
          </div>
        </div>

        {/* Share Icon - triggers modal */}
        <label
          htmlFor="share_modal"
          className="flex items-center gap-1 cursor-pointer hover:bg-blue-200 hover:text-blue-500 px-2 py-1 text-gray-400 transition-colors duration-200 rounded-lg"
        >
          <FaShareAlt />
          <span>Share</span>
        </label>
      </div>

      {/* Share Modal */}
      <input type="checkbox" id="share_modal" className="modal-toggle" />
      <div className="modal sm:modal-middle text-black">
        <div className="modal-box bg-white p-6 rounded-md w-80">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg text-slate-800">Share Post</h3>
            <label
              htmlFor="share_modal"
              className="cursor-pointer text-xl font-bold"
            >
              ✕
            </label>
          </div>

          <div className="p-2">
            <FacebookShareButton
              url={postUrl}
              className="flex items-center gap-3 w-full p-2 hover:bg-blue-50 rounded-md mb-4"
            >
              <FaFacebook className="text-blue-600 text-xl" />
              <span className="text-base font-medium text-slate-700">
                Share on Facebook
              </span>
            </FacebookShareButton>

            <WhatsappShareButton
              url={postUrl}
              className="flex items-center gap-3 w-full p-2 hover:bg-green-50 rounded-md mb-2"
            >
              <FaWhatsapp className="text-green-500 text-xl" />
              <span className="text-base font-medium text-slate-700">
                Share on WhatsApp
              </span>
            </WhatsappShareButton>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-md"
            >
              <FaCopy className="text-gray-600 text-xl" />
              <span className="text-base font-medium text-slate-700">
                Copy Link
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInfo;
