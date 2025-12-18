import React, { useState } from "react";
import BasicModal from "./BasicModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const AddReviewModal = ({ isOpen, closeModal, application }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // ভ্যালিডেশন চেক
    if (!comment || comment.length < 10) {
      return toast.error(
        "Please write a meaningful review (at least 10 characters)"
      );
    }

    setIsSubmitting(true);

    const reviewData = {
      scholarshipId:
        application?.scholarshipId ||
        application?.versityId ||
        application?._id, // আইডি চেক করুন
      universityName: application?.universityName,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      ratingPoint: parseInt(rating),
      reviewComment: comment,
      reviewDate: new Date().toISOString(), // সঠিক ডেট ফরম্যাট
    };

    try {
      const res = await axiosSecure.post(
        "https://serverside11.vercel.app/reviews",
        reviewData
      );

      if (res.data.insertedId) {
        toast.success("Review added successfully!");
        queryClient.invalidateQueries(["my-reviews"]); // কুয়েরি কি ঠিক আছে?
        closeModal();
        setComment("");
        setRating(5);
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      toast.error(
        "Submission failed: " +
          (error.response?.data?.message || "Server Error")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BasicModal isOpen={isOpen} closeModal={closeModal} title="Add Your Review">
      <div className="mb-4">
        <p className="text-sm text-gray-500">University:</p>
        <p className="font-bold text-purple-700">
          {application?.universityName}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating (1-5 Stars)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="Share your experience..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-4 py-3 rounded-md font-semibold text-white transition-colors ${
            isSubmitting ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </BasicModal>
  );
};

export default AddReviewModal;
