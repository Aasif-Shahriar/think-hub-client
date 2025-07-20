import React from "react";
import moment from "moment";
import { FaCommentAlt, FaShareAlt } from "react-icons/fa";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { FaFacebook, FaWhatsapp, FaCopy } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";

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
  const queryClient = useQueryClient();

  const userEmail = user?.email;
  const isUpVoted = upVoters.includes(userEmail);
  const isDownVoted = downVoters.includes(userEmail);

  const handleVote = async (type) => {
    if (!user) return toast.error("Login required to vote");

    try {
      await axiosSecure.patch(`/posts/${_id}/vote`, { voteType: type });
      toast.success(`Voted ${type === "up" ? "👍 Upvote" : "👎 Downvote"}`);
      queryClient.invalidateQueries(["post", _id]); 
    } catch (err) {
      toast.error(err.response?.data?.error || "Vote failed");
    }
  };

  // Comments query
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

    const handleScrollToCommentSec = () => {
    const section = document.getElementById("comment-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
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
          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-2 select-none px-2 py-1 rounded-lg bg-slate-700">
              <button
                onClick={() => handleVote("up")}
                aria-label="Upvote"
                className={`cursor-pointer text-xl transition-colors duration-200 ${
                  isUpVoted
                    ? "text-green-400"
                    : "text-gray-400 hover:text-green-300"
                }`}
              >
                <TbArrowBigUpFilled />
              </button>

              <span className="font-bold text-white px-2">
                {upVote - downVote}
              </span>

              <button
                onClick={() => handleVote("down")}
                aria-label="Downvote"
                className={`cursor-pointer text-xl transition-colors duration-200 ${
                  isDownVoted
                    ? "text-red-400"
                    : "text-gray-400 hover:text-red-300"
                }`}
              >
                <TbArrowBigDownFilled />
              </button>
            </div>

            {/* Comments count */}
            <div onClick={handleScrollToCommentSec} className="flex items-center gap-1 cursor-pointer hover:bg-blue-200 hover:text-blue-500 px-2 py-1 text-gray-400 transition-colors duration-200 rounded-lg">
              <FaCommentAlt />
              <span>{isLoading ? "..." : comments.length}</span>
            </div>
          </div>

          {/* Share Button */}
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
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-slate-800">
                Share Post
              </h3>
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
    </>
  );
};

export default PostInfo;
