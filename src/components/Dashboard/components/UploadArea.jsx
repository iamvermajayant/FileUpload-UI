import React from 'react';
import { useDropzone } from 'react-dropzone';

const UploadArea = ({ handleUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleUpload,
    accept: {
      "image/*": [],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
    },
    multiple: false,
  });

  return (
    <section className="flex items-center justify-center w-full h-10 mt-10 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
      <div
        {...getRootProps()}
        className="flex flex-row items-center justify-center w-full h-full cursor-pointer"
      >
        <svg
          className="w-6 h-6 text-gray-400 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <title>Upload Icon</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <div className="flex flex-col justify-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Upload</span>
          </p>
        </div>
        <input {...getInputProps()} className="hidden" />
      </div>
    </section>
  );
};

export default UploadArea;

