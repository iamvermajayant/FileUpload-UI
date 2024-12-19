// import React from 'react';
// import { FaFileAlt, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaImage, FaFile } from 'react-icons/fa';

// const getFileIcon = (fileType) => {
//   switch (fileType) {
//     case 'application/msword':
//     case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//       return <FaFileWord className="text-blue-500" />;
//     case 'application/vnd.ms-excel':
//     case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
//       return <FaFileExcel className="text-green-500" />;
//     case 'application/vnd.ms-powerpoint':
//     case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
//       return <FaFilePowerpoint className="text-orange-500" />;
//     default:
//       return <FaFile className="text-gray-500" />;
//   }
// };

// const FilePreviewPopup = ({ file, onConfirm, onCancel }) => {
//   const getFilePreview = () => {
//     switch (file.type) {
//       case 'application/pdf':
//         return (
//           <iframe
//             src={URL.createObjectURL(file)}
//             title={file.name}
//             width="100%"
//             height="500px"
//           />
//         );
//       case 'application/msword':
//       case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//       case 'application/vnd.ms-excel':
//       case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
//       case 'application/vnd.ms-powerpoint':
//       case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
//         return (
//           <div className="flex flex-col items-center justify-center h-96">
//             <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
//             <p className="text-lg font-semibold mb-2">{file.name}</p>
//             <p className="text-sm text-gray-500">Preview not available for this file type.</p>
//             <a
//               href={URL.createObjectURL(file)}
//               download={file.name}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//             >
//               Download to View
//             </a>
//           </div>
//         );
//       case 'text/plain':
//         return (
//           <iframe
//             src={URL.createObjectURL(file)}
//             title={file.name}
//             width="100%"
//             height="500px"
//           />
//         );
//       default:
//         if (file.type.startsWith('image/')) {
//           return <img src={URL.createObjectURL(file)} alt={file.name} className="max-h-96 max-w-full object-contain" />;
//         }
//         return (
//           <div className="flex flex-col items-center justify-center h-96">
//             <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
//             <p className="text-lg font-semibold mb-2">{file.name}</p>
//             <p className="text-sm text-gray-500">Preview not available for this file type.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">File Preview</h3>
//         <div className="mb-4">
//           {getFilePreview()}
//         </div>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">File Name: {file.name}</p>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">File Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Confirm Upload
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilePreviewPopup;



import React from "react";
import { useDispatch } from "react-redux";
import { FaFileAlt, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaImage, FaFile } from "react-icons/fa";
import { uploadFile } from "../../../store/slices/fileUploadSlice";

const getFileIcon = (fileType) => {
  switch (fileType) {
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <FaFileWord className="text-blue-500" />;
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <FaFileExcel className="text-green-500" />;
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return <FaFilePowerpoint className="text-orange-500" />;
    default:
      return <FaFile className="text-gray-500" />;
  }
};

const FilePreviewPopup = ({ file, onCancel }) => {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(
      uploadFile({
        file,
        description: "Default Description", // You can replace this with dynamic data
        note: "Default Note", // Replace this with dynamic data
      })
    );
  };

  const getFilePreview = () => {
    switch (file.type) {
      case "application/pdf":
        return (
          <iframe
            src={URL.createObjectURL(file)}
            title={file.name}
            width="100%"
            height="350px"
          />
        );
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
            <p className="text-lg font-semibold mb-2">{file.name}</p>
            <p className="text-sm text-gray-500">Preview not available for this file type.</p>
            <a
              href={URL.createObjectURL(file)}
              download={file.name}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Download to View
            </a>
          </div>
        );
      case "text/plain":
        return (
          <iframe
            src={URL.createObjectURL(file)}
            title={file.name}
            width="100%"
            height="500px"
          />
        );
      default:
        if (file.type.startsWith("image/")) {
          return <img src={URL.createObjectURL(file)} alt={file.name} className="max-h-96 max-w-full object-contain" />;
        }
        return (
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
            <p className="text-lg font-semibold mb-2">{file.name}</p>
            <p className="text-sm text-gray-500">Preview not available for this file type.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">File Preview</h3>
        <div className="mb-4">{getFilePreview()}</div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">File Name: {file.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">File Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Confirm Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewPopup;

