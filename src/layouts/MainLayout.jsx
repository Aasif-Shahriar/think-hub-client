import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar /> {/* max-w-[1560px] mx-auto px-4 */}{" "}
      <div className="bg-gray-50 dark:bg-slate-900">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
