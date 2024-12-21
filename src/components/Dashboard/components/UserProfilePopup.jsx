import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserProfilePopup = ({ isOpen, onClose, user, onLogout, onChangePassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(user ? user.first_name : '');
  const [lastName, setLastName] = useState(user ? user.last_name : '');
  const [updateStatus, setUpdateStatus] = useState('');
  const [passwordError, setPasswordError] = useState('');  // To handle password mismatch error

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    onChangePassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');  // Clear error if passwords match
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = {
        first_name: firstName,
        last_name: lastName,
      };

      const response = await axios.put('http://localhost:8000/api/update_user', updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      setUpdateStatus('Profile updated successfully!');
      onClose(); // Close the popup after successful update
    } catch (error) {
      setUpdateStatus('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
    }
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">User Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center relative group">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <FontAwesomeIcon icon={faUser} size="3x" />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white" onClick={() => console.log('Change avatar')}>
                Change
              </button>
            </div>
          </div>

          {/* User Email */}
          <p className="text-gray-600 dark:text-gray-300">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            {user.email}
          </p>

          {/* First Name */}
          <div className="w-full">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div className="w-full">
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter last name"
            />
          </div>

          {/* Update Profile Button */}
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>

          {/* New Password */}
          <div className="w-full">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div className="w-full">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Confirm your new password"
            />
          </div>

          {/* Password Error Message */}
          {passwordError && (
            <p className="text-red-500 text-sm mt-2">
              {passwordError}
            </p>
          )}

          {/* Password Change Button */}
          <button
            onClick={handleChangePassword}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Change Password
          </button>

          {/* Update Status Message
          {updateStatus && (
            <p className={`text-sm mt-2 ${updateStatus.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {updateStatus}
            </p>
          )} */}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;
