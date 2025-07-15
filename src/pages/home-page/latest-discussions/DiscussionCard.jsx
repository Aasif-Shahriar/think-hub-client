import { Link } from "react-router";
import { TiMessages } from "react-icons/ti";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {} from "react-icons/fa";
import { RxThickArrowDown, RxThickArrowUp } from "react-icons/rx";

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
  } = post;

  const axiosSecure = useAxiosSecure();

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
          <span className="flex items-center gap-1 cursor-pointer text-green-500 ">
            <RxThickArrowUp
              size={20}
              className="hover:text-green-800 transition-colors duration-200"
            />{" "}
            {upVote}
          </span>
          <span className="flex items-center gap-1 cursor-pointer text-red-500">
            <RxThickArrowDown
              size={20}
              className="hover:text-red-800 transition-colors duration-200"
            />{" "}
            {downVote}
          </span>
          <span>Score: {upVote - downVote}</span>
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
