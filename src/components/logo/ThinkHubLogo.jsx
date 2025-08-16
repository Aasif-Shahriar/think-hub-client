import React from "react";
import logo from "../../assets/images/Think.png";

const ThinkHubLogo = () => {
  return (
    <section className="flex items-center gap-2">
      {/* Logo background adapts to theme */}
      <div className="w-8 h-8 bg-light-btn dark:bg-dark-btn rounded-md flex items-center justify-center">
        <img
          src={logo}
          alt="ThinkHub Logo"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Brand text */}
      <h1 className="text-xl font-bold select-none">
        <span className="text-slate-800 dark:text-white">Think</span>
        <span className="text-light-btn dark:text-dark-btn">Hub</span>
      </h1>
    </section>
  );
};

export default ThinkHubLogo;
