import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"; // adjust path accordingly

const fetchComments = async (axiosSecure, postId) => {
  const res = await axiosSecure.get(`/posts/${postId}/comments`);
  return res.data;
};

export function useComments(postId) {
  const axiosSecure = useAxiosSecure();

  return useQuery(
    ["comments", postId],
    () => fetchComments(axiosSecure, postId),
    {
      enabled: !!postId,
      staleTime: 5 * 60 * 1000,
    }
  );
}
