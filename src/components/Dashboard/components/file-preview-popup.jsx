import React from 'react'; // Import React to use JSX syntax and create components
import {
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaImage,
  FaFile,
} from 'react-icons/fa'; // Import specific file icons from react-icons for displaying file types

// Helper function to get the file icon based on the file type
const getFileIcon = (fileType) => {
  switch (fileType) {
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <FaFileWord className="text-blue-500" />; // Word document icon
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return <FaFileExcel className="text-green-500" />; // Excel file icon
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return <FaFilePowerpoint className="text-orange-500" />; // PowerPoint file icon
    default:
      return <FaFile className="text-gray-500" />; // Default icon for unsupported file types
  }
};

// Main component to display a file preview popup
const FilePreviewPopup = ({ file, onConfirm, onCancel }) => {
  // Style object for the preview container to ensure consistent styling
  const previewContainerStyle = {
    width: '700px',
    height: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    overflow: 'hidden',
    backgroundColor: '#fff',
  };

  // Function to determine the preview of the file based on its type
  const getFilePreview = () => {
    switch (file.type) {
      // Display preview for PDF and plain text files
      case 'application/pdf':
      case 'text/plain':
        return (
          <iframe
            src={URL.createObjectURL(file)} // Use Blob URL to preview file
            title={file.name} // Set the title as the file name
            style={previewContainerStyle} // Apply the preview container styling
          />
        );
      // Display file icon and a message for office files (Word, Excel, PowerPoint)
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return (
          <div style={previewContainerStyle} className="flex flex-col">
            <div className="text-4xl mb-4">{getFileIcon(file.type)}</div> {/* Display the file type icon */}
            <p className="text-lg font-semibold mb-2">{file.name}</p> {/* Display the file name */}
            <p className="text-sm text-gray-500">
              Preview not available for this file type.
            </p>
            <a
              href={URL.createObjectURL(file)} // Provide a download link for these files
              download={file.name} // Set the file name for downloading
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Download to View
            </a>
          </div>
        );
      default:
        // If file type starts with 'image/', display an image preview
        if (file.type.startsWith('image/')) {
          return (
            <img
              src={URL.createObjectURL(file)} // Use Blob URL to display the image
              alt={file.name} // Set alt text as the file name
              style={previewContainerStyle} // Apply the preview container styling
              className="object-contain" // Ensure the image fits inside the container
            />
          );
        }
        // For other unknown file types, display a default message
        return (
          <div style={previewContainerStyle} className="flex flex-col">
            <div className="text-4xl mb-4">{getFileIcon(file.type)}</div> {/* Display the file icon */}
            <p className="text-lg font-semibold mb-2">{file.name}</p> {/* Display the file name */}
            <p className="text-sm text-gray-500">
              Preview not available for this file type.
            </p>
          </div>
        );
    }
  };

  return (
    // Create a fixed modal overlay with centered content for the popup
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          File Preview
        </h3>
        {/* Display the file preview returned by the getFilePreview function */}
        <div className="mb-4">{getFilePreview()}</div>
        {/* Display file name and size */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          File Name: {file.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          File Size: {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
        {/* Buttons for confirming or canceling the upload */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel} // Trigger the cancel function when clicked
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm} // Trigger the confirm function when clicked
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Confirm Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewPopup; // Export the FilePreviewPopup component for use in other parts of the app
