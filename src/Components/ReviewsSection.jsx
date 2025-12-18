import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

// Star Rating Component for the form (No change needed)
const StarRatingInput = ({ rating, setRating }) => {
  // ... (Code is correct)
  return (
    <div className="flex justify-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-3xl transition-colors duration-150 ${
            star <= rating
              ? "text-yellow-500"
              : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// --- মূল রিভিউ সাবমিশন মডাল কম্পোনেন্ট ---
const ReviewsSection = ({
  closeModal,
  isOpen, // <--- This prop must be boolean
  scholarshipId,
  scholarshipName,
}) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... (handleSubmitReview function is correct) ...

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please provide a star rating.");
      return;
    }
    if (comment.trim().length < 10) {
      alert("Please provide a detailed comment (minimum 10 characters).");
      return;
    }

    setIsSubmitting(true);

    const reviewData = {
      scholarshipId,
      reviewerId: user?.uid, // Assuming a unique user ID
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      rating: rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
    };

    try {
      // এই URL টি আপনার ব্যাক-এন্ডের রিভিউ পোস্ট করার API রুট হবে
      await axios.post(
        `https://serverside11.vercel.app/api/reviews/submit`,
        reviewData
      );

      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      closeModal();
    } catch (error) {
      console.error("Review submission failed:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen} // <--- The Dialog component correctly uses the 'isOpen' prop
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={closeModal} // <--- The onClose handler is correctly set
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg bg-white p-8 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-2xl rounded-xl"
          >
            <DialogTitle
              as="h3"
              className="text-2xl font-bold text-center leading-6 text-gray-900 mb-6 border-b pb-3"
            >
              Submit Your Review
            </DialogTitle>

            <form onSubmit={handleSubmitReview}>
              <div className="space-y-4">
                {/* Scholarship/Item Name */}
                <p className="text-md font-medium text-gray-700">
                  Reviewing:{" "}
                  <span className="font-semibold text-indigo-600">
                    {scholarshipName || "Item"}
                  </span>
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={user?.photoURL || "default_avatar.png"}
                    alt={user?.displayName || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <p className="text-lg font-medium text-gray-800">
                    {user?.displayName || "Guest User"}
                  </p>
                </div>

                {/* Rating Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                    Your Rating
                  </label>
                  <StarRatingInput rating={rating} setRating={setRating} />
                </div>

                {/* Comment Input */}
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    placeholder="Share your experience..."
                    required
                  />
                </div>
              </div>

              <div className="flex mt-8 justify-around">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/5 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none disabled:opacity-50 transition"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
                <button
                  type="button"
                  className="w-2/5 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewsSection;
