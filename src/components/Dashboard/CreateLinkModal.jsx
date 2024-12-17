import React, { useState } from 'react';
import { FaTimes, FaCopy, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify'; // Assuming react-toastify is used for toast messages

const CreateLinkModal = ({ files, onClose, onCreateLink }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [viewLimit, setViewLimit] = useState('');
  const [password, setPassword] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLink = onCreateLink({
      files: selectedFiles,
      expirationDate,
      viewLimit: viewLimit ? parseInt(viewLimit) : null,
      password,
    });
    setGeneratedLink(`${window.location.origin}/share/${newLink.id}`);
  };

  const handleCopyLink = () => {
    toast.success('Link copied to clipboard!');
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(generatedLink)}`, '_blank');
  };

  const handleEmailShare = () => {
    window.open(`mailto:?subject=Shared Files&body=${encodeURIComponent(generatedLink)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Link</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Files
            </label>
            <select
              multiple
              className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
              onChange={(e) => setSelectedFiles(Array.from(e.target.selectedOptions, option => option.value))}
            >
              {files.map(file => (
                <option key={file.id} value={file.id}>{file.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Expiration Date and Time
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="w-1/2 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
              <input
                type="time"
                className="w-1/2 p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              View Limit
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
              value={viewLimit}
              onChange={(e) => setViewLimit(e.target.value)}
              placeholder="Leave empty for unlimited views"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password (Optional)
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty for no password"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Create Link
            </button>
          </div>
        </form>
        {generatedLink && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Generated Link:</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
              />
              <CopyToClipboard text={generatedLink} onCopy={() => toast.success('Link copied to clipboard!')}>
                <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <FaCopy />
                </button>
              </CopyToClipboard>
            </div>
            <div className="mt-2 flex justify-center space-x-4">
              <button
                onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(generatedLink)}`, '_blank')}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
              >
                <FaWhatsapp className="mr-2" /> Share on WhatsApp
              </button>
              <button
                onClick={() => window.open(`mailto:?subject=Shared Files&body=${encodeURIComponent(generatedLink)}`, '_blank')}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
              >
                <FaEnvelope className="mr-2" /> Share via Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLinkModal;

