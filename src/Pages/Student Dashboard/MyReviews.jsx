import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import {
  FaEdit,
  FaTrashAlt,
  FaStar,
  FaQuoteLeft,
  FaCalendarAlt,
  FaUniversity,
} from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingReview, setEditingReview] = useState(null);

  // ডাটা ফেচ করা (No change in function)
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `https://serverside11.vercel.app/my-reviews/${user?.email}`
      );
      return data;
    },
  });

  // ডিলিট মিউটেশন (No change in function)
  const { mutateAsync: deleteReview } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`https://serverside11.vercel.app/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-reviews", user?.email]);
      toast.success("Review deleted!");
    },
  });

  // আপডেট মিউটেশন (No change in function)
  const { mutateAsync: updateReview } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const { data } = await axiosSecure.patch(
        `https://serverside11.vercel.app/reviews/${id}`,
        updatedData
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-reviews", user?.email]);
      setEditingReview(null);
      toast.success("Review updated successfully!");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) await deleteReview(id);
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewComment = form.comment.value;
    const ratingPoint = form.rating.value;
    await updateReview({
      id: editingReview._id,
      updatedData: { reviewComment, ratingPoint },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-slate-800 flex items-center justify-center md:justify-start gap-3">
            <span className="p-3 bg-yellow-400 rounded-2xl shadow-lg shadow-yellow-200">
              <FaStar className="text-white" />
            </span>
            My Feedbacks
          </h2>
          <p className="text-slate-500 mt-2 ml-1">
            Manage and update your scholarship experiences
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaQuoteLeft className="text-slate-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">
              No reviews found
            </h3>
            <p className="text-slate-400">
              You haven't written any reviews yet.
            </p>
          </div>
        ) : (
          /* Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {review.scholarshipName || "Scholarship"}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg font-black text-sm">
                      <FaStar /> {review.ratingPoint}
                    </div>
                  </div>

                  <h3 className="text-slate-800 font-bold text-lg mb-1 flex items-center gap-2">
                    <FaUniversity className="text-slate-400 text-sm" />{" "}
                    {review.universityName}
                  </h3>

                  <div className="relative mt-4 mb-6">
                    <FaQuoteLeft className="absolute -top-2 -left-2 text-slate-100 text-3xl -z-0" />
                    <p className="text-slate-600 italic relative z-10 leading-relaxed truncate-3-lines">
                      "{review.reviewComment}"
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <FaCalendarAlt />{" "}
                      {review.reviewDate
                        ? new Date(review.reviewDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingReview(review)}
                        className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors"
                        title="Edit Review"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Review"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal (Enhanced UI) */}
        {editingReview && (
          <div className="modal modal-open backdrop-blur-md transition-all">
            <div className="modal-box rounded-[2.5rem] p-10 max-w-md bg-white shadow-2xl border-none">
              <div className="text-center mb-6">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaEdit className="text-indigo-600 text-2xl" />
                </div>
                <h3 className="font-black text-3xl text-slate-800">
                  Edit Feedback
                </h3>
                <p className="text-slate-400 text-sm">
                  Update your rating and comment
                </p>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label text-slate-700 font-bold mb-1">
                    How would you rate it?
                  </label>
                  <div className="relative">
                    <input
                      name="rating"
                      type="number"
                      min="1"
                      max="5"
                      defaultValue={editingReview.ratingPoint}
                      className="input input-bordered w-full rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 focus:outline-none pl-10"
                      required
                    />
                    <FaStar className="absolute left-4 top-4 text-yellow-400" />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label text-slate-700 font-bold mb-1">
                    Your detailed experience
                  </label>
                  <textarea
                    name="comment"
                    defaultValue={editingReview.reviewComment}
                    className="textarea textarea-bordered rounded-2xl border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 focus:outline-none h-32 leading-relaxed"
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-2xl h-14 shadow-lg shadow-indigo-200 text-lg font-bold"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingReview(null)}
                    className="btn bg-slate-100 hover:bg-slate-200 text-slate-600 border-none rounded-2xl h-14"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
