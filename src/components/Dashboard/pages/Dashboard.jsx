import React, { useState, useCallback } from "react";
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
  const [showManageLinksModal, setShowManageLinksModal] = useState(false);
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);
  const [links, setLinks] = useState([]);

  const handleDelete = (fileId) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setFiles(files.filter((file) => file.id !== fileId));
      toast.success("File deleted successfully!");
    }
  };

  

  const handleBulkDelete = () => {
    if (selectedFiles.length > 0) {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedFiles.length} selected file(s)?`
        )
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

  const handleCreateLink = () => {
    setShowCreateLinkModal(true);
  };

  const createLink = (fileId, expiration, password, viewLimit) => {
    const file = files.find((f) => f.id === fileId);
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
    setLinks(
      links.map((link) =>
        link.id === linkId ? { ...link, status: "revoked" } : link
      )
    );
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
      setFiles(
        files.map((file) =>
          file.id === fileToRename.id ? { ...file, name: newFileName } : file
        )
      );
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
                totalFiles={files.length}
                totalLinks={links.length}
                activeFiles={files.filter((file) => file.status === "active").length}
                expiredFiles={files.filter((file) => file.status === "expired").length}
              />
              <UploadArea handleUpload={handleUpload} />
              <FileList
                files={files}
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
            onCancel={() => {
              URL.revokeObjectURL(fileToPreview.preview);
              setFileToPreview(null);
            }}
          />
        )}
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
            files={files}
            onClose={() => setShowCreateLinkModal(false)}
            onCreateLink={createLink}
          />
        )}
        <ToastContainer />
      </Layout>
    </ThemeProvider>
  );
}

export default DashboardPage;

