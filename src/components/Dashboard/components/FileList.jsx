// import React, { useEffect } from 'react';
// import { FaTh, FaList, FaDownload, FaEdit, FaTrash, FaEllipsisV, FaEye } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { getFileIcon, formatFileSize } from '../utils/fileHelpers';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchFiles } from '../../../store/slices/fileUploadSlice';

// const FileList = ({
//   files,
//   searchQuery,
//   isListView,
//   toggleView,
//   handleDownload,
//   handleRenameSelectedFile,
//   handleDelete,
//   selectedFiles,
//   handleSelectFile,
//   handlePreview,
// }) => {
//   // const filteredFiles = files.filter((file) =>
//   //   file.name.toLowerCase().includes(searchQuery.toLowerCase())
//   // );

//   const dispatch = useDispatch();
//   const { Allfiles, fetchStatus, error } = useSelector((state) => state.fileUpload);


//   useEffect(() => {
//     dispatch(fetchFiles({ page: 1, perPage: 10, sortOrder: "asc" }));
//   }, [dispatch]);

//   if (fetchStatus === "loading") {
//     return <div>Loading files...</div>;
//   }

//   if (fetchStatus === "failed") {
//     return <div>Error: {error}</div>;
//   }

  
  

//   return (
//     <>
//       <div className="flex justify-between items-center mt-2 mb-2">
//         <div></div>
//         <button
//           onClick={toggleView}
//           className="p-3 text-xl rounded-md hover:text-gray-500 transition-colors"
//         >
//           {isListView ? <FaTh /> : <FaList />}
//         </button>
//       </div>
//       {!isListView ? (
//         <ListViewFiles
//           Allfiles={Allfiles}
//           handleDownload={handleDownload}
//           handleRenameSelectedFile={handleRenameSelectedFile}
//           handleDelete={handleDelete}
//           handlePreview={handlePreview}
//         />
//       ) : (
//         <GridViewFiles
//           Allfiles={Allfiles}
//           handleDownload={handleDownload}
//           handleRenameSelectedFile={handleRenameSelectedFile}
//           handleDelete={handleDelete}
//           selectedFiles={selectedFiles}
//           handleSelectFile={handleSelectFile}
//           handlePreview={handlePreview}
//         />
//       )}
//     </>
//   );
// };

// const ListViewFiles = ({ Allfiles, handleDownload, handleRenameSelectedFile, handleDelete, handlePreview }) => (
//   <div className="mt-0 overflow-x-auto">
//     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//       <thead className="bg-gray-50 dark:bg-gray-800">
//         <tr>
//           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//             Name
//           </th>
//           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//             Size
//           </th>
//           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//             Type
//           </th>
//           <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//             Actions
//           </th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
//         {Allfiles?.map((file) => (
//           <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0 h-10 w-10 mr-4">
//                   {getFileIcon(file.type)}
//                 </div>
//                 <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
//                   {file.name}
//                 </div>
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap w-32">
//               <div className="text-sm text-gray-500 dark:text-gray-300">
//                 {formatFileSize(file.size)}
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap w-48">
//               <div className="text-sm text-gray-500 dark:text-gray-300">
//                 {file.type}
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
//               <button
//                 onClick={() => handleDownload(file)}
//                 className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2"
//                 title="Download"
//               >
//                 <FaDownload />
//               </button>
//               <button
//                 onClick={() => handleRenameSelectedFile(file)}
//                 className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2"
//                 title="Rename"
//               >
//                 <FaEdit />
//               </button>
//               <button
//                 onClick={() => handleDelete(file.id)}
//                 className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-2"
//                 title="Delete"
//               >
//                 <FaTrash />
//               </button>
              
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const GridViewFiles = ({ Allfiles, handleDownload, handleRenameSelectedFile, handleDelete, selectedFiles, handleSelectFile, handlePreview }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-0">
//     {Allfiles?.map((file) => (
//       <div
//         key={file.id}
//         className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-105"
//       >
//         <div className="absolute top-2 left-2 z-10">
//           <input
//             type="checkbox"
//             checked={selectedFiles.includes(file.id)}
//             onChange={() => handleSelectFile(file.id)}
//             className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
//           />
//         </div>
//         <div className="p-6">
//           <div className="mb-4 w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
//             {file.preview ? (
//               <img
//                 src={file.preview}
//                 alt={file.name}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="text-4xl">
//                 {getFileIcon(file.type)}
//               </div>
//             )}
//           </div>
//           <div className="text-center">
//             <p className="text-sm font-medium text-gray-800 dark:text-white truncate mb-1">
//               {file.name}
//             </p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">
//               {formatFileSize(file.size)}
//             </p>
//           </div>
//         </div>
//         <div className="absolute top-2 right-2">
//           <Menu as="div" className="relative inline-block text-left">
//             <div>
//               <Menu.Button className="inline-flex justify-center w-5 h-5 text-sm focus:outline-none">
//                 <FaEllipsisV className="w-4 h-4" />
//               </Menu.Button>
//             </div>
//             <Transition
//               as={React.Fragment}
//               enter="transition ease-out duration-100"
//               enterFrom="transform opacity-0 scale-95"
//               enterTo="transform opacity-100 scale-100"
//               leave="transition ease-in duration-75"
//               leaveFrom="transform opacity-100 scale-100"
//               leaveTo="transform opacity-0 scale-95"
//             >
//               <Menu.Items className="absolute right-0 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                 <div className="py-1">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <button
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } flex w-full items-center px-4 py-2 text-sm`}
//                         onClick={() => handleDownload(file)}
//                       >
//                         <FaDownload className="w-4 h-4 mr-3" />
//                         Download
//                       </button>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <button
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } flex w-full items-center px-4 py-2 text-sm`}
//                         onClick={() => handleRenameSelectedFile(file)}
//                       >
//                         <FaEdit className="w-4 h-4 mr-3" />
//                         Rename
//                       </button>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <button
//                         className={`${
//                           active ? "bg-gray-100 text-gray-900" : "text-gray-700"
//                         } flex w-full items-center px-4 py-2 text-sm`}
//                         onClick={() => handleDelete(file.id)}
//                       >
//                         <FaTrash className="w-4 h-4 mr-3" />
//                         Delete
//                       </button>
//                     )}
//                   </Menu.Item>
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </Menu>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// export default FileList;




//Latest Code 
import React, { useEffect, useState } from 'react';
import { FaTh, FaList, FaDownload, FaEdit, FaTrash, FaEllipsisV ,FaLink} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../../../store/slices/fileUploadSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CreateLinkModal from './create-link-modal';

const FileList = ({ isListView, toggleView, handleDownload, handleRenameSelectedFile, handleDelete }) => {
  const dispatch = useDispatch();
  const { Allfiles,status, fetchStatus, error, totalPages } = useSelector((state) => state.fileUpload);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    dispatch(fetchFiles({ page: currentPage, perPage, sortOrder: 'asc' }));
  }, [dispatch, currentPage, status]);

  const handleNextPage = () => {
    if (currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleOpenLinkModal = (file, groupId) => {
    setSelectedFile({ ...file, _id: groupId });
    setShowLinkModal(true);
  };

  const handleCreateLink = (fileId, expiration, password, viewLimit) => {
    // Implement your link creation logic here
    console.log('Creating link:', { fileId, expiration, password, viewLimit });
  };

  if (fetchStatus === 'loading') {
    return <div>Loading files...</div>;
  }

  if (fetchStatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  // if (fetchStatus === "succeeded") {
  //   console.log(Allfiles[0].files[0].original_filename)
  // }

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
          {/* <input
            type="text"
            className="py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
            value={searchQuery} // Bind the input value to searchQuery
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          /> */}
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
          Allfiles={Allfiles}
          handleDownload={handleDownload}
          handleRenameSelectedFile={handleRenameSelectedFile}
          handleDelete={handleDelete}
          handleOpenLinkModal={handleOpenLinkModal}
        />
      ) : (
        <GridViewFiles
          Allfiles={Allfiles}
          handleDownload={handleDownload}
          handleRenameSelectedFile={handleRenameSelectedFile}
          handleDelete={handleDelete}
        />
      )}
      {showLinkModal && (
        <CreateLinkModal
          Allfiles={Allfiles}
          preselectedFile={selectedFile}
          onClose={() => setShowLinkModal(false)}
          onCreateLink={handleCreateLink}
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </>
  );
};

// const ListViewFiles = ({ Allfiles, handleDownload, handleRenameSelectedFile, handleDelete }) => (
//   <div className="mt-0 overflow-x-auto">
//     {/* Table for displaying files in list view */}
//     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//       <thead className="bg-gray-50 dark:bg-gray-800">
//         <tr>
//           {/* Table Headers */}
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
//           {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th> */}
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
//         {Allfiles?.map((file) => (
//           <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="flex items-center">
//                 <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
//                   {file.files.map((file) => file.original_filename)}
//                 </div>
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap w-32">
//               <div className="text-sm text-gray-500 dark:text-gray-300">
//               {file.files.map((file) => file.file_size)}KB
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap w-48">
//               <div className="text-sm text-gray-500 dark:text-gray-300">
//               {file.files.map((file) => file.file_extension)}
//               </div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
//               {/* Action buttons: Download, Rename, Delete */}
//               <button
//                 onClick={() => handleDownload(file)}
//                 className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2"
//               >
//                 <FaDownload />
//               </button>
//               <button
//                 onClick={() => handleRenameSelectedFile(file)}
//                 className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2"
//               >
//                 <FaEdit />
//               </button>
//               <button
//                 onClick={() => handleDelete(file._id)}
//                 className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-2"
//               >
//                 <FaTrash />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const GridViewFiles = ({ Allfiles, handleDownload, handleRenameSelectedFile, handleDelete }) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
//     {Allfiles?.map((file) => (
//       <div key={file.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//         <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</div>
//         <div className="text-sm text-gray-500 dark:text-gray-300">{file.size}</div>
//         <div className="text-sm text-gray-500 dark:text-gray-300">{file.type}</div>
//         <div className="mt-4 flex justify-between">
//           <button
//             onClick={() => handleDownload(file)}
//             className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
//           >
//             <FaDownload />
//           </button>
//           <button
//             onClick={() => handleRenameSelectedFile(file)}
//             className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
//           >
//             <FaEdit />
//           </button>
//           <button
//             onClick={() => handleDelete(file.id)}
//             className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
//           >
//             <FaTrash />
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// );






const ListViewFiles = ({ Allfiles, handleDownload, handleRenameSelectedFile, handleDelete ,handleOpenLinkModal }) => (
  <div className="mt-0 overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Group ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Upload Time</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
        {Allfiles?.map((fileGroup) => (
          <React.Fragment key={fileGroup._id}>
            {fileGroup.files.map((file, fileIndex) => (
              <tr key={`${fileGroup._id}-${fileIndex}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {fileIndex === 0 && (
                  <td rowSpan={fileGroup.files.length} className="px-6 py-4 whitespace-nowrap align-top">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {fileGroup.group_id}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {file.original_filename}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {(file.file_size / 1024).toFixed(2)} KB
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {file.file_extension.toUpperCase()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date(fileGroup.upload_time).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    onClick={() => handleOpenLinkModal(file, fileGroup._id)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2"
                    title="Create Link"
                  >
                    <FaLink />
                  </button>
                  <button
                    onClick={() => handleDownload(file, fileGroup._id)}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => handleRenameSelectedFile(file, fileGroup._id)}
                    className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(fileGroup._id, file.saved_filename)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);





const GridViewFiles = ({ Allfiles, handleDownload, handleRenameSelectedFile, handleDelete, selectedFiles, handleSelectFile, handlePreview }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-0">
    {Allfiles?.map((file) => (
      <div
        key={file.id}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        {/* File selection checkbox */}
        <div className="absolute top-2 left-2 z-10">
          {/* <input
            type="checkbox"
            checked={selectedFiles.includes(file.id)} // Check if the file is selected
            onChange={() => handleSelectFile(file.id)} // Handle file selection
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          /> */}
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

const Pagination = ({ currentPage, totalPages, handleNextPage, handlePrevPage }) => (
  <div className="flex justify-between items-center mt-4">
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className="p-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <div>
      Page {currentPage} of {totalPages}
    </div>
    <button
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className="p-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default FileList;
