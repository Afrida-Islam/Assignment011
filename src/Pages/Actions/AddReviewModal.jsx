// src/components/Modals/AddReviewModal.jsx
import React, { useState } from "react";
import BasicModal from "./BasicModal"; // Adjust path as necessary

const AddReviewModal = ({ isOpen, closeModal, applicationId }) => {
  // Local state for the review inputs
  const [rating, setRating] = useState(5); // Default to a positive rating
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5 stars.");
      return;
    }

    setIsSubmitting(true);
    console.log(
      `Submitting review for ID ${applicationId}: Rating ${rating}, Comment: ${comment}`
    );

    try {
      // --- Placeholder for API Call ---
      // const response = await fetch(`/api/applications/${applicationId}/review`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ rating, comment })
      // });
      // if (!response.ok) throw new Error('Failed to submit review');

      // Simulate a delay for API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Review submitted successfully!");
      closeModal();
      // You would typically refetch the application data here to update the list/row
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
      // Clear form state
      setRating(5);
      setComment("");
    }
  };

  return (
    <BasicModal isOpen={isOpen} closeModal={closeModal} title="Add Your Review">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating Input */}
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rating (1-5 Stars)
          </label>
          <input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value, 10))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        {/* Comment Input (Text area) */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="Share your experience..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-md font-semibold text-white transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </BasicModal>
  );
};

export default AddReviewModal;
