import React from "react";

const Advertisement = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md p-8 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-6 md:mb-0 md:mr-8">
        <h2 className="text-3xl font-bold mb-2">🚀 Level Up Your Skills!</h2>
        <p className="text-lg">
          Join our free coding challenge and win exclusive rewards. Learn,
          compete, and grow with a global community.
        </p>
      </div>
      <a
        href="/join-us"
        className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
      >
        Join Now
      </a>
    </div>
  );
};

export default Advertisement;
