import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaClock,
  FaThumbsUp,
  FaComments,
  FaEdit,
  FaHeart,
} from "react-icons/fa";
import moment from "moment";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingBar from "../../../components/loding/LoadingBar";

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
  console.log(dbUser);
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

  //  Save aboutMe in the db
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

      {/* Top Section */}
      {loadingUser ? (
        <LoadingBar />
      ) : (
        <div className="bg-slate-800 rounded-lg p-6 flex items-center gap-6">
          {dbUser?.photoURL ? (
            <img
              src={dbUser.photoURL}
              alt="User"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-gray-400" />
          )}
          <div>
            <h2 className="text-2xl font-semibold">
              {dbUser.name || "User Name"}
            </h2>
            <p className="text-gray-400 text-sm font-semibold">
              {dbUser.email}
            </p>
            {/* membership badge */}
            {dbUser.isMember && (
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide bg-orange-600/10 text-orange-600">
                  🥉 Bronze Badge
                </span>

                {dbUser.membership === "gold" && (
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide bg-yellow-500/10 text-yellow-500">
                    🥇 Gold Badge
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Me */}
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">About Me</h3>
          {isEditing ? (
            <button
              onClick={saveAboutMe}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              <FaEdit />
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <textarea
            rows={5}
            className="w-full bg-slate-900 text-white p-3 rounded resize-none"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        ) : (
          <p className="text-gray-300 whitespace-pre-line">
            {aboutMe || "No description provided."}
          </p>
        )}
      </div>

      <hr className="border-gray-700" />

      {/* Recent Posts */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">My Recent Posts</h3>

        {loadingPosts ? (
          <LoadingBar />
        ) : recentPosts.length === 0 ? (
          <p className="text-gray-400">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-slate-900 rounded p-4 hover:bg-slate-700 transition"
              >
                <h4 className="text-lg font-semibold">{post.title}</h4>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs capitalize font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex gap-6 text-gray-400 text-xs font-semibold items-center">
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{moment(post.createdAt).fromNow()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeart />
                    <span>
                      {post.upVote}{" "}
                      {(post.upVote || 0) === 1 ? "like" : "likes"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComments size={16} />
                    <span>
                      {post.commentsCount || 0}{" "}
                      {post.commentsCount === 1 ? "reply" : "replies"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
