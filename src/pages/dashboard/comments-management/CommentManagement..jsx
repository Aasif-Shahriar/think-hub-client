import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingBar from "../../../components/loding/LoadingBar";

const feedbackOptions = [
  "Spam or irrelevant",
  "Inappropriate or offensive",
  "Fake or misleading",
];

const CommentManagement = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [feedbackState, setFeedbackState] = useState({});
  const [reportedComments, setReportedComments] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${postId}/comments`);
      return res.data || [];
    },
  });

  const handleFeedbackChange = (commentId, value) => {
    setFeedbackState((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleReport = async (commentId) => {
    const selectedFeedback = feedbackState[commentId];

    if (!selectedFeedback) return;

    try {
      const res = await axiosSecure.post(`/reports`, {
        commentId,
        feedback: selectedFeedback,
      });

      refetch();

      if (res.data.insertedId) {
        setReportedComments((prev) => [...prev, commentId]);
        Swal.fire("Reported!", "Comment has been reported.", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to report comment", "error");
    }
  };

  if (isLoading) return <LoadingBar />;

  return (
    <div className="py-8">
      <title>Manage Comments | ThinkHub</title>
      <h2 className="text-3xl font-bold text-white mb-6">Comments</h2>
      <button className="bg-blue-500 px-3 py-1 font-medium cursor-pointer mb-4 rounded-lg" onClick={() => navigate(-1)}>Back</button>

      {comments.length === 0 ? (
        <p className="text-gray-400">No comments found on this post.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-left text-gray-400">
            <thead className="bg-slate-700 text-gray-300 text-sm uppercase">
              <tr>
                <th className="p-4">Email</th>
                <th className="p-4">Comment</th>
                <th className="p-4">Feedback</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800">
              {comments.map((comment) => {
                const isReported = reportedComments.includes(comment._id);
                const feedback = feedbackState[comment._id] || "";

                const isLong = comment.text.length > 20;
                const shortText = isLong
                  ? `${comment.text.slice(0, 20)}...`
                  : comment.text;

                return (
                  <tr
                    key={comment._id}
                    className="border-b border-slate-700 hover:bg-slate-700/40 transition"
                  >
                    <td className="p-4 text-sm ">{comment.userEmail}</td>
                    <td className="p-4 text-sm">
                      {shortText}
                      {isLong && (
                        <button
                          className="ml-2 text-blue-400 hover:underline cursor-pointer text-xs"
                          onClick={() => setModalContent(comment.text)}
                        >
                          Read More
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      <select
                        className="bg-slate-900 text-white p-1 rounded"
                        value={feedback}
                        onChange={(e) =>
                          handleFeedbackChange(comment._id, e.target.value)
                        }
                        disabled={isReported}
                      >
                        <option value="">Select</option>
                        {feedbackOptions.map((opt, idx) => (
                          <option key={idx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleReport(comment._id)}
                        disabled={!feedback || isReported}
                        className={`px-3 py-1 text-sm rounded font-semibold ${
                          isReported
                            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        {isReported ? "Reported" : "Report"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Read More Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-lg relative">
            <h3 className="text-xl font-semibold mb-2 text-white">
              Full Comment
            </h3>
            <p className="text-gray-300 whitespace-pre-wrap">{modalContent}</p>
            <button
              onClick={() => setModalContent("")}
              className="absolute top-2 right-2 cursor-pointer text-white text-xl hover:text-red-500"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentManagement;
