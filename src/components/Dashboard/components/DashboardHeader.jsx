import React from 'react'; // Import React for building the component
import { FaBars } from 'react-icons/fa'; // Import the FaBars icon from react-icons for the sidebar toggle button

const DashboardHeader = ({ toggleSidebar }) => { // DashboardHeader component with toggleSidebar function as prop
  return (
    // Header container with padding and margin
    <header className="py-2 px-10 mt-4">
      {/* Flex container for title and button, spaced between */}
      <div className="flex justify-between items-center">
        {/* Dashboard title */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Super-admin Dashboard
        </h1>
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar} // Trigger toggleSidebar function when clicked
          className="flex items-center px-2 py-2 mt-0 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          {/* Hamburger icon for sidebar toggle */}
          <FaBars className="w-4 h-4" /> {/* Set width and height of the icon */}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader; // Export the component for use in other parts of the application
