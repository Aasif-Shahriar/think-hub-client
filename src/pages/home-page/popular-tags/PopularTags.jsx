import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaAws,
  FaJsSquare,
  FaTag,
} from "react-icons/fa";
import LoadingBar from "../../../components/loding/LoadingBar";

const tagIcons = {
  react: <FaReact className="text-blue-500" />,
  html: <FaHtml5 className="text-orange-600" />,
  css: <FaCss3Alt className="text-blue-600" />,
  aws: <FaAws className="text-yellow-500" />,
  javascript: <FaJsSquare className="text-yellow-400" />,
};

const PopularTags = ({ setSearchTag }) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBar />;
  if (isError) return <p className="text-red-500">Failed to load tags</p>;

  return (
    <section className="my-10 max-w-[1440px] mx-auto px-4">
      <h3 className="text-xl font-bold text-white mb-3">🔥 Popular Tags</h3>
      <Swiper spaceBetween={10} slidesPerView="auto" className="w-full">
        {tags.map((tag) => {
          const tagName = tag._id.toLowerCase();
          const displayName = tagName.toUpperCase();
          const icon = tagIcons[tagName] || <FaTag className="text-blue-500" />;

          return (
            <SwiperSlide key={tag._id} style={{ width: "auto" }}>
              <span
                onClick={() => setSearchTag(tagName)}
                className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 transition-colors duration-200 cursor-pointer text-blue-500 px-3 py-2 rounded-full text-sm font-semibold"
              >
                {icon}
                {displayName}
              </span>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default PopularTags;
