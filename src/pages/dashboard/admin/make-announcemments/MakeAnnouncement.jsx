import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";

const MakeAnnouncement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const announcement = {
      authorName: user?.displayName || "Admin",
      authorImage: user?.photoURL || "https://i.ibb.co/7zQZxkV/avatar.png",
      title: data.title.trim(),
      description: data.description.trim(),
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      await axiosSecure.post("/announcements", announcement);
      Swal.fire({
        title: "✅ Success",
        text: "Announcement posted!",
        icon: "success",
        customClass: {
          popup: "bg-white dark:bg-slate-800",
          title: "text-gray-900 dark:text-white",
          htmlContainer: "text-gray-600 dark:text-gray-300",
        },
      });
      reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "❌ Error",
        text: "Could not post announcement",
        icon: "error",
        customClass: {
          popup: "bg-white dark:bg-slate-800",
          title: "text-gray-900 dark:text-white",
          htmlContainer: "text-gray-600 dark:text-gray-300",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 transition-colors duration-300">
      <title>Make Announcements | ThinkHub</title>

      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
        📣 Post New Announcement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label">
            <span className="text-base font-medium text-gray-700 dark:text-slate-200">
              Title <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter title..."
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="text-base font-medium text-gray-700 dark:text-slate-200">
              Description <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            placeholder="Write your announcement..."
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white border border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 h-32 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Announcement"}
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;