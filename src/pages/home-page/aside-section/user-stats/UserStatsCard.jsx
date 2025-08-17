import React from "react";

const UserStatsCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Your Dashboard
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-600 dark:text-gray-300">Total Posts</span>
          <span className="font-medium text-gray-900 dark:text-white">24</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-600 dark:text-gray-300">Total Votes</span>
          <span className="font-medium text-gray-900 dark:text-white">156</span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-gray-600 dark:text-gray-300">
            Total Comments
          </span>
          <span className="font-medium text-gray-900 dark:text-white">89</span>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;
