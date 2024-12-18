import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const AllUsersPopup = ({ isOpen, onClose, users }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">All Users</h2>
        <div className="max-h-96 overflow-y-auto">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <FontAwesomeIcon icon={faUser} size="lg" />
                )}
              </div>
              <div>
                <p className="font-medium dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
              </div>
            </div>
          ))}
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

