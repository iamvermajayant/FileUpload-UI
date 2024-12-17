import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FilePreviewPopup from './file-preview-popup';

const PublicLinkAccess = ({ links }) => {
  const { linkId } = useParams();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const link = links.find(l => l.id === parseInt(linkId));

  if (!link) {
    return <div className="text-center mt-10 text-red-600">Link not found or has expired.</div>;
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === link.password) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleDownload = (file) => {
    // Implement download logic here
    console.log(`Downloading file: ${file.name}`);
  };

  if (link.password && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Password Protected Link</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Enter password"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shared Files</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {link.files.map((file) => (
          <div key={file.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{file.name}</h2>
            <p className="text-sm text-gray-600 mb-2">Size: {file.size}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleFileClick(file)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Preview
              </button>
              <button
                onClick={() => handleDownload(file)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedFile && (
        <FilePreviewPopup
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default PublicLinkAccess;

