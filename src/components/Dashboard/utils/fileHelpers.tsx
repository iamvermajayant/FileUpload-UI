import React from 'react';
import { FaFileAlt, FaRegImage, FaRegFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';

export const getFileIcon = (fileType) => {
  switch (fileType) {
    case "image/jpeg":
    case "image/png":
    case "image/gif":
      return <FaRegImage className="w-8 h-8 text-blue-500" />;
    case "application/pdf":
      return <FaRegFilePdf className="w-8 h-8 text-red-500" />;
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <FaFileWord className="w-8 h-8 text-blue-700" />;
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <FaFileExcel className="w-8 h-8 text-green-700" />;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return <FaFilePowerpoint className="w-8 h-8 text-orange-700" />;
    default:
      return <FaFileAlt className="w-8 h-8 text-gray-400" />;
  }
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

export const isImageFile = (fileType) => {
  return fileType.startsWith('image/');
};

export const isPDFFile = (fileType) => {
  return fileType === 'application/pdf';
};

export const getColorByFileType = (fileType) => {
  if (isImageFile(fileType)) return 'text-blue-500';
  if (isPDFFile(fileType)) return 'text-red-500';
  switch (fileType) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return 'text-blue-700';
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return 'text-green-700';
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return 'text-orange-700';
    default:
      return 'text-gray-400';
  }
};

export const truncateFilename = (filename, maxLength = 20) => {
  if (filename.length <= maxLength) return filename;
  const extension = getFileExtension(filename);
  const nameWithoutExtension = filename.slice(0, filename.lastIndexOf('.'));
  const truncatedName = nameWithoutExtension.slice(0, maxLength - extension.length - 3) + '...';
  return truncatedName + '.' + extension;
};

