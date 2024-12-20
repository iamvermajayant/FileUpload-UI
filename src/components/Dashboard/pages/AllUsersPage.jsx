import React, { useState, useEffect } from 'react'; // Import React and useState, useEffect hooks
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icon usage
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'; // Import specific icons

const AllUsersContent = () => {
  // Initial state for storing user data
  const [users, setUsers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', avatar: 'https://example.com/john.jpg', status: 'active', joiningDate: '2023-01-15', lastActive: '2024-04-10', totalFiles: 25 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://example.com/jane.jpg', status: 'active', joiningDate: '2022-11-20', lastActive: '2024-03-28', totalFiles: 42 },
    { id: '3', name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://example.com/alice.jpg', status: 'inactive', joiningDate: '2023-02-01', lastActive: '2024-04-05', totalFiles: 18 },
    { id: '4', name: 'Bob Williams', email: 'bob@example.com', avatar: 'https://example.com/bob.jpg', status: 'active', joiningDate: '2021-12-05', lastActive: '2024-04-01', totalFiles: 56 },
    { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', avatar: 'https://example.com/charlie.jpg', status: 'inactive', joiningDate: '2022-08-19', lastActive: '2024-04-15', totalFiles: 33 },
  ]);

  // State for the search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for filtered users based on search
  const [filteredUsers, setFilteredUsers] = useState(users);

  // UseEffect to filter users whenever the searchQuery or users array changes
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered); // Set the filtered users list
  }, [searchQuery, users]);

  // Calculate total users, active users, and total files
  const totalUsers = filteredUsers.length;
  const activeUsers = filteredUsers.filter(user => user.status === 'active').length;
  const totalFiles = filteredUsers.reduce((sum, user) => sum + user.totalFiles, 0);

  // UserStats component to display user stats in a grid
  const UserStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Stat card for total users */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100">Total Users</h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-200">{totalUsers}</p>
      </div>
      
      {/* Stat card for active users */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-100">Active Users</h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-200">{activeUsers}</p>
      </div>
      
      {/* Stat card for total files */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-100">Total Files</h3>
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-200">{totalFiles}</p>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {/* Search bar section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">All Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            className="pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Displaying the user stats */}
      <UserStats />

      {/* Table to display filtered users */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            {/* Table headers */}
            <tr className="bg-gray-50 dark:bg-gray-800 text-left">
              <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Photo</th>
              <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Name</th>
              <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Email</th>
              <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Joining Date</th>
              <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Last Active</th>
              <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Total Files</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the filteredUsers and display them in the table */}
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="p-3">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="lg" className="text-gray-400" />
                  )}
                </td>
                <td className="p-3 dark:text-white">{user.name}</td>
                <td className="p-3 dark:text-white">{user.email}</td>
                <td className="p-3 dark:text-white">{user.joiningDate}</td>
                <td className="p-3 dark:text-white">{user.lastActive}</td>
                <td className="p-3 dark:text-white">{user.totalFiles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersContent;
