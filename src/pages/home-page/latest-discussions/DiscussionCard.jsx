import { Link } from "react-router";
import { TiMessages } from "react-icons/ti";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TbArrowBigUp, TbArrowBigUpFilled } from "react-icons/tb";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";

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
  } = post;

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
    <div className="rounded-xl bg-slate-800 text-white p-5 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={authorImage}
          alt={authorName}
          className="w-10 h-10 object-cover rounded-full"
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
        <div className="flex gap-0.5 items-center">
          <div
            className={`flex gap-0.5 items-center rounded-lg px-2 py-1 transition-colors duration-200
    ${
      isUpVoted
        ? "bg-green-500 text-white"
        : "bg-transparent text-green-500 hover:text-green-600"
    }`}
          >
            <button
              onClick={() => handleVote("up")}
              className="flex items-center gap-1 cursor-pointer"
              aria-label="Upvote"
            >
              {isUpVoted ? (
                <TbArrowBigUpFilled size={20} />
              ) : (
                <TbArrowBigUp size={20} />
              )}
            </button>
            <span className="font-semibold">{upVote}</span>
          </div>

          <div
            className={`flex gap-0.5 items-center rounded-lg px-2 py-1 transition-colors duration-200
    ${
      isDownVoted
        ? "bg-red-500 text-white"
        : "bg-transparent text-red-500 hover:text-red-600"
    }`}
          >
            <button
              onClick={() => handleVote("down")}
              className="flex items-center gap-1 cursor-pointer"
              aria-label="Downvote"
            >
              {isDownVoted ? (
                <TbArrowBigUpFilled size={20} className="rotate-180" />
              ) : (
                <TbArrowBigUp size={20} className="rotate-180" />
              )}
            </button>
            <span className="font-semibold">{downVote}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold">Votes: {score}</span>
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
