import React, { useState, useCallback } from "react"; // Importing React hooks for state and callbacks
import { useNavigate } from "react-router-dom"; // Importing for navigation
import Layout from "../../Layout"; // Importing layout component
import { ToastContainer, toast } from "react-toastify"; // For showing notifications
import "react-toastify/dist/ReactToastify.css"; // Importing toast CSS
import Sidebar from "../components/Sidebar"; // Sidebar component
import FileList from "../components/FileList"; // File list component
import DashboardHeader from "../components/DashboardHeader"; // Dashboard header component
import DashboardStats from "../components/DashboardStats"; // Dashboard stats component
import UploadArea from "../components/UploadArea"; // File upload area component
import ManageLinksModal from "../components/manage-links-modal"; // Modal for managing links
import CreateLinkModal from "../components/create-link-modal"; // Modal for creating links
import FilePreviewPopup from "../components/file-preview-popup"; // Popup for file preview
import RenameModal from "../components/RenameModal"; // Modal for renaming files
import AllUsersContent from "./AllUsersPage"; // Page for listing all users
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { ThemeProvider } from 'next-themes'; // For theming support
import ManageTagsContent from './ManageTagsPage';
import { useSelector } from "react-redux";
import { deleteFile, fetchFiles } from "../../../store/slices/fileUploadSlice";
import { useDispatch } from 'react-redux';

function DashboardPage() {
  const navigate = useNavigate();
  // const [files, setFiles] = useState([
  //   {
  //     id: 1,
  //     name: "file1.txt",
  //     size: 1048576,
  //     type: "text/plain",
  //     tags: ["Important"],
  //     status: "active",
  //     preview: null,
  //   },
  //   {
  //     id: 2,
  //     name: "file2.jpg",
  //     size: 2097152,
  //     type: "image/jpeg",
  //     tags: ["Image"],
  //     status: "active",
  //     preview: "https://picsum.photos/200/300",
  //   },
  //   {
  //     id: 3,
  //     name: "file3.pdf",
  //     size: 3145728,
  //     type: "application/pdf",
  //     tags: ["Document"],
  //     status: "expired",
  //     preview: null,
  //   },
  // ]);
  const Allfiles = useSelector((state) => state.fileUpload.Allfiles);
  const fetchStatus = useSelector((state) => state.fileUpload.fetchStatus);

  // Other state variables
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [newFileName, setNewFileName] = useState(""); // For storing new file name during renaming
  const [isRenaming, setIsRenaming] = useState(false); // Boolean to handle renaming state
  const [fileToRename, setFileToRename] = useState(null); // File to be renamed
  const [selectedFiles, setSelectedFiles] = useState([]); // Files that are selected
  const [fileToUpload, setFileToUpload] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]); // File being uploaded
  const [isListView, setIsListView] = useState(false); // Boolean for toggling between list and grid view
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Boolean for showing/hiding sidebar
  const [fileToPreview, setFileToPreview] = useState(null); // For file preview popup
  const [showManageLinksModal, setShowManageLinksModal] = useState(false); // To show manage links modal
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false); // To show create link modal
  const [links, setLinks] = useState([]); // State to manage links
  const [currentView, setCurrentView] = useState("dashboard"); // Current view in the dashboard (either 'dashboard' or 'users')

  // Function to handle file deletion  const dispatch = useDispatch();
 

  const handleDelete = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteFile(fileId));
      //dispatch(fetchFiles({ page: 1, perPage : 8, sortOrder: 'asc' }));
      toast.success("File deleted successfully!");
    }
  };

  // Function to handle bulk file deletion
  const handleBulkDelete = () => {
    if (selectedFiles.length > 0) {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedFiles.length} selected file(s)?`
        )
      ) {
        //setFiles(files.filter((file) => !selectedFiles.includes(file.id)));
        setSelectedFiles([]);
        toast.success("Selected files deleted successfully!");
      }
    } else {
      toast.error("No files selected for deletion"); // Show error if no files selected
    }
  };

  // Function to navigate to the user profile page
  const handleUserProfile = () => {
    navigate("/user-profile");
  };

  // Function to log out and navigate to home
  const handleLogout = () => {
    navigate("/"); // Navigate to home page
  };

  // Function to open the create link modal
  const handleCreateLink = () => {
    setShowCreateLinkModal(true); // Show create link modal
  };

  // Function to create a link for a file
  const createLink = (fileId, expiration, password, viewLimit) => {
    const file = Allfiles.find((f) => f.id === fileId);
    if (file) {
      const newLink = {
        id: uuidv4(), // Generate unique link ID
        fileId: file.id,
        fileName: file.name,
        expiration,
        password,
        viewLimit: parseInt(viewLimit),
        views: 0,
        downloads: 0,
        status: "active", // Set link status to active
      };
      setLinks([...links, newLink]); // Add the new link to the state
      setShowCreateLinkModal(false); // Close modal
      toast.success("Link created successfully!"); // Show success message
    }
  };

  // Function to revoke a link by ID
  const revokeLink = (linkId) => {
    setLinks(
      links.map((link) =>
        link.id === linkId ? { ...link, status: "revoked" } : link
      ) // Update link status to revoked
    );
  };

  // Function to extend a link (functionality not implemented yet)
  const extendLink = (linkId) => {
    console.log("Extend link clicked:", linkId); // Log link ID
  };

  // Function to open manage links modal
  const handleManageLinks = () => {
    setShowManageLinksModal(true); // Show modal
  };

  // Function to handle file download
  const handleDownload = (file) => {
    const element = document.createElement("a"); // Create download link element
    element.href = file.preview || "#"; // Use file preview URL
    element.download = file.name; // Set download attribute with file name
    document.body.appendChild(element); // Append element to the document
    element.click(); // Trigger the download
  };

  // const handleUpload = useCallback((acceptedFiles) => {
  //   const filesToUpload = acceptedFiles.slice(0, 5);

  //   setFileToUpload(filesToUpload);

  //   console.log(fileToUpload)
  // }, []);


  // Callback to handle file upload (using the useCallback hook for optimization)
  const handleUpload = useCallback((acceptedFiles) => {
    setFilesToUpload((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  console.log(fileToUpload)

  // Function to confirm and complete the file upload
  const confirmUpload = () => {
    if (fileToUpload) {
      const newFile = {
        id: Date.now(), // Use timestamp as a unique ID
        name: fileToUpload.name,
        size: fileToUpload.size,
        type: fileToUpload.type,
        tags: [], // No tags initially
        status: "active", // Set file status to active
        preview: fileToUpload.type.startsWith("image/") // Generate preview URL if it's an image
          ? URL.createObjectURL(fileToUpload)
          : null,
      };
      //setFiles((prevFiles) => [...prevFiles, newFile]);
      setFileToUpload(null);
      toast.success(`Uploaded ${fileToUpload.name} successfully!`);
    }
  };

  // Function to cancel the file upload
  const cancelUpload = () => {
    setFileToUpload(null); // Clear the fileToUpload state
  };

  // Function to initiate renaming of a selected file
  const handleRenameSelectedFile = (file) => {
    setFileToRename(file); // Set the file to rename
    setNewFileName(file.name); // Pre-fill the input with the current file name
    setIsRenaming(true); // Show renaming modal
  };

  // Function to confirm renaming of a file
  const confirmRename = () => {
    if (fileToRename && newFileName) {
      // setFiles(
      //   files.map((file) =>
      //     file.id === fileToRename.id ? { ...file, name: newFileName } : file
      //   )
      // );
      setIsRenaming(false);
      setFileToRename(null);
      setNewFileName("");
      toast.success("File renamed successfully!");
    }
  };

  // Function to handle file selection for bulk actions
  const handleSelectFile = (fileId) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(fileId)) {
        return prevSelectedFiles.filter((id) => id !== fileId); // Deselect file
      } else {
        return [...prevSelectedFiles, fileId]; // Select file
      }
    });
  };

  // Function to toggle between list and grid view
  const toggleView = () => {
    setIsListView(!isListView); // Toggle view
  };

  // Function to toggle the visibility of the sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
  };

  // Function to preview a file before performing any actions on it
  const handlePreview = (file) => {
    const fileBlob = new Blob([file], { type: file.type }); // Create a Blob object
    const fileUrl = URL.createObjectURL(fileBlob); // Generate a preview URL

    setFileToPreview({
      ...file,
      preview: fileUrl, // Set file preview state
    });
  };

  // Function to handle view change (either dashboard or all users)
  const handleViewChange = (view) => {
    setCurrentView(view); // Change current view state
  };

  const renderContent = () => {
    switch (currentView) {
      case 'allUsers':
        return <AllUsersContent />;
      case 'manageTags':
        return <ManageTagsContent />;
      default:
        return (
          <>
            <DashboardStats
              totalFiles={Allfiles.length}
              totalLinks={links.length}
              activeFiles={Allfiles.filter((file) => file.status === "active").length}
              expiredFiles={Allfiles.filter((file) => file.status === "expired").length}
            />
            <UploadArea handleUpload={handleUpload} />
            <FileList
              files={Allfiles}
              searchQuery={searchQuery}
              isListView={isListView}
              toggleView={toggleView}
              handleDownload={handleDownload}
              handleRenameSelectedFile={handleRenameSelectedFile}
              handleDelete={handleDelete}
              selectedFiles={selectedFiles}
              handleSelectFile={handleSelectFile}
              handlePreview={handlePreview}
            />
          </>
        );
    }
  };


  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            isSidebarVisible={isSidebarVisible}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleCreateLink={handleCreateLink}
            handleManageLinks={handleManageLinks}
            handleBulkDelete={handleBulkDelete}
            handleLogout={handleLogout}
            handleUserProfile={handleUserProfile}
            onViewChange={handleViewChange}
          />
          <main className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader toggleSidebar={toggleSidebar} />
            <section className="flex-1 overflow-y-auto p-9">
              {renderContent()}
            </section>
          </main>
        </div>
        {/* Modals */}
        {isRenaming && (
          <RenameModal
            newFileName={newFileName}
            setNewFileName={setNewFileName}
            confirmRename={confirmRename}
            setIsRenaming={setIsRenaming}
          />
        )}
        {filesToUpload.length > 0 && (
        <FilePreviewPopup
          files={filesToUpload}
          onCancel={() => setFilesToUpload([])}
        />
      )}
        {/* {fileToUpload && (
          <FilePreviewPopup
            file={fileToUpload}
            onConfirm={confirmUpload}
            onCancel={cancelUpload}
          />
        )} */}
        {/* {fileToPreview && (
          <FilePreviewPopup
            file={fileToPreview}
            onConfirm={() => {
              URL.revokeObjectURL(fileToPreview.preview); // Revoke preview URL after confirmation
              setFileToPreview(null); // Clear preview
            }}
            onCancel={() => {
              URL.revokeObjectURL(fileToPreview.preview); // Revoke preview URL on cancel
              setFileToPreview(null); // Clear preview
            }}
          />
        )} */}
        {showManageLinksModal && (
          <ManageLinksModal
            links={links}
            onClose={() => setShowManageLinksModal(false)}
            onRevoke={revokeLink}
            onExtend={extendLink}
          />
        )}
        {showCreateLinkModal && (
          <CreateLinkModal
            Allfiles={Allfiles}
            onClose={() => setShowCreateLinkModal(false)}
            onCreateLink={createLink}
          />
        )}
        <ToastContainer /> {/* Toast notifications container */}
      </Layout>
    </ThemeProvider>
  );
}

export default DashboardPage;

