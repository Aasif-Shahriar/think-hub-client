import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import bannerImg from "../../../assets/images/think_hub_banner.png";
import { SiFirebase, SiJavascript, SiMongodb, SiReact } from "react-icons/si";
import { useLocation } from "react-router";

const Banner = ({ searchTag, setSearchTag }) => {
  const location = useLocation();

  const tags = [
    { name: "React", icon: <SiReact className="text-cyan-400" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "Firebase", icon: <SiFirebase className="text-orange-400" /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedTag = searchTag.trim().toLowerCase();
    setSearchTag(trimmedTag);
  };

  const handleTagClick = (tag) => {
    setSearchTag(tag.toLowerCase());
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTag("");
    }
  }, [location.pathname, setSearchTag]);

  return (
    <div
      className="relative hero h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 z-0"></div>

      <div
        className="hero-content text-center text-neutral-content relative z-10 flex flex-col items-center"
        data-aos="fade-down"
      >
        <h1
          className="text-2xl text-white sm:text-3xl md:text-5xl font-semibold mb-6"
          data-aos="fade-up"
        >
          Find the developer discussions you need
        </h1>

        <form
          onSubmit={handleSearch}
          className="mb-5 w-full max-w-[600px]"
          data-aos="zoom-in"
        >
          <label className="input border-none flex items-center gap-2 w-full bg-white text-black shadow">
            <FaSearch className="text-blue-600" />
            <input
              type="text"
              placeholder="Search by tag..."
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              className="grow focus:outline-none"
            />
          </label>
        </form>

        <div
          className="flex flex-wrap justify-center gap-3"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              onClick={() => handleTagClick(tag.name)}
              className="flex items-center gap-1 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-transform transform hover:scale-105 shadow hover:shadow-lg backdrop-blur-sm"
            >
              {tag.icon}
              {tag.name.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
