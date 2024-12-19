import React, { useState } from "react"; // Import React and useState hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon to use icons
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"; // Import specific icons for the user profile popup

const UserProfilePopup = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onChangePassword,
  onChangeName,
  onChangeAvatar,
}) => {
  const [newPassword, setNewPassword] = useState(""); // State for holding the new password entered by the user
  const [newName, setNewName] = useState(user.name); // State for holding the new name
  const [newAvatar, setNewAvatar] = useState(null); // State for holding the new avatar file

  const handleChangePassword = () => {
    onChangePassword(newPassword); // Call onChangePassword function with the new password
    setNewPassword(""); // Clear the new password field after submission
  };

  const handleChangeName = () => {
    if (newName !== user.name) {
      onChangeName(newName); // Call onChangeName function to update the name
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(URL.createObjectURL(file)); // Temporarily show the uploaded image
      onChangeAvatar(file); // Pass the selected file to the parent component
    }
  };

  if (!isOpen) return null; // If the popup is not open, return null to render nothing

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Main container for the popup with a semi-transparent background */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        {/* The inner container for the popup, with rounded corners and padding */}
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          User Profile
        </h2>
        {/* Title of the popup, styled to be bold and large */}
        <div className="flex flex-col items-center space-y-4">
          {/* Container for the user profile content, arranged vertically */}

          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center relative group">
            {/* Profile picture area, circular shape, with a fallback if no avatar */}
            {newAvatar || user.avatar ? (
              <img
                src={newAvatar || user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FontAwesomeIcon icon={faUser} size="3x" />
            )}
            {/* If avatar exists, display it. If not, display a default user icon */}

            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Hover effect for the avatar change button */}
              <button className="text-white">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  Change
                </label>
              </button>
            </div>
            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleChangeName}
            className="text-xl font-semibold text-center bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:text-white"
          />
          {/* Input for editing the user's name, with text styling */}

          <p className="text-gray-600 dark:text-gray-300">
            {/* Display the user's email */}
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            {user.email}
          </p>

          <div className="w-full">
            {/* Section for changing the password */}
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
            >
              New Password
            </label>
            {/* Label for the password field */}

            <div className="flex">
              {/* Container for the password input and button */}
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-grow border rounded-l px-3 py-2"
                placeholder="Enter new password"
              />
              {/* Password input field to accept the new password */}

              <button
                onClick={handleChangePassword}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              >
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                {/* Button to trigger password change */}
                Change
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          {/* Close button for the popup */}
          &times;
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
// Export the component to be used in other parts of the application
