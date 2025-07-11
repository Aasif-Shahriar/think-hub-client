import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-4">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MainLayout;
