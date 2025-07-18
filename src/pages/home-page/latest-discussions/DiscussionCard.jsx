import { Link } from "react-router";
import { TiMessages } from "react-icons/ti";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbArrowBigUp, TbArrowBigUpFilled } from "react-icons/tb";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DiscussionCard = ({ post }) => {
  const {
    _id,
    authorImage,
    authorName,
    createdAt,
    title,
    tags,
    upVote,
    downVote,
    upVoters = [],
    downVoters = [],
  } = post;

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
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

  return (
    <div className="rounded-xl bg-slate-800 text-white p-5 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={authorImage}
          alt={authorName}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{authorName}</p>
          <p className="text-sm text-gray-400">{moment(createdAt).fromNow()}</p>
        </div>
      </div>

      {/* Title */}
      <Link
        to={`/posts/${_id}`}
        className="block text-xl font-bold text-white hover:text-blue-500 transition-colors duration-150 mb-3"
      >
        {title}
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Votes & Comments */}
      <div className="flex justify-between text-sm text-gray-300 items-center">
        <div className="flex gap-4">
          <button
            onClick={() => handleVote("up")}
            className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded-lg transition-colors duration-200 ${
              userVote === "up"
                ? "text-green-600"
                : "text-green-500 hover:text-green-600"
            }`}
          >
            {userVote === "up" ? (
              <TbArrowBigUpFilled size={20} />
            ) : (
              <TbArrowBigUp size={20} />
            )}
            <span>{voteCount.up}</span>
          </button>

          <button
            onClick={() => handleVote("down")}
            className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded-lg transition-colors duration-200 ${
              userVote === "down"
                ? "text-red-600"
                : "text-red-500 hover:text-red-600"
            }`}
          >
            {userVote === "down" ? (
              <TbArrowBigUpFilled size={20} className="rotate-180" />
            ) : (
              <TbArrowBigUp size={20} className="rotate-180" />
            )}
            <span>{voteCount.down}</span>
          </button>
        </div>
        <div className="flex items-center gap-1">
          <TiMessages size={16} />
          <span>{isLoading ? "..." : comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
