import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import LoadingBar from "../../../components/loding/LoadingBar";
import PostCard from "./PostCard";
import { Swiper, SwiperSlide } from "swiper/react";

const FeaturedPosts = () => {
const axiosSecure = useAxiosSecure();
const { user } = useAuth();
const queryClient = useQueryClient();
const {
data: postsData,
isLoading,
isError,
} = useQuery({
queryKey: ["featured-posts"],
queryFn: async () => {
const res = await axiosSecure.get("/posts?sort=popular&limit=5");
return res.data.posts;
},
staleTime: 1000 * 60 * 5, // 5 minutes cache
});
if (isLoading) return <LoadingBar />;
if (isError)
return <div className="text-red-500">Error loading featured posts</div>;

  return (
    <section className="max-w-[1560px] mx-auto px-4 my-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Trending Posts
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Curated highlights from across the platform </p>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {postsData?.map((post) => (
          <SwiperSlide key={post._id} className="py-4">
            <PostCard
              key={post._id}
              post={post}
              user={user}
              axiosSecure={axiosSecure}
              queryClient={queryClient}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedPosts;
