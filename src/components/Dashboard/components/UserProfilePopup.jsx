import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toast notifications

const UserProfilePopup = ({ isOpen, onClose, user, onLogout, onChangePassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState(user ? user.first_name : '');
  const [lastName, setLastName] = useState(user ? user.last_name : '');
  const [updateStatus, setUpdateStatus] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false); // State to store 2FA status
  const [selectedAction, setSelectedAction] = useState(''); // State to track selected action (name, password, or 2fa)

  // Function to get 2FA status
  const get2faStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8000/api/get_2fa_status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIs2faEnabled(response.data.enabled); // Assuming the response contains a boolean `enabled` field
    } catch (error) {
      console.error('Error fetching 2FA status:', error);
      toast.error('Failed to fetch 2FA status.');
    }
  };

  // Function to update 2FA status
  const update2faStatus = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const enable2fa = !is2faEnabled; // Toggle the 2FA status
      const response = await axios.post(
        'http://localhost:8000/api/update_2fa',
        `enable_2fa=${enable2fa}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
      if (response.status === 200) {
        setIs2faEnabled(enable2fa);
        toast.success(`2FA ${enable2fa ? 'enabled' : 'disabled'} successfully!`, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error updating 2FA status:', error);
      toast.error('Failed to update 2FA status.');
    }
  };

  // Function to change password
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        'http://localhost:8000/api/reset_password_confirm',
        { new_password: newPassword, confirm_password: confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        toast.success('Password changed successfully!', { autoClose: 2000 });
        onClose();
      }
    } catch (error) {
      setPasswordError(error.response?.data?.detail || 'Error changing password. Please try again.');
      toast.error(error.response?.data?.detail || 'Error changing password. Please try again.');
      console.error('Error changing password:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update profile
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const updatedUser = { first_name: firstName, last_name: lastName };

      const response = await axios.put('http://localhost:8000/api/update_user', updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        setUpdateStatus('Profile updated successfully!');
        toast.success('Profile updated successfully!', { autoClose: 2000 });
        onClose();
      }
    } catch (error) {
      setUpdateStatus(error.response?.data?.detail || 'Error updating profile. Please try again.');
      toast.error(error.response?.data?.detail || 'Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Only call get2faStatus when the selected action is 'update2fa'
  useEffect(() => {
    if (selectedAction === 'update2fa') {
      get2faStatus();
    }
  }, [selectedAction]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        <h2 className="text-2xl font-bold mb-4 dark:text-white">User Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          {/* Action Dropdown */}
          <div className="w-full mb-4">
            <label htmlFor="action-select" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Select Action
            </label>
            <select
              id="action-select"
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="">-- Select Action --</option>
              <option value="updateProfile">Update Profile</option>
              <option value="changePassword">Change Password</option>
              <option value="update2fa">Update 2FA</option>
            </select>
          </div>

          {/* Conditional rendering based on the selected action */}
          {selectedAction === 'updateProfile' && (
            <>
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
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </>
          )}

          {selectedAction === 'changePassword' && (
            <>
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
                  placeholder="Confirm new password"
                />
              </div>

              {/* Error Message */}
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

              {/* Change Password Button */}
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </>
          )}

          {selectedAction === 'update2fa' && (
            <>
              <div className="w-full mb-4">
                <button
                  onClick={update2faStatus}
                  className={`w-full py-2 rounded ${is2faEnabled ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                  {is2faEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopup;
