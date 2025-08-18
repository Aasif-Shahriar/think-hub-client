import React from "react";
import { FaCrown, FaArrowUp, FaPenNib } from "react-icons/fa";
;
import Marquee from "react-fast-marquee";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "../../../components/loding/LoadingBar";


const Leaderboard = () => {

  const axiosSecure = useAxiosSecure();


  const {
  data: leaders,
  isLoading,
  isError,
  } = useQuery({
  queryKey: ["featured-posts"],
  queryFn: async () => {
  const res = await axiosSecure.get("/users/leaders");
  return res.data;
  },
  staleTime: 1000 * 60 * 5,
  });

  console.log(leaders,'leaders are here');

  if (isLoading) return <LoadingBar />;
  if (isError)
  return <div className="text-red-500">Error loading featured posts</div>;

  const getRankColor = (index) => {
    if (index === 0) return "bg-yellow-400 text-yellow-900 border-yellow-500"; // Gold
    if (index === 1) return "bg-gray-300 text-gray-800 border-gray-400"; // Silver
    if (index === 2) return "bg-yellow-600 text-white border-yellow-700"; // Bronze
    return "bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200 border-slate-300 dark:border-slate-500";
  };

  // Special gradient classes for the top 3
  const getGlowEffect = (index) => {
    if (index === 0) return "shadow-[0_0_15px_rgba(250,204,21,0.7)]"; // Gold glow
    if (index === 1) return "shadow-[0_0_15px_rgba(209,213,219,0.7)]"; // Silver glow
    if (index === 2) return "shadow-[0_0_15px_rgba(202,138,4,0.7)]"; // Bronze glow
    return "";
  };

  return (
    <section className="max-w-[1560px] mx-auto px-4  p-6 sm:p-8 ">
      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">
      
        Top Contributors
      </h2>

      <Marquee
        pauseOnHover
        gradient
        gradientColor={
          document.documentElement.classList.contains("dark")
            ? [30, 41, 59] // Corresponds to dark:bg-slate-800
            : [255, 255, 255] // Corresponds to bg-white
        }
        gradientWidth={100}
        speed={60}
      >
        {leaders?.map((user, index) => (
          <div
            key={user._id}
            className={`
              relative flex flex-col items-center justify-center
              w-48 h-48 sm:w-56 sm:h-56 m-4
              bg-white/60 dark:bg-slate-700/60 backdrop-blur-md
              rounded-2xl border border-white/20
              shadow-lg hover:shadow-xl
              transform hover:-translate-y-2 transition-all duration-300
              ${getGlowEffect(index)}
            `}
          >
            {/* Rank Badge */}
            <div
              className={`
                absolute -top-4 -left-4
                flex items-center justify-center
                w-10 h-10 sm:w-12 sm:h-12
                rounded-full font-bold text-lg
                border-2 shadow-md
                ${getRankColor(index)}
              `}
            >
              {index + 1}
            </div>

            {/* Avatar */}
            <img
              src={user.authorImage}
              alt={user.authorName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white/50 dark:border-slate-500/50 shadow-lg"
            />

            {/* User Info */}
            <div className="text-center mt-3">
              <h3 className="font-bold text-md sm:text-lg text-slate-800 dark:text-white truncate w-40">
                {user.authorName}
              </h3>
              <div className="flex justify-center items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                <span className="flex items-center gap-1.5">
                  <FaPenNib className="text-blue-500" />
                  <strong>{user.postCount}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <FaArrowUp className="text-green-500" />
                  <strong>{user.score}</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Leaderboard;
