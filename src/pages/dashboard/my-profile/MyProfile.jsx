import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaClock,
  FaHeart,
  FaComments,
  FaEdit,
  FaSave,
  FaTimes,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";
import moment from "moment";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingBar from "../../../components/loding/LoadingBar";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [aboutMe, setAboutMe] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: dbUser = {},
    isLoading: loadingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: recentPosts = [], isLoading: loadingPosts } = useQuery({
    queryKey: ["recentPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts/user/${encodeURIComponent(user.email)}?limit=3&sort=recent`
      );
      return res.data.posts || [];
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (dbUser?.aboutMe) setAboutMe(dbUser.aboutMe);
  }, [dbUser]);

  const saveAboutMe = async () => {
    try {
      await axiosSecure.patch(`/users/${user.email}`, { aboutMe });
      toast.success("About Me updated successfully!");
      setIsEditing(false);
      refetchUser();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update About Me");
    }
  };

  return (
    <div className="space-y-6">
      <title>My Profile | ThinkHub</title>

      {/* Profile Header */}
      {loadingUser ? (
        <div className="flex justify-center py-12">
          <LoadingBar />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="relative">
            {dbUser?.photoURL ? (
              <img
                src={dbUser.photoURL}
                alt="User profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500/20 dark:border-blue-600/30 shadow-md"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-gray-300 dark:text-gray-600" />
            )}
            <div className="absolute bottom-3 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dbUser.name || "User Name"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium mt-1">
              {dbUser.email}
            </p>

            {/* Membership Badges */}
            {dbUser.isMember && (
              <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                  <span className="mr-1">🥉</span> Bronze Member
                </span>

                {dbUser.membership === "gold" && (
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 shadow-[0_0_8px_-2px_rgba(234,179,8,0.3)]">
                    <span className="mr-1">🥇</span> Gold Member
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Me Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            About Me
          </h3>
          {isEditing ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveAboutMe}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1"
              >
                <FaSave className="text-sm" />
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm font-medium transition-colors"
            >
              <FaEdit className="text-sm" />
              Edit Bio
            </button>
          )}
        </div>

        {isEditing ? (
          <div>
            <textarea
              rows={5}
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Tell the community about yourself..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Markdown is supported in your bio
            </p>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {aboutMe ? (
              <ReactMarkdown className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {aboutMe}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                No bio provided yet. Click "Edit Bio" to add one.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            My Recent Posts
          </h3>
          <Link
            to="/dashboard/my-posts"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
          >
            View All <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {loadingPosts ? (
          <div className="flex justify-center py-8">
            <LoadingBar />
          </div>
        ) : recentPosts.length === 0 ? (
          <div className="text-center py-8">
            <FaFileAlt className="mx-auto text-3xl text-gray-400 dark:text-gray-500 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
            <Link
              to="/dashboard/add-post"
              className="inline-block mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm font-medium transition-colors"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                to={`/posts/${post._id}`}
                key={post._id}
                className="block bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h4>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Post Meta */}
                <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-xs" />
                    <span>{moment(post.createdAt).fromNow()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaHeart className="text-xs" />
                    <span>
                      {post.upVote}{" "}
                      {(post.upVote || 0) === 1 ? "like" : "likes"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaComments className="text-xs" />
                    <span>
                      {post.commentsCount || 0}{" "}
                      {post.commentsCount === 1 ? "reply" : "replies"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
