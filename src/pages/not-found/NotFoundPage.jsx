import React from "react";
import { Link } from "react-router";
import { FaBug, FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <FaBug className="text-yellow-400 text-9xl mb-6 animate-pulse" />
      <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
      <p className="text-gray-400 text-xl max-w-lg text-center mb-8">
        No thoughts found here! The page you are looking for doesn’t exist or
        might have been deleted.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition"
      >
        <FaHome /> Back to ThinkHub Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
