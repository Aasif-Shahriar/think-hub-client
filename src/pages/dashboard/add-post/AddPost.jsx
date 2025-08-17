import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import LoadingBar from "../../../components/loding/LoadingBar";
import { FaPaperPlane, FaParagraph } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUD_UPLOAD_PRESET;
const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Get user details including membership
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Get post count
  const { data: postCount = 0, isLoading: countLoading } = useQuery({
    queryKey: ["userPostCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user/${user.email}?limit=1`);
      return res.data.total;
    },
  });

  // Get tags
  const { data: fetchedTags = [], isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data.map((tag) => ({
        value: tag.name.toLowerCase(),
        label: tag.name,
      }));
    },
  });

  const uploadImageToCloudinary = async (file) => {
    if (file.size > 1024 * 1024) {
      throw new Error("File size exceeds 1MB");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(cloudinaryUrl, formData);
    return response.data.secure_url;
  };

  const onSubmit = async (data) => {
    try {
      // Upload image to Cloudinary
      const imageFile = data.image[0];
      const imageUrl = await uploadImageToCloudinary(imageFile);

      // New post data
      const newPost = {
        authorName: user.displayName,
        authorEmail: user.email,
        authorImage: user.photoURL,
        title: data.title,
        description: data.description,
        tags: data.tags.map((tag) => tag.value),
        postImage: imageUrl, // Add image here
      };

      const res = await axiosSecure.post("/posts", newPost);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Post Created!",
          text: "Your post has been published to ThinkHub 🎉",
          confirmButtonText: "View My Posts",
          confirmButtonColor: "#2563EB",
          showCancelButton: true,
          cancelButtonText: "Create Another",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/my-posts");
          } else {
            reset();
          }
        });
      }
    } catch (err) {
      console.error("Post creation error:", err);
      Swal.fire({
        icon: "error",
        title: "Post Failed",
        text: "There was an error creating your post. Please try again.",
      });
    }
  };

  if (userLoading || countLoading || tagsLoading) return <LoadingBar />;

  // Handle Bronze post limit
  if (userData?.membership === "bronze" && postCount >= 5) {
    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-red-500 dark:text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Post Limit Reached
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You've reached your maximum of 5 posts as a Bronze member.
          </p>
          <div className="space-y-3">
            <Link
              to="/membership"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Upgrade to Gold Membership
            </Link>
            <Link
              to="/dashboard/my-posts"
              className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium px-4 py-2 transition-colors"
            >
              View Your Existing Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Custom select styles for dark/light mode
  const customSelectStyles = {
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: "rgb(15 23 42 / var(--tw-bg-opacity))",
      borderColor: isFocused ? "#3b82f6" : "#334155",
      color: "#fff",
      padding: "0.25rem",
      borderRadius: "0.5rem",
      boxShadow: isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      color: "#fff",
      zIndex: 20,
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
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#3b82f6"
        : isFocused
        ? "#3b82f6"
        : "#1e293b",
      color: "#fff",
      cursor: "pointer",
    }),
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <div className="space-y-1 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create a New Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your knowledge with the ThinkHub community
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Author Info */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg flex items-center gap-4 border border-gray-200 dark:border-gray-600">
          <div className="relative">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/30 dark:border-blue-500/50"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
          </div>
          <div>
            <h2 className="text-gray-900 dark:text-white font-semibold text-lg">
              {user?.displayName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {user?.email}
            </p>
            {userData?.membership && (
              <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                {userData.membership === "gold"
                  ? "🥇 Gold Member"
                  : "🥉 Bronze Member"}
              </span>
            )}
          </div>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 120,
                  message: "Title should be less than 120 characters",
                },
              })}
              placeholder="Enter your post title..."
              className={`w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Post Image *
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Image is required",
                validate: {
                  lessThan1MB: (files) =>
                    files[0]?.size < 1024 * 1024 ||
                    "Image size should be less than 1MB",
                },
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  } else {
                    setPreview(null);
                  }
                },
              })}
              className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border 
      border-gray-300 dark:border-gray-600 
      text-gray-900 dark:text-gray-200 focus:outline-none 
      focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Upload an image (Max size: 1MB)
            </p>

            {/* Preview */}
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              rows={8}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "Description should be at least 50 characters",
                },
              })}
              placeholder="Write your post content here... (Markdown supported)"
              className={`w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y min-h-[150px]`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-start gap-1">
              <FaParagraph className="mt-0.5 flex-shrink-0" />
              <span>
                Your paragraph spacing and line breaks will appear exactly as
                entered
              </span>
            </p>
          </div>

          {/* Tags Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags *
            </label>
            <Controller
              name="tags"
              control={control}
              rules={{
                required: "Select at least one tag",
                validate: (value) =>
                  value.length <= 5 || "You can select up to 5 tags only",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={fetchedTags}
                  isMulti
                  styles={customSelectStyles}
                  placeholder="Select tags..."
                  classNamePrefix="react-select"
                  className={`react-select-container ${
                    errors.tags ? "react-select-error" : ""
                  }`}
                  maxMenuHeight={200}
                />
              )}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Select relevant tags to help others find your post
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FaPaperPlane />
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </div>
      <title>Add Post | ThinkHub</title>
    </div>
  );
};

export default AddPost;
