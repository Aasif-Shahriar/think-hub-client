import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const NotificationBell = () => {
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["announcementsCount"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data.announcements.length;
    },
  });

  const handleScrollToAnnouncement = () => {
    const section = document.getElementById("announcement");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative cursor-pointer"
      onClick={handleScrollToAnnouncement}
    >
      <FaBell size={20} />
      {data > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center text-white">
          {data}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
