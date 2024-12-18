import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const UserProfilePopup = ({ isOpen, onClose, user, onLogout, onChangePassword }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    onChangePassword(newPassword);
    setNewPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">User Profile</h2>
        <div className="flex flex-col items-center space-y-4">
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
          <input
            type="text"
            value={user.name}
            onChange={(e) => console.log('Change name:', e.target.value)}
            className="text-xl font-semibold text-center bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:text-white"
          />
          <p className="text-gray-600 dark:text-gray-300">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            {user.email}
          </p>
          <div className="w-full">
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              New Password
            </label>
            <div className="flex">
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="flex-grow border rounded-l px-3 py-2"
                placeholder="Enter new password"
              />
              <button
                onClick={handleChangePassword}
                className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
              >
                <FontAwesomeIcon icon={faLock} className="mr-2" />
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
          &times;
        </button>
      </div>
    </div>
  );
};

export default UserProfilePopup;

