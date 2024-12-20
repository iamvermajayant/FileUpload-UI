import React, { useState, useEffect } from 'react';
import { userRequest } from '../../../utils/apiClient';
import EditTagModal from '../components/EditTagModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageTagsContent = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTags = async () => {
    try {
      const response = await userRequest.get('/tags', {
        params: {
          page: 1,
          per_page: 30,
          sort_order: 'asc',
        },
      });
      console.log('API Response:', response);

      if (response.data && response.data.data) {
        setTags(response.data.data);
      } else {
        throw new Error('Unexpected data format from API');
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching tags:', err);
      setError(err.message || 'Failed to fetch tags');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (tagId) => {
    try {
      await userRequest.delete(`/tags/${tagId}`);
      toast.success('Tag deleted successfully');
      fetchTags();
    } catch (err) {
      console.error('Error deleting tag:', err);
      toast.error('Failed to delete the tag. Please try again.');
    }
  };

  const handleSaveEdit = async (tagData) => {
    try {
      await userRequest.put(`/tags/${editingTag.id}`, tagData);
      setIsEditModalOpen(false);
      toast.success('Tag updated successfully');
      fetchTags();
    } catch (err) {
      console.error('Error updating tag:', err);
      toast.error('Failed to update the tag. Please try again.');
    }
  };

  const filteredTags = tags.filter(tag =>
    `${tag.first_name} ${tag.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Manage Tags</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {isLoading && <p className="dark:text-white">Loading tags...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && filteredTags.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Name</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Place</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Description</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Notes</th>
                <th className="p-3 text-gray-600 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTags.map(tag => (
                <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-3 dark:text-white">{`${tag.first_name} ${tag.last_name}`}</td>
                  <td className="p-3 dark:text-white">{tag.place}</td>
                  <td className="p-3 dark:text-white">{tag.description}</td>
                  <td className="p-3 dark:text-white">{tag.notes}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEdit(tag)}
                      className="font-bold py-2 px-4 rounded mr-4"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="font-bold py-2 px-4 rounded"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !error && filteredTags.length === 0 && (
        <p className="dark:text-white">No tags found.</p>
      )}

      <EditTagModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        tag={editingTag}
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManageTagsContent;
