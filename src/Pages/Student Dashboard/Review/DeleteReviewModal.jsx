// src/components/Modals/DeleteReviewModal.jsx
import React from "react";
import BasicModal from "../Actions/BasicModal"; // Assuming BasicModal exists

const DeleteReviewModal = ({
  isOpen,
  closeModal,
  reviewId,
  scholarshipName,
}) => {
  const handleDelete = () => {
    console.log(`Deleting review ID: ${reviewId}`);
    // 1. API call to delete the review (DELETE)
    // 2. Refresh the table data on success
    closeModal();
  };

  return (
    <BasicModal
      isOpen={isOpen}
      closeModal={closeModal}
      title="Confirm Deletion"
    >
      <p className="text-gray-700 mb-6">
        Are you sure you want to delete your review for **{scholarshipName}**?
        This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Yes, Delete Review
        </button>
      </div>
    </BasicModal>
  );
};
export default DeleteReviewModal;
