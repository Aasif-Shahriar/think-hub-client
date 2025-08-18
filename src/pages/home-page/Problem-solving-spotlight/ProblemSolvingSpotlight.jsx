import {useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrophy, FaLightbulb, FaCode, FaClock } from "react-icons/fa";
import { TbArrowBigUp } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";

const ProblemSolvingSpotlight = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [expandedChallenge, setExpandedChallenge] = useState(null);

  const {
    data: challenges = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coding-challenges"],
    queryFn: async () => {
      const res = await axiosSecure.get("/challenges");
      return res.data;
    },
  });

  // Inside your component
const queryClient = useQueryClient();

  const handleParticipate = async (challengeId) => {
    if (!user) {
      toast.error("Please login to participate");
      return;
    }
    try {
      await axiosSecure.patch(`/challenges/${challengeId}/participate`);
      toast.success("Challenge participation recorded!");
      // Refresh the challenges data
      queryClient.invalidateQueries(["coding-challenges"]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Participation failed");
    }
  };

  const toggleExpand = (id) => {
    setExpandedChallenge(expandedChallenge === id ? null : id);
  };

  if (isLoading)
    return <div className="text-center py-12">Loading challenges...</div>;
  if (isError)
    return (
      <div className="text-center py-12 text-red-500">
        Error loading challenges
      </div>
    );

  return (
    <section className="py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1560px] px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-black dark:text-white">
          <FaTrophy className="text-yellow-500" />
          Problem-Solving Spotlight
          <FaLightbulb className="text-yellow-300" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <div
              key={challenge._id}
              className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {challenge.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      challenge.difficulty === "Easy"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : challenge.difficulty === "Intermediate"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {challenge.description}
                </p>

                {expandedChallenge === challenge._id ? (
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                        Problem:
                      </h4>
                      <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                        {challenge.problem}
                      </pre>
                    </div>

                    {challenge.solution && (
                      <details className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg">
                        <summary className="font-semibold cursor-pointer text-gray-900 dark:text-white">
                          View Solution
                        </summary>
                        <pre className="mt-2 text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                          {challenge.solution}
                        </pre>
                      </details>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>
                      {new Date(challenge.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbArrowBigUp />
                    <span>{challenge.participants || 0} participants</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700/30 px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                <button
                  onClick={() => toggleExpand(challenge._id)}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer text-sm font-medium"
                >
                  {expandedChallenge === challenge._id
                    ? "Show Less"
                    : "View Challenge"}
                </button>

                <button
                  onClick={() => handleParticipate(challenge._id)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
                >
                  <FaCode />
                  Participate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolvingSpotlight;
