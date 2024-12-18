import React from 'react';
import { FaTh, FaList, FaDownload, FaEdit, FaTrash, FaEllipsisV, FaEye } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { getFileIcon, formatFileSize } from '../utils/fileHelpers';

const FileList = ({
  files,
  searchQuery,
  isListView,
  toggleView,
  handleDownload,
  handleRenameSelectedFile,
  handleDelete,
  selectedFiles,
  handleSelectFile,
  handlePreview,
}) => {
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mt-2 mb-2">
        <div></div>
        <button
          onClick={toggleView}
          className="p-3 text-xl rounded-md hover:text-gray-500 transition-colors"
        >
          {isListView ? <FaTh /> : <FaList />}
        </button>
      </div>
      {isListView ? (
        <ListViewFiles
          files={filteredFiles}
          handleDownload={handleDownload}
          handleRenameSelectedFile={handleRenameSelectedFile}
          handleDelete={handleDelete}
          handlePreview={handlePreview}
        />
      ) : (
        <GridViewFiles
          files={filteredFiles}
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

const ListViewFiles = ({ files, handleDownload, handleRenameSelectedFile, handleDelete, handlePreview }) => (
  <div className="mt-0 overflow-x-auto">
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
        {files.map((file) => (
          <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 mr-4">
                  {getFileIcon(file.type)}
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                  {file.name}
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-32">
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {formatFileSize(file.size)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap w-48">
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {file.type}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
              <button
                onClick={() => handleDownload(file)}
                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2"
                title="Download"
              >
                <FaDownload />
              </button>
              <button
                onClick={() => handleRenameSelectedFile(file)}
                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2"
                title="Rename"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(file.id)}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-2"
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

const GridViewFiles = ({ files, handleDownload, handleRenameSelectedFile, handleDelete, selectedFiles, handleSelectFile, handlePreview }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-0">
    {files.map((file) => (
      <div
        key={file.id}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)}
            onChange={() => handleSelectFile(file.id)}
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
              <div className="text-4xl">
                {getFileIcon(file.type)}
              </div>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-800 dark:text-white truncate mb-1">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatFileSize(file.size)}
            </p>
          </div>
        </div>
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
                        onClick={() => handleDownload(file)}
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
                        onClick={() => handleRenameSelectedFile(file)}
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
                        onClick={() => handleDelete(file.id)}
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

export default FileList;

