import React, { useState } from 'react'; // Import React and the useState hook to manage the component's state
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component to display icons
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Import the 'Times' (close) icon
import axios from 'axios'; // Import axios for making HTTP requests

const TagCreationPopup = ({ onClose, onCreateTag }) => { // Define the TagCreationPopup component, accepts onClose and onCreateTag props
  const [formData, setFormData] = useState({ // Initialize state for form fields
    first_name: '', // First name field
    last_name: '', // Last name field
    place: '', // Place field
    description: '', // Description field
    notes: '' // Notes field
  });
  const [isLoading, setIsLoading] = useState(false); // State to track the loading status for form submission
  const [error, setError] = useState(null); // State to hold any error messages

  const handleChange = (e) => { // Function to handle changes in form fields
    const { name, value } = e.target; // Destructure the name and value of the input field
    setFormData(prevData => ({ // Update formData state with the new value for the specific field
      ...prevData, // Keep the other values intact
      [name]: value // Update the value of the changed field
    }));
  };

  const handleSubmit = async (e) => { // Function to handle form submission
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true); // Set loading state to true to show loading spinner
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:8000/api/tags/create', formData); // Send POST request to create a tag with form data
      onCreateTag(response.data); // Pass the newly created tag data to the parent component
      onClose(); // Close the popup once the tag is created successfully
    } catch (err) { // Catch any errors during the API request
      if (err.response && err.response.status === 422) { // If the error is a validation error (status 422)
        setError('Validation error. Please check your input.'); // Display a validation error message
      } else {
        setError('An error occurred while creating the tag. Please try again.'); // Display a general error message
      }
    } finally {
      setIsLoading(false); // Set loading state back to false once the request completes
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal container with background overlay */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md h-auto overflow-hidden flex flex-col">
        {/* Modal content container */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Create Tag</h2>
          {/* Title of the popup */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            {/* Close button */}
            <FontAwesomeIcon icon={faTimes} size={24} /> {/* FontAwesome close icon */}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Form container with overflow scroll */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Form fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">First Name</label>
              <input
                type="text" // Input field for first name
                name="first_name" // Name attribute to match state
                value={formData.first_name} // Set value to state value
                onChange={handleChange} // Handle input changes
                className="mt-1 block w-full px-4 py-2 text-base rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required // Make the field required
              />
            </div>
            {/* Repeat similar blocks for last name, place, description, and notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-base rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Place</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 text-base rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full px-4 py-2 text-base rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full px-4 py-2 text-base rounded-md border border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              ></textarea>
            </div>
          </form>
        </div>

        {error && (
          <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
            {/* Error message if any error occurs */}
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-2">
          <button
            type="button"
            onClick={onClose} // Close the popup when clicked
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit" // Submit the form when clicked
            onClick={handleSubmit} // Call handleSubmit function
            disabled={isLoading} // Disable the button when loading
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : 'Create'} {/* Change button text based on loading state */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagCreationPopup; // Export the component so it can be used elsewhere
