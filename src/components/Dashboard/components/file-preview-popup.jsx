//   // import { useDispatch, useSelector } from "react-redux";
//   // import { FaFileAlt, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaImage, FaFile } from "react-icons/fa";
//   // import { uploadFile } from "../../../store/slices/fileUploadSlice";
//   // import { toast } from "react-toastify";
//   // import { useEffect } from "react";

//   // const getFileIcon = (fileType) => {
//   //   switch (fileType) {
//   //     case "application/msword":
//   //     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//   //       return <FaFileWord className="text-blue-500" />;
//   //     case "application/vnd.ms-excel":
//   //     case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
//   //       return <FaFileExcel className="text-green-500" />;
//   //     case "application/vnd.ms-powerpoint":
//   //     case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
//   //       return <FaFilePowerpoint className="text-orange-500" />;
//   //     default:
//   //       return <FaFile className="text-gray-500" />;
//   //   }
//   // };

//   // const FilePreviewPopup = ({ file, onCancel }) => {
//   //   const dispatch = useDispatch();
//   //   const { status, error } = useSelector((state) => state.fileUpload);

//   //   useEffect(() => {
//   //     if (status === "loading") {
//   //       toast.info("Uploading file...");
//   //     } else if (status === "succeeded") {
//   //       toast.success("File uploaded successfully!");
//   //     } else if (status === "failed" && error) {
//   //       toast.error(`File upload failed: ${error}`);
//   //     }
//   //   }, [status, error]);

//   //   const handleConfirm = () => {
//   //     dispatch(
//   //       uploadFile({
//   //         file,
//   //         description: "Default Description", // You can replace this with dynamic data
//   //         note: "Default Note", // Replace this with dynamic data
//   //       })
//   //     );
//   //   };

//   //   const getFilePreview = () => {
//   //     switch (file.type) {
//   //       case "application/pdf":
//   //         return (
//   //           <iframe
//   //             src={URL.createObjectURL(file)}
//   //             title={file.name}
//   //             width="100%"
//   //             height="350px"
//   //           />
//   //         );
//   //       case "application/msword":
//   //       case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//   //       case "application/vnd.ms-excel":
//   //       case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
//   //       case "application/vnd.ms-powerpoint":
//   //       case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
//   //         return (
//   //           <div className="flex flex-col items-center justify-center h-96">
//   //             <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
//   //             <p className="text-lg font-semibold mb-2">{file.name}</p>
//   //             <p className="text-sm text-gray-500">Preview not available for this file type.</p>
//   //             <a
//   //               href={URL.createObjectURL(file)}
//   //               download={file.name}
//   //               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//   //             >
//   //               Download to View
//   //             </a>
//   //           </div>
//   //         );
//   //       case "text/plain":
//   //         return (
//   //           <iframe
//   //             src={URL.createObjectURL(file)}
//   //             title={file.name}
//   //             width="100%"
//   //             height="500px"
//   //           />
//   //         );
//   //       default:
//   //         if (file.type.startsWith("image/")) {
//   //           return <img src={URL.createObjectURL(file)} alt={file.name} className="max-h-96 max-w-full object-contain" />;
//   //         }
//   //         return (
//   //           <div className="flex flex-col items-center justify-center h-96">
//   //             <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
//   //             <p className="text-lg font-semibold mb-2">{file.name}</p>
//   //             <p className="text-sm text-gray-500">Preview not available for this file type.</p>
//   //           </div>
//   //         );
//   //     }
//   //   };

//   //   return (
//   //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//   //       <div className="bg-slate-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-auto">
//   //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">File Preview</h3>
//   //         <div className="mb-4">{getFilePreview()}</div>
//   //         <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">File Name: {file.name}</p>
//   //         <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">File Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
//   //         <div className="flex justify-end space-x-2">
//   //           <button
//   //             onClick={onCancel}
//   //             className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
//   //           >
//   //             Cancel
//   //           </button>
//   //           <button
//   //             onClick={handleConfirm}
//   //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//   //           >
//   //             Confirm Upload
//   //           </button>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // };

//   // export default FilePreviewPopup;



//   import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FaFileAlt,
//   FaFilePdf,
//   FaFileWord,
//   FaFileExcel,
//   FaFilePowerpoint,
//   FaFile,
// } from "react-icons/fa";
// import { uploadFile } from "../../../store/slices/fileUploadSlice";
// import { toast } from "react-toastify";

// const getFileIcon = (fileType) => {
//   switch (fileType) {
//     case "application/msword":
//     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//       return <FaFileWord className="text-blue-500" />;
//     case "application/vnd.ms-excel":
//     case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
//       return <FaFileExcel className="text-green-500" />;
//     case "application/vnd.ms-powerpoint":
//     case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
//       return <FaFilePowerpoint className="text-orange-500" />;
//     case "application/pdf":
//       return <FaFilePdf className="text-red-500" />;
//     default:
//       return <FaFile className="text-gray-500" />;
//   }
// };

// const FilePreviewPopup = ({ file, onCancel }) => {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.fileUpload);

//   const [previewFiles, setPreviewFiles] = useState([]);

//   useEffect(() => {
//     setPreviewFiles(file);
//   }, [file]);

//   useEffect(() => {
//     if (status === "loading") {
//       toast.info("Uploading file...");
//     } else if (status === "succeeded") {
//       toast.success("File uploaded successfully!");
//     } else if (status === "failed" && error) {
//       toast.error(`File upload failed: ${error}`);
//     }
//   }, [status, error]);

//   const handleConfirm = (file) => {
//     dispatch(
//       uploadFile({
//         file,
//         description: "Default Description", // Replace this with dynamic data
//         note: "Default Note", // Replace this with dynamic data
//       })
//     );
//   };

//   const getFilePreview = (file) => {
//     if (file.path.endsWith(".pdf")) {
//       return (
//         <iframe
//           src={file.relativePath}
//           title={file.path}
//           width="100%"
//           height="350px"
//         />
//       );
//     } else if (
//       file.path.endsWith(".docx") ||
//       file.path.endsWith(".xlsx") ||
//       file.path.endsWith(".pptx")
//     ) {
//       return (
//         <div className="flex flex-col items-center justify-center h-96">
//           <div className="text-4xl mb-4">
//             {getFileIcon(file.path.split(".").pop())}
//           </div>
//           <p className="text-lg font-semibold mb-2">{file.path}</p>
//           <p className="text-sm text-gray-500">
//             Preview not available for this file type.
//           </p>
//           <a
//             href={file.relativePath}
//             download={file.path}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Download to View
//           </a>
//         </div>
//       );
//     } else if (file.path.endsWith(".txt")) {
//       return (
//         <iframe
//           src={file.relativePath}
//           title={file.path}
//           width="100%"
//           height="500px"
//         />
//       );
//     } else if (
//       file.path.endsWith(".png") ||
//       file.path.endsWith(".jpg") ||
//       file.path.endsWith(".jpeg")
//     ) {
//       return (
//         <img
//           src={file.relativePath}
//           alt={file.path}
//           className="max-h-96 max-w-full object-contain"
//         />
//       );
//     } else {
//       return (
//         <div className="flex flex-col items-center justify-center h-96">
//           <div className="text-4xl mb-4">{getFileIcon(file.path)}</div>
//           <p className="text-lg font-semibold mb-2">{file.path}</p>
//           <p className="text-sm text-gray-500">
//             Preview not available for this file type.
//           </p>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-slate-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-auto">
//         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           File Previews
//         </h3>
//         <div className="space-y-4">
//           {previewFiles?.map((file, index) => (
//             <div key={index} className="border p-4 rounded-lg bg-white dark:bg-gray-900">
//               {getFilePreview(file)}
//               <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
//                 File Name: {file.path}
//               </p>
//               <div className="flex justify-end space-x-2 mt-4">
//                 <button
//                   onClick={() => handleConfirm(file)}
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//                 >
//                   Confirm Upload
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           onClick={onCancel}
//           className="mt-6 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilePreviewPopup;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFile,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { uploadFile } from "../../../store/slices/fileUploadSlice";
import { toast } from "react-toastify";

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
    case "application/pdf":
      return <FaFilePdf className="text-red-500" />;
    default:
      return <FaFile className="text-gray-500" />; // Default icon for unsupported file types
  }
};

const FilePreviewPopup = ({ files, onCancel }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.fileUpload);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  useEffect(() => {
    if (status === "loading") {
      toast.info("Uploading files...");
    } else if (status === "succeeded") {
      toast.success("Files uploaded successfully!");
    } else if (status === "failed" && error) {
      toast.error(`File upload failed: ${error}`);
    }
  }, [status, error]);

  const handleConfirmUpload = () => {
      dispatch(
        uploadFile({
          files,
          description: "Default Description", // Replace this with dynamic data
          note: "Default Note", // Replace this with dynamic data
        })
      );
   
    onCancel(); // Close the popup after confirming upload
  };

  const getFilePreview = (file) => {
    if (file.type === "application/pdf") {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title={file.name}
          className="w-full h-96"
        />
      );
    } else if (
      file.type === "application/msword" ||
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/vnd.ms-excel" ||
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-powerpoint" ||
      file.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
          <p className="text-lg font-semibold mb-2">{file.name}</p>
          <p className="text-sm text-gray-500 mb-4">
            Preview not available for this file type.
          </p>
          <a
            href={URL.createObjectURL(file)}
            download={file.name}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Download to View
          </a>
        </div>
      );
    } else if (file.type === "text/plain") {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title={file.name}
          className="w-full h-96"
        />
      );
    } else if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="max-h-96 max-w-full object-contain"
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-4xl mb-4">{getFileIcon(file.type)}</div>
          <p className="text-lg font-semibold mb-2">{file.name}</p>
          <p className="text-sm text-gray-500">
            Preview not available for this file type.
          </p>
        </div>
      );
    }
  };

  const goToPreviousFile = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : files.length - 1
    );
  };

  const goToNextFile = () => {
    setCurrentFileIndex((prevIndex) =>
      prevIndex < files.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    // Create a fixed modal overlay with centered content for the popup
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          File Preview ({currentFileIndex + 1} of {files.length})
        </h3>
        <div className="space-y-4">
          {files.length > 0 && (
            <div className="border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              {getFilePreview(files[currentFileIndex])}
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                File Name: {files[currentFileIndex].name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                File Size: {(files[currentFileIndex].size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={goToPreviousFile}
              className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              aria-label="Previous file"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNextFile}
              className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              aria-label="Next file"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmUpload}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Confirm Upload ({files.length} files)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreviewPopup; // Export the FilePreviewPopup component for use in other parts of the app
