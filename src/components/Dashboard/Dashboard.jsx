import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaTrash,
  FaDownload,
  FaRegFile,
  FaRegImage,
  FaRegFilePdf,
  FaEdit,
  FaFileAlt,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaList,
  FaTh,
  FaBars,
  FaEye,
} from "react-icons/fa";
import FilePreviewPopup from "./file-preview-popup";

// Utility function to format file size
const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} bytes`;
  else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  else if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  else return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

function DashboardPage() {
  const navigate = useNavigate();

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "file1.txt",
      size: 1048576,
      type: "text/plain",
      tags: ["Important"],
      status: "active",
      preview: null,
    },
    {
      id: 2,
      name: "file2.jpg",
      size: 2097152,
      type: "image/jpeg",
      tags: ["Image"],
      status: "active",
      preview: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "file3.pdf",
      size: 3145728,
      type: "application/pdf",
      tags: ["Document"],
      status: "expired",
      preview: null,
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [fileToRename, setFileToRename] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [isListView, setIsListView] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [fileToPreview, setFileToPreview] = useState(null);

  const handleDelete = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFiles(files.filter((file) => file.id !== fileId));
      toast.success("File deleted successfully!");
    }
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length > 0) {
      if (
        window.confirm(`Are you sure you want to delete ${selectedFiles.length} selected file(s)?`)
      ) {
        setFiles(files.filter((file) => !selectedFiles.includes(file.id)));
        setSelectedFiles([]);
        toast.success("Selected files deleted successfully!");
      }
    } else {
      toast.error("No files selected for deletion");
    }
  };

  const handleUserProfile = () => {
    navigate("/user-profile");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (file) => {
    // In a real application, you would generate a download link here
    const element = document.createElement("a");
    element.href = file.preview || "#";
    element.download = file.name;
    document.body.appendChild(element);
    element.click();
  };

  const handleUpload = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFileToUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    },
    multiple: false,
  });

  const confirmUpload = () => {
    if (fileToUpload) {
      const newFile = {
        id: Date.now(),
        name: fileToUpload.name,
        size: fileToUpload.size,
        type: fileToUpload.type,
        tags: [],
        status: "active",
        preview: fileToUpload.type.startsWith("image/")
          ? URL.createObjectURL(fileToUpload)
          : null,
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);
      setFileToUpload(null);
      toast.success(`Uploaded ${fileToUpload.name} successfully!`);
    }
  };

  const cancelUpload = () => {
    setFileToUpload(null);
  };

  const handleRenameSelectedFile = (file) => {
    setFileToRename(file);
    setNewFileName(file.name);
    setIsRenaming(true);
  };

  const confirmRename = () => {
    if (fileToRename && newFileName) {
      setFiles(files.map((file) =>
        file.id === fileToRename.id ? { ...file, name: newFileName } : file
      ));
      setIsRenaming(false);
      setFileToRename(null);
      setNewFileName("");
      toast.success("File renamed successfully!");
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(fileId)) {
        return prevSelectedFiles.filter((id) => id !== fileId);
      } else {
        return [...prevSelectedFiles, fileId];
      }
    });
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return <FaRegImage className="w-8 h-8 text-blue-500" />;
      case 'application/pdf':
        return <FaRegFilePdf className="w-8 h-8 text-red-500" />;
      case 'text/plain':
        return <FaRegFile className="w-8 h-8 text-gray-500" />;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <FaFileWord className="w-8 h-8 text-blue-700" />;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return <FaFileExcel className="w-8 h-8 text-green-700" />;
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return <FaFilePowerpoint className="w-8 h-8 text-orange-700" />;
      default:
        return <FaFileAlt className="w-8 h-8 text-gray-400" />;
    }
  };

  const toggleView = () => {
    setIsListView(!isListView);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePreview = (file) => {
    // Create a blob URL for the file
    const fileBlob = new Blob([file], { type: file.type });
    const fileUrl = URL.createObjectURL(fileBlob);

    setFileToPreview({
      ...file,
      preview: fileUrl
    });
  };

  const totalFiles = files.length;
  const totalLinks = files.filter((file) => file.type === "application/pdf").length;
  const activeFiles = files.filter((file) => file.status === "active").length;
  const expiredFiles = files.filter((file) => file.status === "expired").length;

  return (
    <Layout>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar section */}
        {isSidebarVisible && (
          <aside className="flex flex-col w-64 h-full px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <div className="relative mt-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
              <nav>
                {/* Create Link Button */}
                <a
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4V20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 12L12 16L18 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">Create Link</span>
                </a>

                {/* Delete Button */}
                <a
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                  onClick={handleBulkDelete}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 7L5 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 11V17M14 11V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 7H15V3H9V7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">Delete Selected</span>
                </a>

                {/* Logout Button */}
                <a
                  className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                  href="#"
                  onClick={handleLogout}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 7L7 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 7H15V17H7V7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mx-4 font-medium">Logout</span>
                </a>
              </nav>

              {/* User Profile Section */}
              <a
                href="#"
                onClick={handleUserProfile}
                className="flex items-center px-4 -mx-2 mt-6"
              >
                <img
                  className="object-cover mx-2 rounded-full h-9 w-9"
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="avatar"
                />
                <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
                  John Doe
                </span>
              </a>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-black dark:text-white">
                Admin Dashboard
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={toggleView}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  {isListView ? <FaTh /> : <FaList />}
                </button>
                <button
                  onClick={toggleSidebar}
                  className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  <FaBars />
                </button>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                  Total Files
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {totalFiles} Files
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                  Total Links
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {totalLinks} Links
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                  Active Files
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {activeFiles} Active
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
                  Expired Files
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {expiredFiles} Expired
                </p>
              </div>
            </div>

            {/* Drag and Drop Upload Area */}
            <div className="flex items-center justify-center w-full h-32 mt-10 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div
                {...getRootProps()}
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
              >
                <svg
                  className="w-10 h-10 text-gray-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supported file types: Images, PDFs, Word, Excel, PowerPoint, Text
                </p>
                <input {...getInputProps()} className="hidden" />
              </div>
            </div>

            {/* File Display */}
            {isListView ? (
              <div className="mt-8">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {filteredFiles.map((file) => (
                      <tr key={file.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {getFileIcon(file.type)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {file.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{formatFileSize(file.size)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">{file.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDownload(file)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-2"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handleRenameSelectedFile(file)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2"
                          >
                            Rename
                          </button>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="relative bg-white dark:bg-gray-700 rounded-lg shadow-md p-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                      className="absolute top-2 left-2 z-10"
                    />
                    <div className="mb-4">
                      <div className="mb-4 w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        {file.preview ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          getFileIcon(file.type)
                        )}
                      </div>

                      {/* File Details */}
                      <div className="w-full text-center">
                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-center space-x-2">
                        <button
                          className="bg-blue-500 text-white p-1 rounded"
                          onClick={() => handleDownload(file)}
                          title="Download"
                        >
                          <FaDownload className="w-4 h-4" />
                        </button>
                        <button
                          className="bg-red-500 text-white p-1 rounded"
                          onClick={() => handleDelete(file.id)}
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                        <button
                          className="bg-green-500 text-white p-1 rounded"
                          onClick={() => handleRenameSelectedFile(file)}
                          title="Rename"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rename Modal */}
            {isRenaming && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
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
            )}

            {/* File Preview Popup */}
            {fileToUpload && (
              <FilePreviewPopup
                file={fileToUpload}
                onConfirm={confirmUpload}
                onCancel={cancelUpload}
              />
            )}
          </div>
        </div>
      </div>
      {fileToPreview && (
        <FilePreviewPopup
          file={fileToPreview}
          onConfirm={() => {
            URL.revokeObjectURL(fileToPreview.preview);
            setFileToPreview(null);
          }}
          onCancel={() => {
            URL.revokeObjectURL(fileToPreview.preview);
            setFileToPreview(null);
          }}
        />
      )}
      <ToastContainer />
    </Layout>
  );
}

export default DashboardPage;

