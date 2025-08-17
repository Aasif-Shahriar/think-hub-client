import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import DiscussionCard from "./DiscussionCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import LoadingBar from "../../../components/loding/LoadingBar";

const LatestDiscussions = ({ searchTag }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("recent");
  const limit = 5;
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setPage(1);
  }, [searchTag]);

  const {
    data: postData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", page, sortBy, searchTag],
    queryFn: async () => {
      const url = searchTag
        ? `/posts/search?tag=${searchTag}`
        : `/posts?page=${page}&limit=${limit}&sort=${sortBy}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const posts = postData.posts || [];
  const totalPosts = postData.total || 0;
  const totalPages = Math.ceil(totalPosts / limit);

  if (isLoading) {
    return (
      <div className="py-10 max-w-[1560px] mx-auto px-4">
        <LoadingBar />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 max-w-[1560px] mx-auto px-4">
        <p className="text-red-500 text-center">
          Failed to load discussions. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <section className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Latest Discussions
        </h2>

        {searchTag && (
          <p className="text-sm text-blue-500 dark:text-blue-400 italic">
            Showing results for tag:{" "}
            <span className="font-medium">#{searchTag}</span>
          </p>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Sorted by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-md bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white text-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-300 min-w-[120px]"
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="flex flex-col gap-5">
          {posts.map((post, index) => (
            <div key={post._id} data-aos="fade-up" data-aos-delay={index * 100}>
              <DiscussionCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {searchTag
              ? `No discussions found for "${searchTag}". Try a different tag.`
              : "Start a discussion to see the latest conversations here."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 dark:bg-slate-700 text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <FaArrowLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`w-10 h-10 rounded-full transition ${
                pg === page
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-800 dark:bg-slate-700 text-white hover:bg-gray-700 dark:hover:bg-slate-600"
              }`}
              aria-current={pg === page ? "page" : undefined}
            >
              {pg}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 dark:bg-slate-700 text-white hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestDiscussions;
