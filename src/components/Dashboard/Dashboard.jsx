import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash, FaDownload, FaLink, FaEdit } from 'react-icons/fa'; // Added Edit and Link icons

function DashboardPage() {
  const navigate = useNavigate();

  // Initial data (You can fetch this from an API or a database in a real-world scenario)
  const [files, setFiles] = useState([
    { id: 1, name: 'file1.txt', size: '1MB', type: 'text/plain', tags: ['Important'], status: 'active' },
    { id: 2, name: 'file2.jpg', size: '2MB', type: 'image/jpeg', tags: ['Image'], status: 'active' },
    { id: 3, name: 'file3.pdf', size: '3MB', type: 'application/pdf', tags: ['Document'], status: 'expired' }
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [showShareModal, setShowShareModal] = useState(false); // State to manage modal visibility
  const [shareLink, setShareLink] = useState(''); // State to store file link

  // Functions for button actions
  const handleUpload = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const newFile = { id: Date.now(), name: file.name, size: file.size, type: file.type, tags: [], status: 'active' };
      setFiles((prevFiles) => [...prevFiles, newFile]);
      toast.success(`Uploaded ${file.name}!`);
    });
  };

  const handleDelete = (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(file => file.id !== fileId));
      toast.success('File deleted successfully!');
    }
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length > 0) {
      if (window.confirm('Are you sure you want to delete the selected files?')) {
        setFiles(files.filter(file => !selectedFiles.includes(file.id)));
        setSelectedFiles([]);
        toast.success('Files deleted successfully!');
      }
    } else {
      toast.error('No files selected for deletion');
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const handleUserProfile = () => {
    navigate('/user-profile');  // Navigate to User Profile page
  };

  const handleLogout = () => {
    navigate('/');  // Redirect to login page
  };

  // Handle search functionality
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle file download
  const handleDownload = (file) => {
    const element = document.createElement('a');
    const fileBlob = new Blob([file.name], { type: file.type });
    element.href = URL.createObjectURL(fileBlob);
    element.download = file.name;
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  // Dropzone setup for file upload
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleUpload(acceptedFiles),
    accept: '.txt,.jpg,.png,.pdf',  // File type validation (can add more)
  });

  // Handle file renaming
  const handleRenameFile = (fileId) => {
    const file = files.find(f => f.id === fileId);
    setEditingFile(fileId);
    setNewFileName(file.name);
  };

  const handleSaveRename = (fileId) => {
    setFiles(files.map(file => file.id === fileId ? { ...file, name: newFileName } : file));
    setEditingFile(null);
    setNewFileName('');
    toast.success('File renamed successfully!');
  };

  const handleCancelRename = () => {
    setEditingFile(null);
    setNewFileName('');
  };

  // Generate a dummy link for the file
  const handleShareLink = (fileId) => {
    const file = files.find(f => f.id === fileId);
    const link = `https://example.com/files/${file.id}`;
    setShareLink(link);  // Store the link in state
    setShowShareModal(true);  // Show the modal
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success('Link copied to clipboard!');
  };

  const handleShareOnGmail = () => {
    window.open(`mailto:?subject=Check out this file&body=${shareLink}`, '_blank');
  };

  const handleShareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${shareLink}`, '_blank');
  };

  // Calculate stats dynamically
  const totalFiles = files.length;
  const totalLinks = files.filter(file => file.type === 'application/pdf').length;  // Example logic for links
  const activeFiles = files.filter(file => file.status === 'active').length;
  const expiredFiles = files.filter(file => file.status === 'expired').length;

  return (
    <Layout>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-200 text-white h-screen p-4">
          <div className="flex flex-col space-y-4">
            {/* Button to trigger file upload */}
            <div {...getRootProps()} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer text-center">
              <input {...getInputProps()} />
              Upload
            </div>

            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={handleBulkDelete}
            >
              Bulk Delete
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
              onClick={handleUserProfile}
            >
              User Profile
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-black-800 dark:text-white-100 mb-4">Admin Dashboard</h2>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Total Files */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Total Files</h3>
              <p className="text-gray-600 dark:text-gray-300">{totalFiles} Files</p>
            </div>

            {/* Total Links */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Total Links</h3>
              <p className="text-gray-600 dark:text-gray-300">{totalLinks} Links</p>
            </div>

            {/* Active Files */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Active Files</h3>
              <p className="text-gray-600 dark:text-gray-300">{activeFiles} Active</p>
            </div>

            {/* Expired Files */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Expired Files</h3>
              <p className="text-gray-600 dark:text-gray-300">{expiredFiles} Expired</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8 mt-4">
            <input
              type="text"
              className="w-full p-3 rounded border border-gray-400"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Drag-and-Drop Upload */}
          <div {...getRootProps()} className="bg-dashed border-4 border-gray-400 p-10 rounded text-center mt-4">
            <input {...getInputProps()} />
            <p>Drag & drop some files here, or click to select files</p>
            <p className="text-gray-600 dark:text-gray-300">Supported formats: .txt, .jpg, .png, .pdf</p>
          </div>

          {/* Files List */}
          <div className="mb-8 mt-4">
            <h3 className="text-2xl font-semibold text-black-800 dark:text-white-100 mb-4">Files List</h3>
            <div className="space-y-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex justify-between items-center bg-gray dark:bg-white-400 p-4 rounded shadow-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                    />
                    <span className="ml-2">
                      {editingFile === file.id ? (
                        <input
                          type="text"
                          value={newFileName}
                          onChange={(e) => setNewFileName(e.target.value)}
                          className="border p-2 rounded"
                        />
                      ) : (
                        file.name
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="text-red-600 hover:text-red-800 ml-2"
                      onClick={() => handleDelete(file.id)}
                    >
                      <FaTrash />
                    </button>
                    <button
                      className="text-blue-600 hover:text-blue-800 ml-2"
                      onClick={() => handleDownload(file)}
                    >
                      <FaDownload />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800 ml-2"
                      onClick={() => handleShareLink(file.id)}
                    >
                      <FaLink />
                    </button>
                    {editingFile === file.id ? (
                      <>
                        <button
                          className="text-yellow-600 hover:text-yellow-800 ml-2"
                          onClick={() => handleSaveRename(file.id)}
                        >
                          Save
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800 ml-2"
                          onClick={handleCancelRename}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-gray-600 hover:text-gray-800 ml-2"
                        onClick={() => handleRenameFile(file.id)}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <span className="ml-2 text-gray-600 dark:text-gray-300">({file.size})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Link Modal */}
      {showShareModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-2xl mb-4">Share File Link</h3>
            <p className="text-sm mb-4">Link: <span className="font-bold">{shareLink}</span></p>
            <div className="flex justify-between mb-4">
              <button onClick={handleCopyLink} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Copy Link
              </button>
              <button onClick={handleShareOnGmail} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Share on Gmail
              </button>
              <button onClick={handleShareOnWhatsApp} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Share on WhatsApp
              </button>
            </div>
            <button onClick={() => setShowShareModal(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </Layout>
  );
}

export default DashboardPage;
