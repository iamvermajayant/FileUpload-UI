import React from 'react';

const AllUsersPopup = ({
  isOpen,
  onClose,
  users,
  currentPage,
  setCurrentPage,
  totalPages,
  usersPerPage,
  setUsersPerPage,
}) => {
  if (!isOpen) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-6xl w-full relative">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">All Users</h2>
        
        {/* Dropdown for users per page */}
        <div className="mb-4">
          <label htmlFor="usersPerPage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Users per page</label>
          <select
            id="usersPerPage"
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to the first page when users per page changes
            }}
            className="mt-2 block w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Avatar</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Username</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Role</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Created At</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Verified</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id || user.email} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">
                    <img
                      src={user.avatar || 'https://via.placeholder.com/150'}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{user.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{user.role}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                    {user.verified ? 'Yes' : 'No'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">
                    {new Date(user.last_login).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AllUsersPopup;
