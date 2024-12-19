import React from 'react';
import { FaBars } from 'react-icons/fa';

const DashboardHeader = ({ toggleSidebar }) => {
  return (
    <header className="py-2 px-10 mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Super-admin Dashboard
        </h1>
        <button
          onClick={toggleSidebar}
          className="flex items-center px-2 py-2 mt-0 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          <FaBars className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
