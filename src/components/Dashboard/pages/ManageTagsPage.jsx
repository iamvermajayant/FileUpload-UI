import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faTag } from '@fortawesome/free-solid-svg-icons';

const ManageTagsContent = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTags, setFilteredTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/tags');
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        setTags(data);
        setFilteredTags(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const filtered = tags.filter(tag =>
      tag.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchQuery, tags]);

  const handleEdit = (tagId) => {
    // Implement edit functionality
    console.log('Edit tag:', tagId);
  };

  const handleDelete = (tagId) => {
    // Implement delete functionality
    console.log('Delete tag:', tagId);
  };

  const TagStats = () => {
    const totalTags = filteredTags.length;
    const uniqueUsers = new Set(filteredTags.map(tag => `${tag.first_name} ${tag.last_name}`)).size;
    const totalDescriptions = filteredTags.reduce((sum, tag) => sum + (tag.description ? 1 : 0), 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-100">Total Tags</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-200">{totalTags}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-100">Unique Users</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-200">{uniqueUsers}</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-100">Tags with Descriptions</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-200">{totalDescriptions}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Manage Tags</h1>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <TagStats />

      {isLoading && <p className="text-center">Loading tags...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Icon</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Name</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Description</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Place</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Notes</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTags.map((tag) => (
                <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3">
                    <FontAwesomeIcon icon={faTag} size="lg" className="text-gray-400" />
                  </td>
                  <td className="p-3 dark:text-white">{`${tag.first_name} ${tag.last_name}`}</td>
                  <td className="p-3 dark:text-white">{tag.description}</td>
                  <td className="p-3 dark:text-white">{tag.place}</td>
                  <td className="p-3 dark:text-white">{tag.notes}</td>
                  <td className="p-3 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(tag.id)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-2">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button onClick={() => handleDelete(tag.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTagsContent;

