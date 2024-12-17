import React, { useState } from 'react';
import { FaTimes, FaTrash, FaEdit, FaShare, FaCopy } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import ShareLinkModal from './ShareLinkModal';

const LinkManagementModal = ({ links, onClose, onUpdateLink, onDeleteLink }) => {
  const [selectedLinkToShare, setSelectedLinkToShare] = useState(null);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Links</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Files</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expiration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">View Limit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {links.map(link => (
                <tr key={link.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{link.files.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{link.expirationDate || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{link.viewLimit || 'Unlimited'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{link.viewCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{link.downloadCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}/share/${link.id}`}
                        className="w-64 p-1 text-xs border rounded text-black dark:text-white bg-white dark:bg-gray-700"
                      />
                      <CopyToClipboard 
                        text={`${window.location.origin}/share/${link.id}`} 
                        onCopy={() => toast.success('Link copied to clipboard!')}
                      >
                        <button className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                          <FaCopy className="w-4 h-4" />
                        </button>
                      </CopyToClipboard>
                      <button
                        onClick={() => setSelectedLinkToShare(link)}
                        className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <FaShare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onUpdateLink(link)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDeleteLink(link.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

{selectedLinkToShare && (
  <ShareLinkModal
    link={selectedLinkToShare}
    onClose={() => setSelectedLinkToShare(null)}
  />
)}

export default LinkManagementModal;

