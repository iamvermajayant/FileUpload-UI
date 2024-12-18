import React from 'react';

const DashboardStats = ({
  totalFiles,
  totalLinks,
  activeFiles,
  expiredFiles,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <StatCard title="Total Files" value={`${totalFiles} Files`} />
      <StatCard title="Total Links" value={`${totalLinks} Links`} />
      <StatCard title="Active Files" value={`${activeFiles} Active`} />
      <StatCard title="Expired Files" value={`${expiredFiles} Expired`} />
    </section>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {value}
    </p>
  </div>
);

export default DashboardStats;
