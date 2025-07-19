import React from "react";
import logo from "../../assets/images/Think.png";

const ThinkHubLogo = () => {
  return (
    <section className="flex items-center gap-2">
      {/* Smaller logo image placeholder */}
      <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center">
        {/* Replace with your logo image */}
        <img
          src={logo}
          alt="ThinkHub Logo"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Smaller text with different colors */}
      <h1 className="text-xl font-bold select-none">
        <span className="text-white">Think</span>
        <span className="text-blue-500">Hub</span>
      </h1>
    </section>
  );
};

export default ThinkHubLogo;
