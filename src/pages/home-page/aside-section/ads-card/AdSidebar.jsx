import React from "react";

const AdSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Advertisement Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <img
          src="https://via.placeholder.com/300x250"
          alt="Advertisement"
          className="w-full h-auto"
        />
      </div>

      {/* Top Activity Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Top Activity
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>@johndoe</strong> posted a new article
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                2 hours ago
              </p>
            </div>
          </li>

          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>#javascript</strong> trending topic
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                5 hours ago
              </p>
            </div>
          </li>

          <li className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-800 dark:text-gray-200">
                <strong>You</strong> received 12 new reactions
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                1 day ago
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdSidebar;
