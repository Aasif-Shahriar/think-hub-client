import React, { useState } from "react";
import Banner from "../banner-section/Banner";
import LatestDiscussions from "../latest-discussions/LatestDiscussions";
import PopularTags from "../popular-tags/PopularTags";
import Announcements from "../announcements/Announcements";

const Home = () => {
  const [searchTag, setSearchTag] = useState("");

  const isSearching = searchTag.trim() !== "";

  return (
    <div>
      {/* banner */}
      <Banner searchTag={searchTag} setSearchTag={setSearchTag} />
      {!isSearching && (
        <>
          <PopularTags setSearchTag={setSearchTag} />
          <Announcements />
        </>
      )}
      {/* latest discussion */}
      <LatestDiscussions searchTag={searchTag} />
      <title>Home | ThinkHub</title>
    </div>
  );
};

export default Home;
