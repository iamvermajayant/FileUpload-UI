import React, { useState } from "react"; // Import React and useState for managing state
import {
  FaTh,
  FaList,
  FaDownload,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaEye,
} from "react-icons/fa"; // Import various icons for actions
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome search icon
import { Menu, Transition } from "@headlessui/react"; // Import Menu and Transition components from Headless UI for dropdown menu
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { getFileIcon, formatFileSize } from "../utils/fileHelpers"; // Import utility functions for file icon and size formatting

const FileList = ({
  files,
  isListView,
  toggleView,
  handleDownload,
  handleRenameSelectedFile,
  handleDelete,
  selectedFiles,
  handleSelectFile,
  handlePreview,
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Filter the files based on the search query
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Bar and View Toggle Button */}
      <div className="relative mt-6 mb-4 flex items-center justify-between space-x-4">
        {/* Search Bar */}
        <div className="flex-grow relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon
              icon={faSearch}
              className="w-5 h-5 text-gray-400"
            />
          </span>
          <input
            type="text"
            className="py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
            value={searchQuery} // Bind the input value to searchQuery
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          />
        </div>
        {/* File View Toggle Button */}
        <button
          onClick={toggleView} // Toggle between list view and grid view
          className="p-3 text-xl rounded-md hover:text-gray-500 transition-colors"
        >
          {isListView ? <FaTh /> : <FaList />} {/*Toggle icon based on view type*/}
        </button>
      </div>

      {/* Display files based on selected view */}
      {isListView ? (
        <ListViewFiles
          files={filteredFiles} // Pass filtered files to ListViewFiles component
          handleDownload={handleDownload}
          handleRenameSelectedFile={handleRenameSelectedFile}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
        />
      ) : (
        <GridViewFiles
          files={filteredFiles} // Pass filtered files to GridViewFiles component
          handleDownload={handleDownload}
          handleRenameSelectedFile={handleRenameSelectedFile}
          handleDelete={handleDelete}
          selectedFiles={selectedFiles}
          handleSelectFile={handleSelectFile}
          handlePreview={handlePreview}
        />
      )}
    </>
  );
};

// List View Component
const ListViewFiles = ({
  files,
  handleDownload,
  handleRenameSelectedFile,
  handleDelete,
  handlePreview,
}) => (
  <div className="mt-0 overflow-x-auto">
    {/* Table for displaying files in list view */}
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {/* Table Headers */}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
        {/* Iterate over files and display each file's information */}
        {files.map((file) => (
          <tr
            key={file.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 mr-4">
                  {getFileIcon(file.type)} {/* Display file icon based on type */}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                  {file.name} {/* Display file name */}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-32">
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {formatFileSize(file.size)} {/* Display formatted file size */}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-48">
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {file.type} {/* Display file type */}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
              {/* Action buttons: Download, Rename, Delete */}
              <button
                onClick={() => handleDownload(file)} // Handle file download
                className="hover:text-indigo-900  dark:hover:text-indigo-300 mr-4 text-lg"
                title="Download"
              >
                <FaDownload />
              </button>
              <button
                onClick={() => handleRenameSelectedFile(file)} // Handle file renaming
                className="hover:text-green-900 dark:hover:text-green-300 mr-4 text-lg"
                title="Rename"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(file.id)} // Handle file deletion
                className="hover:text-red-900 dark:hover:text-red-300 mr-4 text-lg"
                title="Delete"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Grid View Component
const GridViewFiles = ({
  files,
  handleDownload,
  handleRenameSelectedFile,
  handleDelete,
  selectedFiles,
  handleSelectFile,
  handlePreview,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-0">
    {/* Iterate over files and display each file in grid format */}
    {files.map((file) => (
      <div
        key={file.id}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        {/* File selection checkbox */}
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)} // Check if the file is selected
            onChange={() => handleSelectFile(file.id)} // Handle file selection
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
        </div>
        <div className="p-6">
          <div className="mb-4 w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            {file.preview ? (
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl">{getFileIcon(file.type)}</div> 
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-800 dark:text-white truncate mb-1">
              {file.name} {/* Display file name */}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatFileSize(file.size)} {/* Display formatted file size */}
            </p>
          </div>
        </div>
        {/* Dropdown menu for additional actions */}
        <div className="absolute top-2 right-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-5 h-5 text-sm focus:outline-none">
                <FaEllipsisV className="w-4 h-4" />
              </Menu.Button>
            </div>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } flex w-full items-center px-4 py-2 text-sm`}
                        onClick={() => handleDownload(file)} // Handle file download from menu
                      >
                        <FaDownload className="w-4 h-4 mr-3" />
                        Download
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } flex w-full items-center px-4 py-2 text-sm`}
                        onClick={() => handleRenameSelectedFile(file)} // Handle file renaming from menu
                      >
                        <FaEdit className="w-4 h-4 mr-3" />
                        Rename
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } flex w-full items-center px-4 py-2 text-sm`}
                        onClick={() => handleDelete(file.id)} // Handle file deletion from menu
                      >
                        <FaTrash className="w-4 h-4 mr-3" />
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    ))}
  </div>
);

export default FileList; // Export FileList component as default
