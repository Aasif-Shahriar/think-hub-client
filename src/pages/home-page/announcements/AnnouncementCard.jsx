import moment from "moment";
import { useState } from "react";

export const AnnouncementCard = ({
  title,
  description,
  authorName,
  authorImage,
  createdAt,
}) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = description.length > 180;

  return (
    <li className="bg-slate-800 p-4 rounded-md flex gap-4 items-start">
      <img
        src={authorImage}
        alt={authorName}
        className="w-12 h-12 rounded-full object-cover mt-1 bg-blue-100 hidden md:block"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between my-2">
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm font-semibold text-gray-400">
            {moment(createdAt).fromNow()}
          </p>
        </div>

        <p
          className={`text-sm text-gray-400 ${
            !expanded && isLong ? "line-clamp-2" : ""
          }`}
        >
          {description}
        </p>

        {isLong && (
          <button
            className="text-blue-400 text-sm mt-1 hover:underline cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}

        <small className="italic text-gray-500 block mt-1">
          — {authorName}
        </small>
      </div>
    </li>
  );
};
