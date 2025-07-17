import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Swal from "sweetalert2";
import { FaTrash, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingBar from "../../../../components/loding/LoadingBar";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const [loadingId, setLoadingId] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reports", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const reports = data?.reports || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleDismiss = async (reportId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will dismiss the report.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, dismiss it",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoadingId(reportId);
      await axiosSecure.delete(`/reports/${reportId}`);
      refetch();
      Swal.fire("Dismissed!", "The report has been dismissed.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to dismiss report", "error");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteComment = async (commentId, reportId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the comment.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        setLoadingId(commentId);
        await axiosSecure.delete(`/comments/${commentId}`);
        await axiosSecure.delete(`/reports/${reportId}`);
        refetch();
        Swal.fire("Deleted!", "The comment has been removed.", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to delete comment", "error");
      } finally {
        setLoadingId(null);
      }
    }
  };

  if (isLoading) return <LoadingBar />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">🚩 Reported Comments</h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">No reports found.</p>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-slate-800 rounded-xl p-4 shadow flex flex-col gap-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={report.commentAuthorImage}
                  alt={report.commentAuthorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white">
                    {report.commentAuthorName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {report.commentAuthorEmail}
                  </p>
                </div>
                <span className="ml-auto text-xs text-gray-400">
                  Reported {formatDistanceToNow(new Date(report.reportedAt))}{" "}
                  ago
                </span>
              </div>

              <p className="text-sm text-white">
                <span className="font-semibold text-red-400">Feedback:</span>{" "}
                {report.feedback}
              </p>

              <p className="bg-slate-700 p-3 rounded text-white text-sm">
                <span className="font-semibold text-blue-400">Comment:</span>{" "}
                {report.commentText}
              </p>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => handleDismiss(report._id)}
                  className="px-4 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded cursor-pointer flex items-center gap-2"
                  disabled={loadingId === report._id}
                >
                  <FaTimes /> Dismiss
                </button>
                <button
                  onClick={() =>
                    handleDeleteComment(report.commentId, report._id)
                  }
                  className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer flex items-center gap-2"
                  disabled={loadingId === report.commentId}
                >
                  <FaTrash /> Delete Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportedComments;
