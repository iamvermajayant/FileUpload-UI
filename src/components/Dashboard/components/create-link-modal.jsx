import React, { useState } from 'react'; // Import necessary React hooks for managing component state
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons from react-icons

const CreateLinkModal = ({ files, onClose, onCreateLink }) => {
  // State hooks for managing modal fields
  const [selectedFile, setSelectedFile] = useState(null); // Holds the selected file ID
  const [expirationDate, setExpirationDate] = useState(''); // Holds the expiration date value
  const [expirationTime, setExpirationTime] = useState(''); // Holds the expiration time value
  const [password, setPassword] = useState(''); // Holds the password value
  const [viewLimit, setViewLimit] = useState(''); // Holds the visibility limit (number of views)
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility of the password

  // Function to handle link creation
  const handleCreateLink = () => {
    if (selectedFile !== null) {
      // If a file is selected, construct the expiration date and time
      const expiration = expirationDate && expirationTime
        ? `${expirationDate}T${expirationTime}` // Combine date and time into one string
        : ''; // If no expiration, set to empty string
      // Call the passed 'onCreateLink' function with the selected file and other data
      onCreateLink(selectedFile, expiration, password, viewLimit);
      onClose(); // Close the modal after creating the link
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between true/false to show or hide the password
  };

  return (
    // Modal background overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal content container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md h-auto">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Link</h2>
          {/* Close button */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaTimes size={24} /> {/* X icon for closing */}
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Select file dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select File</label>
            <select
              value={selectedFile || ''} // Display selected file ID or empty
              onChange={(e) => setSelectedFile(Number(e.target.value))} // Update selected file on change
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            >
              <option value="">Select a file</option>
              {Allfiles.map((file) => (
                <option key={file._id} value={file.id}>{file._id}</option>
              ))}
            </select>
          </div>

          {/* Expiration date and time input fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiration Date</label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)} // Update expiration date
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiration Time</label>
              <input
                type="time"
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)} // Update expiration time
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Password input field with toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password (optional)</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between password and text type
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password value
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={togglePasswordVisibility} // Toggle visibility
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />} {/* Eye icons */}
              </button>
            </div>
          </div>

          {/* View limit input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibility Limit</label>
            <input
              type="number"
              value={viewLimit}
              onChange={(e) => setViewLimit(e.target.value)} // Update view limit
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="mt-6 flex justify-end space-x-2">
          {/* Cancel button */}
          <button 
            onClick={onClose} // Close modal on click
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          {/* Create button */}
          <button
            onClick={handleCreateLink} // Trigger link creation
            disabled={selectedFile === null} // Disable if no file is selected
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLinkModal;
