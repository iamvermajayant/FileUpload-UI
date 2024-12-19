import React, { useState } from 'react'; // Import React and useState hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icons
import { 
  faPlus, 
  faCog, 
  faTrash, 
  faSignOutAlt, 
  faUsers, 
  faTag,
  faHome
} from '@fortawesome/free-solid-svg-icons'; // Import specific icons for sidebar buttons
import UserProfilePopup from './UserProfilePopup'; // User profile popup component
import CreateLinkModal from './create-link-modal'; // Create link modal component
import TagCreationPopup from './TagCreationPopup'; // Tag creation popup component

const Sidebar = ({
  isSidebarVisible, // Controls the visibility of the sidebar
  handleCreateLink, // Callback function to handle create link action
  handleManageLinks, // Callback function to manage links
  handleBulkDelete, // Callback for bulk delete action
  handleLogout, // Callback for logout action
  handleUserProfile, // Callback for user profile action (not used here)
  onViewChange, // Callback function to handle view changes in the app
  theme, // The current theme (light or dark)
  toggleTheme // Function to toggle between light and dark themes (not used here)
}) => {
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(false); // State for showing user profile popup
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false); // State for showing create link modal
  const [showTagCreationPopup, setShowTagCreationPopup] = useState(false); // State for showing tag creation popup

  // If the sidebar is not visible, return null (don't render the sidebar)
  if (!isSidebarVisible) return null;

  // Current user details for the sidebar user profile section
  const currentUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  };

  // Handle tag creation logic (currently logs the created tag data)
  const handleCreateTag = (tagData) => {
    console.log('Creating tag:', tagData); // Log tag data (implement logic here)
    setShowTagCreationPopup(false); // Close the tag creation popup after creating the tag
  };

  return (
    <aside className="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      {/* Sidebar navigation */}
      <nav>
        <SidebarButton onClick={() => onViewChange("dashboard")} icon={faHome}> {/* Navigate to Dashboard */}
          Dashboard
        </SidebarButton>
        <SidebarButton onClick={() => onViewChange("allUsers")} icon={faUsers}> {/* Navigate to All Users */}
          All Users
        </SidebarButton>
        <SidebarButton onClick={() => setShowTagCreationPopup(true)} icon={faTag}> {/* Open Create Tag modal */}
          Create Tag
        </SidebarButton>
        <SidebarButton onClick={handleCreateLink} icon={faPlus}> {/* Create new link */}
          Create Link
        </SidebarButton>
        <SidebarButton onClick={handleManageLinks} icon={faCog}> {/* Manage links */}
          Manage Links
        </SidebarButton>
        <SidebarButton onClick={handleBulkDelete} icon={faTrash}> {/* Delete selected links */}
          Delete Selected
        </SidebarButton>
        <SidebarButton onClick={handleLogout} icon={faSignOutAlt}> {/* Log out */}
          Logout
        </SidebarButton>
      </nav>

      {/* User profile section */}
      <div className="mt-auto">
        <button
          onClick={() => setShowUserProfilePopup(true)} // Open user profile popup on click
          className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          <img
            className="object-cover w-8 h-8 rounded-full"
            src={currentUser.avatar} // Display user avatar
            alt="User avatar"
          />
          <span className="mx-2 font-medium">{currentUser.name}</span> {/* Display user name */}
        </button>
      </div>

      {/* Conditional rendering for modals and popups */}
      {showUserProfilePopup && (
        <UserProfilePopup
          isOpen={showUserProfilePopup} // Popup visibility state
          onClose={() => setShowUserProfilePopup(false)} // Close popup on click
          user={currentUser} // Pass current user data to the popup
          onLogout={handleLogout} // Pass logout handler to the popup
          onChangePassword={(newPassword) => console.log('Change password:', newPassword)} // Handle password change (log for now)
        />
      )}
      {showCreateLinkModal && (
        <CreateLinkModal
          onClose={() => setShowCreateLinkModal(false)} // Close create link modal
          onCreateLink={handleCreateLink} // Pass create link handler
          files={[]} // Pass empty files array (can be dynamic)
        />
      )}
      {showTagCreationPopup && (
        <TagCreationPopup
          onClose={() => setShowTagCreationPopup(false)} // Close tag creation popup
          onCreateTag={handleCreateTag} // Pass tag creation handler
        />
      )}
    </aside>
  );
};

// SidebarButton component renders each button in the sidebar
const SidebarButton = ({ onClick, icon, children }) => (
  <button
    onClick={onClick} // Handle button click
    className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
  >
    <FontAwesomeIcon icon={icon} className="w-5 h-5" /> {/* Display icon */}
    <span className="mx-4 font-medium">{children}</span> {/* Display text */}
  </button>
);

export default Sidebar; // Export Sidebar component for use elsewhere in the app
