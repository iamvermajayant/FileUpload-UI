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
  handleToggleOnHold, // Function to handle the toggle action
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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-7xl w-full relative">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">All Users</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-400">
          ×
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="text-gray-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Avatar</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Username</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Created At</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Verified</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Last Login</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">On Hold</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td className="px-6 py-3">
                    <img
                      src={user.avatar || 'https://via.placeholder.com/150'}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.username}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3">{new Date(user.created_at).toLocaleString()}</td>
                  <td className="px-6 py-3">{user.verified ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-3">{new Date(user.last_login).toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <button
                      className={`px-4 py-2 rounded ${user.on_hold ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                      onClick={() => handleToggleOnHold(user.user_id, !user.on_hold)}
                    >
                      {user.on_hold ? 'On Hold' : 'Active'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <label className="mr-2">Users per page:</label>
            <select
              value={usersPerPage}
              onChange={(e) => setUsersPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-l"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersPopup;
