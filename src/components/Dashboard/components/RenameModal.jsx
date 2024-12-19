import React from 'react'; // Import React

// RenameModal component accepts four props: newFileName, setNewFileName, confirmRename, and setIsRenaming
const RenameModal = ({
  newFileName,
  setNewFileName,
  confirmRename,
  setIsRenaming,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // Centered modal with dark background
      role="dialog" // Accessibility: specifies that this is a dialog box
      aria-modal="true" // Accessibility: indicates modal behavior (focus should be trapped inside)
      aria-labelledby="rename-modal-title" // Accessibility: links modal title for screen readers
    >
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"> {/* Modal box with white background */}
        <h3
          id="rename-modal-title"
          className="text-lg font-semibold text-gray-800 dark:text-white mb-4" // Modal title with dark mode support
        >
          Rename File
        </h3>

        {/* Input field for the new file name */}
        <input
          type="text"
          value={newFileName} // Controlled input with the newFileName prop
          onChange={(e) => setNewFileName(e.target.value)} // Updates the file name on change
          className="w-full p-2 mb-4 border rounded text-black dark:text-white bg-white dark:bg-gray-800" // Styling for the input
        />

        {/* Action buttons for canceling or confirming the rename */}
        <div className="flex justify-end space-x-2">
          {/* Cancel button that resets renaming */}
          <button
            onClick={() => setIsRenaming(false)} // Closes the rename modal without renaming
            className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
          >
            Cancel
          </button>

          {/* Rename button that triggers the renaming function */}
          <button
            onClick={confirmRename} // Calls the confirmRename function to apply the new file name
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameModal; // Export the RenameModal component
