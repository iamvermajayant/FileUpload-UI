import React from 'react'; // Import React to use JSX syntax and create components

// DashboardStats component receives props for totalFiles, totalLinks, activeFiles, and expiredFiles
const DashboardStats = ({
  totalFiles,  // Total number of files
  totalLinks,  // Total number of links
  activeFiles, // Number of active files
  expiredFiles, // Number of expired files
}) => {
  return (
    // Section to display the stat cards in a grid layout, responsive to different screen sizes
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Each StatCard component displays a piece of data */}
      <StatCard title="Total Files" value={`${totalFiles} Files`} />
      <StatCard title="Total Links" value={`${totalLinks} Links`} />
      <StatCard title="Active Files" value={`${activeFiles} Active`} />
      <StatCard title="Expired Files" value={`${expiredFiles} Expired`} />
    </section>
  );
};

// StatCard component is used to display each statistic (title and value)
const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
    {/* StatCard title */}
    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
      {title} {/* Display the title of the stat */}
    </h3>
    {/* StatCard value */}
    <p className="text-gray-600 dark:text-gray-300">
      {value} {/* Display the value of the stat */}
    </p>
  </div>
);

export default DashboardStats; // Export the DashboardStats component so it can be used in other parts of the app
