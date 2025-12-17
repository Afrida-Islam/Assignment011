// src/pages/MyReviews.jsx

import React, { useState } from "react";
import ReviewDataRow from "../components/ReviewDataRow"; // Import the row component

// --- Placeholder Data ---
const dummyReviews = [
  {
    _id: "rev101",
    scholarshipName: "STEM Excellence Grant",
    universityName: "Tech University of America",
    reviewComment:
      "A great experience overall! The application process was smooth, and the funding really helped with tuition.",
    reviewDate: "2024-05-15",
    rating: 5,
  },
  {
    _id: "rev102",
    scholarshipName: "Arts & Humanities Fellowship",
    universityName: "Global Arts Institute",
    reviewComment:
      "The communication was a bit slow, but the support staff were very helpful once I connected with them.",
    reviewDate: "2024-03-22",
    rating: 3,
  },
  {
    _id: "rev103",
    scholarshipName: "Local Community Bursary",
    universityName: "City College Downtown",
    reviewComment:
      "Simple to apply, but the final decision took much longer than expected. The grant amount was good.",
    reviewDate: "2023-11-01",
    rating: 4,
  },
];
// --- End Placeholder Data ---

const MyReviews = () => {
  // In a real app, this would be fetched from an API
  const [reviews, setReviews] = useState(dummyReviews);
  const [loading, setLoading] = useState(false); // Simulate loading state

  // In a real app, you would define functions here to handle data updates
  // after Edit/Delete operations from the modals.

  if (loading) {
    return <div className="text-center py-10">Loading reviews...</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        My Written Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-gray-50 text-gray-600">
          You have not submitted any reviews yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Scholarship Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  University Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs">
                  Review Comment
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <ReviewDataRow key={review._id} review={review} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
