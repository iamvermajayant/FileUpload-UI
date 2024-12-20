import React, { useState, useEffect } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const CreateLinkModal = ({ Allfiles, onClose, onCreateLink, preselectedFile = null }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [password, setPassword] = useState('');
  const [viewLimit, setViewLimit] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (preselectedFile) {
      setSelectedFile(preselectedFile._id);
    }
  }, [preselectedFile]);

  const handleCreateLink = () => {
    if (selectedFile !== null) {
      const expiration = expirationDate && expirationTime
        ? `${expirationDate}T${expirationTime}`
        : '';
      onCreateLink(selectedFile, expiration, password, viewLimit);
      onClose();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md h-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create Link</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select File</label>
            <select
              value={selectedFile || ''}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            >
              <option value="">Select a file</option>
              {Allfiles?.map((fileGroup) => (
                fileGroup.files.map((file, index) => (
                  <option key={`${fileGroup._id}-${index}`} value={fileGroup._id}>
                    {file.original_filename}
                  </option>
                ))
                // <option key={fileGroup._id} value={fileGroup._id}/>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiration Days</label>
              <input
                type="number"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tag Code</label>
              <input
                type="text"
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <input
                type="text"
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Note</label>
              <input
                type="text"
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password (optional)</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibility Limit</label>
            <input
              type="number"
              value={viewLimit}
              onChange={(e) => setViewLimit(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateLink}
            disabled={selectedFile === null}
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

