import React, { useState } from "react";
import Banner from "../banner-section/Banner";
import LatestDiscussions from "../latest-discussions/LatestDiscussions";
import PopularTags from "../popular-tags/PopularTags";
import Announcements from "../announcements/Announcements";
import UserStatsCard from "../aside-section/user-stats/UserStatsCard";
import AdSidebar from "../aside-section/ads-card/AdSidebar";
import FeaturedPosts from "../featured-posts/FeaturedPosts";

const Home = () => {
  const [searchTag, setSearchTag] = useState("");

  const isSearching = searchTag.trim() !== "";

  return (
    <>
      <div>
        {/* Banner Section */}
        <Banner searchTag={searchTag} setSearchTag={setSearchTag} />

        {/* Popular Tags and Announcements (hidden during search) */}
        {!isSearching && (
          <>
            <PopularTags setSearchTag={setSearchTag} />
            <Announcements />
          </>
        )}

        {/* Three-column layout: Sidebars + Main Content */}
        <div className="max-w-[1560px] mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-8 gap-6">
          {/* Left Sidebar: User Profile Stats */}
          <div className="w-full lg:col-span-2">
            <UserStatsCard />
          </div>

          {/* Main Content: Latest Discussions (Individual Cards) */}
          <div className="lg:col-span-4">
            {/* className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" */}
            <div>
              {/* Example discussion cards - replace with real data */}
              <LatestDiscussions searchTag={searchTag} />
            </div>
          </div>

          {/* Right Sidebar: Ads and Top Activity */}
          <div className="lg:col-span-2">
            <AdSidebar />
          </div>
        </div>

        {/* featured post */}
       <div className="bg-white dark:bg-slate-800 py-6"> <FeaturedPosts /></div>
      </div>
    </>
  );
};

export default Home;
