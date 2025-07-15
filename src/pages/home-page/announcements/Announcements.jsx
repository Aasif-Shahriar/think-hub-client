import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AnnouncementCard } from "./AnnouncementCard";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data.announcements;
    },
  });

  if (isLoading) return <p>Loading announcements...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load announcements.</p>;
  if (!data || data.length === 0) return null;

  return (
    <section
      id="announcement"
      className="max-w-[1440px] mx-auto px-4 py-6 bg-slate-900 text-white rounded-md shadow-md my-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">📢 Announcements</h3>

        <p className="bg-blue-500 px-2 py-1 rounded-full text-xs font-medium">
          {data.length} new
        </p>
      </div>

      <ul className="space-y-4">
        {data.map(
          ({ _id, title, description, authorName, authorImage, createdAt }) => (
            <AnnouncementCard
              key={_id}
              title={title}
              description={description}
              authorName={authorName}
              authorImage={authorImage}
              createdAt={createdAt}
            />
          )
        )}
      </ul>
    </section>
  );
};

export default Announcements;
