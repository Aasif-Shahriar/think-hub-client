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
      Swal.fire("✅ Success", "Announcement posted!", "success");
      reset();
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Could not post announcement", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-100 dark:bg-slate-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white text-center">
        📣 Post New Announcement
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label">
            <span className="text-base font-medium text-slate-700 dark:text-slate-200">
              Title <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter title..."
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="text-base font-medium text-slate-700 dark:text-slate-200">
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
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 h-32 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          className="btn btn-primary w-full"
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
