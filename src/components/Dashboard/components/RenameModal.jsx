import React from 'react';

const RenameModal = ({
  newFileName,
  setNewFileName,
  confirmRename,
  setIsRenaming,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rename-modal-title"
    >
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
        <h3
          id="rename-modal-title"
          className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
        >
          Rename File
        </h3>
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="w-full p-2 mb-4 border rounded text-black dark:text-white bg-white dark:bg-gray-800"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsRenaming(false)}
            className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmRename}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal;

