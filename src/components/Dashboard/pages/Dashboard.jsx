import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";
import FileList from "../components/FileList";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import UploadArea from "../components/UploadArea";
import ManageLinksModal from "../components/manage-links-modal";
import CreateLinkModal from "../components/create-link-modal";
import FilePreviewPopup from "../components/file-preview-popup";
import RenameModal from "../components/RenameModal";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider } from 'next-themes';
import { useSelector } from "react-redux";
import { deleteFile, fetchFiles } from "../../../store/slices/fileUploadSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';

function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Allfiles = useSelector((state) => state.fileUpload.Allfiles);
  const fetchStatus = useSelector((state) => state.fileUpload.fetchStatus);

  const [searchQuery, setSearchQuery] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [fileToRename, setFileToRename] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [isListView, setIsListView] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [fileToPreview, setFileToPreview] = useState(null);
  const [showManageLinksModal, setShowManageLinksModal] = useState(false);
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [links, setLinks] = useState([]);

  // State for file stats
  const [totalFiles, setTotalFiles] = useState(0);
  const [totalLinks, setTotalLinks] = useState(0);
  const [activeFiles, setActiveFiles] = useState(0);
  const [expiredFiles, setExpiredFiles] = useState(0);

  // Fetch file stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/admin/analytics/files-info', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            accept: 'application/json',
          },
        });
        const { total_files, total_links, active_links, expired_links } = response.data;
        setTotalFiles(total_files);
        setTotalLinks(total_links);
        setActiveFiles(active_links);
        setExpiredFiles(expired_links);
      } catch (error) {
        console.error("Error fetching file stats", error);
        toast.error("Failed to fetch file stats");
      }
    };

    fetchStats();
  }, []); // This effect runs once when the component is mounted

  const handleDelete = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteFile(fileId));
      toast.success("File deleted successfully!");
    }
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length > 0) {
      if (window.confirm(`Are you sure you want to delete ${selectedFiles.length} selected file(s)?`)) {
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

  const handleCreateLink = () => {
    setShowCreateLinkModal(true);
  };

  const createLink = (fileId, expiration, password, viewLimit) => {
    const file = Allfiles.find((f) => f.id === fileId);
    if (file) {
      const newLink = {
        id: uuidv4(),
        fileId: file.id,
        fileName: file.name,
        expiration,
        password,
        viewLimit: parseInt(viewLimit),
        views: 0,
        downloads: 0,
        status: "active",
      };
      setLinks([...links, newLink]);
      setShowCreateLinkModal(false);
      toast.success("Link created successfully!");
    }
  };

  const revokeLink = (linkId) => {
    setLinks(links.map((link) =>
      link.id === linkId ? { ...link, status: "revoked" } : link
    ));
  };

  const extendLink = (linkId) => {
    console.log("Extend link clicked:", linkId);
  };

  const handleManageLinks = () => {
    setShowManageLinksModal(true);
  };

  const handleDownload = (file) => {
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

  const toggleView = () => {
    setIsListView(!isListView);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePreview = (file) => {
    const fileBlob = new Blob([file], { type: file.type });
    const fileUrl = URL.createObjectURL(fileBlob);

    setFileToPreview({
      ...file,
      preview: fileUrl,
    });
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
          />
          <main className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader toggleSidebar={toggleSidebar} />
            <section className="flex-1 overflow-y-auto p-9">
              <DashboardStats
                totalFiles={totalFiles}
                totalLinks={totalLinks}
                activeFiles={activeFiles}
                expiredFiles={expiredFiles}
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
            </section>
          </main>
        </div>
        {isRenaming && (
          <RenameModal
            newFileName={newFileName}
            setNewFileName={setNewFileName}
            confirmRename={confirmRename}
            setIsRenaming={setIsRenaming}
          />
        )}
        {fileToUpload && (
          <FilePreviewPopup
            file={fileToUpload}
            onConfirm={confirmUpload}
            onCancel={cancelUpload}
          />
        )}
        {fileToPreview && (
          <FilePreviewPopup
            file={fileToPreview}
            onConfirm={() => {
              URL.revokeObjectURL(fileToPreview.preview);
              setFileToPreview(null);
            }}
            onCancel={() => setFileToPreview(null)}
          />
        )}
        {showCreateLinkModal && (
          <CreateLinkModal
            createLink={createLink}
            fileToUpload={fileToUpload}
          />
        )}
        {showManageLinksModal && (
          <ManageLinksModal
            links={links}
            revokeLink={revokeLink}
            extendLink={extendLink}
          />
        )}
        <ToastContainer />
      </Layout>
    </ThemeProvider>
  );
}

export default DashboardPage;
