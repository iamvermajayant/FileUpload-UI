import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faCog, faTrash, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import UserProfilePopup from './UserProfilePopup';
import AllUsersPopup from './AllUsersPopup';

const Sidebar = ({
  isSidebarVisible,
  searchQuery,
  setSearchQuery,
  handleCreateLink,
  handleManageLinks,
  handleBulkDelete,
  handleLogout,
  theme,
}) => {
  const [showAllUsersPopup, setShowAllUsersPopup] = useState(false);
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // To hold fetched user data

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/read_user_details', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const user = response.data;
        setCurrentUser({
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          avatar: 'https://via.placeholder.com/150', // Placeholder avatar for now
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  if (!isSidebarVisible) return null;

  const allUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', avatar: 'https://example.com/john.jpg' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://example.com/jane.jpg' },
    // Add more users as needed
  ];

  return (
    <aside className="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <nav>
        <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <SidebarButton onClick={handleCreateLink} icon={faPlus}>
          Create Link
        </SidebarButton>
        <SidebarButton onClick={handleManageLinks} icon={faCog}>
          Manage Links
        </SidebarButton>
        <SidebarButton onClick={handleBulkDelete} icon={faTrash}>
          Delete Selected
        </SidebarButton>
        <SidebarButton onClick={() => setShowAllUsersPopup(true)} icon={faUsers}>
          All Users
        </SidebarButton>
        <SidebarButton onClick={handleLogout} icon={faSignOutAlt}>
          Logout
        </SidebarButton>
      </nav>
      <div className="mt-auto">
        {currentUser && (
          <button
            onClick={() => setShowUserProfilePopup(true)}
            className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          >
            <img
              className="object-cover w-8 h-8 rounded-full"
              src={currentUser.avatar}
              alt="User avatar"
            />
            <span className="mx-2 font-medium">{currentUser.name}</span>
          </button>
        )}
      </div>

      <AllUsersPopup
        isOpen={showAllUsersPopup}
        onClose={() => setShowAllUsersPopup(false)}
        users={allUsers}
      />
      <UserProfilePopup
        isOpen={showUserProfilePopup}
        onClose={() => setShowUserProfilePopup(false)}
        user={currentUser}
        onLogout={handleLogout}
        onChangePassword={(newPassword) => console.log('Change password:', newPassword)}
      />
    </aside>
  );
};

const SidebarButton = ({ onClick, icon, children }) => (
  <button
    onClick={onClick}
    className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
  >
    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
    <span className="mx-4 font-medium">{children}</span>
  </button>
);

export default Sidebar;
