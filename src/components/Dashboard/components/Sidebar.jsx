import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { 
  faPlus, 
  faCog, 
  faTrash, 
  faSignOutAlt, 
  faUsers, 
  faTag, 
  faTags, 
  faHome 
} from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';
import UserProfilePopup from './UserProfilePopup'; 
import CreateLinkModal from './create-link-modal'; 
import TagCreationPopup from './TagCreationPopup'; 

const Sidebar = ({
  isSidebarVisible, 
  handleCreateLink, 
  handleManageLinks, 
  handleBulkDelete, 
  handleLogout, 
  handleUserProfile, 
  onViewChange, 
  theme, 
  toggleTheme 
}) => {
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(false); 
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false); 
  const [showTagCreationPopup, setShowTagCreationPopup] = useState(false); 

  if (!isSidebarVisible) return null;

  const currentUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  };

  // const handleCreateTag = async (tagData) => {
  //   try {
  //     const response = await fetch('/api/tags', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(tagData),
  //     });
  //     if (response.ok) {
  //       console.log('Tag created successfully:', tagData);
  //     } else {
  //       console.error('Failed to create tag');
  //     }
  //   } catch (error) {
  //     console.error('Error creating tag:', error);
  //   }
  //   setShowTagCreationPopup(false);
  // };

  return (
    <aside className="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <nav>
        <SidebarButton onClick={() => onViewChange("dashboard")} icon={faHome}>
          Dashboard
        </SidebarButton>
        <SidebarButton onClick={() => onViewChange("allUsers")} icon={faUsers}>
          All Users
        </SidebarButton>
        <SidebarButton onClick={() => setShowTagCreationPopup(true)} icon={faTag}>
          Create Tag
        </SidebarButton>
        <SidebarButton onClick={() => onViewChange("manageTags")} icon={faTags}>
          Manage Tags
        </SidebarButton>
        <SidebarButton onClick={handleCreateLink} icon={faPlus}>
          Create Link
        </SidebarButton>
        <SidebarButton onClick={handleManageLinks} icon={faCog}>
          Manage Links
        </SidebarButton>
        <SidebarButton onClick={handleBulkDelete} icon={faTrash}>
          Delete Selected
        </SidebarButton>
        <SidebarButton onClick={handleLogout} icon={faSignOutAlt}>
          Logout
        </SidebarButton>
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => setShowUserProfilePopup(true)}
          aria-label="Open user profile"
          className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
        >
          <img
            className="object-cover w-8 h-8 rounded-full"
            src={currentUser.avatar}
            alt="User avatar"
          />
          <span className="mx-2 font-medium">{currentUser.name}</span>
        </button>
      </div>

      {showUserProfilePopup && (
        <UserProfilePopup
          isOpen={showUserProfilePopup}
          onClose={() => setShowUserProfilePopup(false)}
          user={currentUser}
          onLogout={handleLogout}
          onChangePassword={(newPassword) => console.log('Change password:', newPassword)}
        />
      )}
      {showCreateLinkModal && (
        <CreateLinkModal
          onClose={() => setShowCreateLinkModal(false)}
          onCreateLink={handleCreateLink}
          files={[]}
        />
      )}
      {showTagCreationPopup && (
        <TagCreationPopup
          onClose={() => setShowTagCreationPopup(false)}
        />
      )}
    </aside>
  );
};

const SidebarButton = ({ onClick, icon, children }) => (
  <button
    onClick={onClick}
    aria-label={`Sidebar button: ${children}`}
    className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
  >
    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
    <span className="mx-4 font-medium">{children}</span>
  </button>
);

export default Sidebar;
