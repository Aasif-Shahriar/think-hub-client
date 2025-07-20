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

  return (
    <section className="py-10 max-w-[1440px] mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl text-gray-100 font-bold">Latest Discussions</h2>

        {searchTag && (
          <p className="text-sm text-blue-400 italic">
            Showing results for tag:{" "}
            <span className="font-medium">#{searchTag}</span>
          </p>
        )}

        <div className="flex items-center gap-2 justify-end">
          <span className="text-sm text-gray-400">Sorted by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1.5 rounded-md bg-slate-800 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingBar />
      ) : isError ? (
        <p className="text-red-500 text-center">Failed to load posts.</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">
          No posts found{searchTag ? ` for tag #${searchTag}` : ""}.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={post._id} data-aos="fade-up" data-aos-delay={index * 100}>
              <DiscussionCard post={post} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          {/* Prev Button */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`p-2 rounded-full bg-slate-800 text-white hover:bg-blue-600 transition ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowLeft />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`w-8 h-8 rounded text-sm transition ${
                pg === page
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {pg}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`p-2 rounded-full bg-slate-800 text-white hover:bg-blue-600 transition ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestDiscussions;
