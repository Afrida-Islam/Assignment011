// src/components/Modals/EditApplicationModal.jsx
import React from "react";
import BasicModal from "./BasicModal"; // Adjust path as necessary

const EditApplicationModal = ({ isOpen, closeModal, application }) => {
  // In a real application, you would initialize form state here
  // and handle form submission (e.g., using React Hook Form, etc.)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting edited application for ID:", application?._id);
    // 1. API call to update the application
    // 2. Handle success/error
    closeModal();
  };

  return (
    <BasicModal
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Edit: ${application?.scholarshipName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600">
          Editing is only allowed when the application is **pending**.
        </p>

        {/* Placeholder for form fields */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Subject Category
          </label>
          <input
            id="subject"
            type="text"
            defaultValue={application?.subjectCategory}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* ... other editable fields ... */}

        <button
          type="submit"
          className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </BasicModal>
  );
};

export default EditApplicationModal;
