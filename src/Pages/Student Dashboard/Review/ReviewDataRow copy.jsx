// src/components/ReviewDataRow.jsx

import React, { useState } from "react";
// Assuming you have a BasicModal and separate files for the action modals
import BasicModal from "../Actions/BasicModal"; // Placeholder
import EditReviewModal from "./EditReviewModal"; // Placeholder
import DeleteReviewModal from "./DeleteReviewModal"; // Placeholder

// --- Placeholder for Rating Display (e.g., Star icons) ---
const StarRating = ({ rating }) => {
  const filledStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return (
    <span className="text-yellow-500 font-bold">
      {filledStars}
      <span className="text-gray-300">{emptyStars}</span>
    </span>
  );
};
// --- End Placeholder for Rating Display ---

const ReviewDataRow = ({ review }) => {
  // States for action modals
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    _id,
    scholarshipName,
    universityName,
    reviewComment,
    reviewDate,
    rating,
  } = review;

  // Format date nicely
  const formattedDate = new Date(reviewDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <tr className="hover:bg-gray-50 transition duration-150 ease-in-out">
      {/* Scholarship Name */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-medium">
        {scholarshipName}
      </td>
      {/* University Name */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
        {universityName}
      </td>
      {/* Review Comment */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm max-w-xs whitespace-normal">
        <p className="text-gray-700 italic line-clamp-2">{reviewComment}</p>
      </td>
      {/* Review Date */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm text-gray-500">
        {formattedDate}
      </td>
      {/* Rating */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
        <StarRating rating={rating} />
      </td>
      {/* Actions */}
      <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
        <div className="flex space-x-2">
          {/* Edit Button */}
          <button
            onClick={() => setIsEditOpen(true)}
            className="text-indigo-600 hover:text-indigo-900 font-semibold text-xs py-1 px-3 border border-indigo-200 rounded-lg transition duration-150"
            title="Edit Review"
          >
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="text-red-600 hover:text-red-900 font-semibold text-xs py-1 px-3 border border-red-200 rounded-lg transition duration-150"
            title="Delete Review"
          >
            Delete
          </button>
        </div>
      </td>

      {/* --- MODALS --- */}

      {/* Edit Review Modal */}
      <EditReviewModal
        isOpen={isEditOpen}
        closeModal={() => setIsEditOpen(false)}
        review={review}
      />

      {/* Delete Review Modal */}
      <DeleteReviewModal
        isOpen={isDeleteOpen}
        closeModal={() => setIsDeleteOpen(false)}
        reviewId={_id}
        scholarshipName={scholarshipName}
      />
    </tr>
  );
};

export default ReviewDataRow;
