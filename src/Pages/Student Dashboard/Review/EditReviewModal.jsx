// src/components/Modals/EditReviewModal.jsx
import React, { useState } from "react";
import BasicModal from "../Actions/BasicModal"; // Assuming BasicModal exists

const EditReviewModal = ({ isOpen, closeModal, review }) => {
  const [newRating, setNewRating] = useState(review?.rating || 5);
  const [newComment, setNewComment] = useState(review?.reviewComment || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(
      `Updating review ${review?._id}: Rating ${newRating}, Comment: ${newComment}`
    );
    // 1. API call to update the review (PUT/PATCH)
    // 2. Refresh the table data on success
    closeModal();
  };

  return (
    <BasicModal
      isOpen={isOpen}
      closeModal={closeModal}
      title={`Edit Review for ${review?.scholarshipName}`}
    >
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating (1-5 Stars)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            required
            value={newRating}
            onChange={(e) => setNewRating(parseInt(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            rows="4"
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Update Review
        </button>
      </form>
    </BasicModal>
  );
};
export default EditReviewModal;
