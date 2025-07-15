import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import LoadingBar from "../../../components/loding/LoadingBar";
import { FaPaperPlane } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const tagOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "mongodb", label: "MongoDB" },
  { value: "node", label: "Node.js" },
  { value: "firebase", label: "Firebase" },
  { value: "css", label: "CSS" },
];

const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#0f172a",
    borderColor: "#334155",
    color: "#fff",
    padding: "0.25rem",
    borderRadius: "0.5rem",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1e293b",
    color: "#fff",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#334155",
    color: "#fff",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#fff",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#3b82f6" : "#1e293b",
    color: "#fff",
    cursor: "pointer",
  }),
};

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Get post count
  const { data: postCount = 0, isLoading } = useQuery({
    queryKey: ["userPostCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user/${user.email}?limit=1`);
      return res.data.total;
    },
  });

  const onSubmit = async (data) => {
    const newPost = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      title: data.title,
      description: data.description,
      tags: data.tags.map((tag) => tag.value),
    };

    try {
      const res = await axiosSecure.post("/posts", newPost);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Post Created!",
          text: "Your post has been published to ThinkHub 🎉",
          confirmButtonText: "View My Posts",
          confirmButtonColor: "#2563EB",
        }).then(() => {
          navigate("/dashboard/my-posts");
        });
        reset();
      }
    } catch (err) {
      console.error("Post creation error:", err);
    }
  };

  if (isLoading) return <LoadingBar />;

  // Post limit check
  if (postCount >= 5) {
    return (
      <div className="text-center mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-red-500">
          You've reached your post limit (5 posts).
        </h2>
        <p className="text-gray-400">
          Upgrade your membership to create more posts.
        </p>
        {/* use react-router link */}
        <a href="/membership">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded">
            Become a Member
          </button>
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className=" space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-white">Create a New Post</h1>
        <p className="text-gray-400">
          Share your knowledge with the ThinkHub community
        </p>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 space-y-6 shadow-md">
        {/* User Info Card */}
        <div className="bg-slate-700 p-4 rounded-lg flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-white font-semibold text-lg">
              {user?.displayName}
            </h2>
            <p className="text-gray-300 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* Form Starts */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Post Title
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter your post title..."
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={6}
              {...register("description", { required: true })}
              placeholder="Write your post content here... (Markdown supported)"
              className="w-full p-3 rounded-lg bg-slate-900 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tags
            </label>
            <Controller
              name="tags"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={tagOptions}
                  isMulti
                  styles={customSelectStyles}
                  placeholder="Select tags..."
                />
              )}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">
                Select at least one tag
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">Select up to 5 tags</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition cursor-pointer"
          >
            <FaPaperPlane />
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
