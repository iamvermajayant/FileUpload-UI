import React from 'react';
import { FaTimes, FaCopy, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

const ShareLinkModal = ({ link, onClose }) => {
  const shareUrl = `${window.location.origin}/share/${link.id}`;

  const handleCopyLink = () => {
    toast.success('Link copied to clipboard!');
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleEmailShare = () => {
    window.open(`mailto:?subject=Shared Files&body=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Share Link</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Share URL
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
            />
            <CopyToClipboard text={shareUrl} onCopy={handleCopyLink}>
              <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                <FaCopy />
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleWhatsAppShare}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center"
          >
            <FaWhatsapp className="mr-2" /> Share on WhatsApp
          </button>
          <button
            onClick={handleEmailShare}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
          >
            <FaEnvelope className="mr-2" /> Share via Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;

