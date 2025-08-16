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
    queryKey: ["popularTags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags/popular");
      return res.data;
    },
  });

  if (isLoading) return <LoadingBar />;
  if (isError) return <p className="text-red-500">Failed to load tags</p>;

  return (
    <section className="my-10 max-w-[1560px] mx-auto px-4" data-aos="fade-up">
      <h3
        className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
        data-aos="fade-left"
      >
        🔥 Popular Tags
      </h3>

      <Swiper spaceBetween={10} slidesPerView="auto" className="w-full">
        {tags.map((tag) => {
          const tagName = tag._id.toLowerCase();
          const displayName = tagName.toUpperCase();
          const icon = tagIcons[tagName] || (
            <FaTag className="text-blue-500 dark:text-blue-400" />
          );

          return (
            <SwiperSlide key={tag._id} style={{ width: "auto" }}>
              <span
                onClick={() => setSearchTag(tagName)}
                className="flex items-center gap-1 
              bg-gray-100 dark:bg-gray-800 
              hover:bg-gray-200 dark:hover:bg-gray-700 
              transition-colors duration-200 cursor-pointer 
              text-gray-800 dark:text-gray-200 
              px-3 py-2 rounded-full text-sm font-semibold"
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
