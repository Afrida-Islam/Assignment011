import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingReview, setEditingReview] = useState(null);

  // ডাটা ফেচ করা
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-reviews/${user?.email}`);
      return data;
    },
  });

  // ডিলিট মিউটেশন
  const { mutateAsync: deleteReview } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/reviews/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-reviews"]);
      toast.success("Review deleted!");
    },
  });

  // আপডেট মিউটেশন
  const { mutateAsync: updateReview } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const { data } = await axiosSecure.patch(`/reviews/${id}`, updatedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-reviews"]);
      setEditingReview(null);
      toast.success("Review updated successfully!");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) await deleteReview(id);
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const rating = form.rating.value;
    await updateReview({
      id: editingReview._id,
      updatedData: { comment, rating },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow-sm border">
        <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
          <FaStar className="text-yellow-400" /> My Written Reviews
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100 uppercase text-xs">
              <tr>
                <th>Scholarship & University</th>
                <th>Review Comment</th>
                <th>Review Date</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td>
                    <div className="font-bold text-green-700">
                      {review.scholarshipName}
                    </div>
                    <div className="text-xs text-gray-400">
                      {review.universityName}
                    </div>
                  </td>
                  <td className="max-w-xs truncate">{review.comment}</td>
                  <td>{new Date(review.date).toLocaleDateString()}</td>
                  <td>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold">
                      <FaStar /> {review.rating}
                    </div>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setEditingReview(review)}
                      className="btn btn-sm bg-blue-50 text-blue-600 border-none hover:bg-blue-600 hover:text-white"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-sm bg-red-50 text-red-600 border-none hover:bg-red-600 hover:text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingReview && (
          <div className="modal modal-open">
            <div className="modal-box rounded-3xl p-8">
              <h3 className="font-bold text-2xl mb-4 text-gray-800">
                Update Review
              </h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label font-bold">Rating (1-5)</label>
                  <input
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    defaultValue={editingReview.rating}
                    className="input input-bordered rounded-xl"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold">Review Comment</label>
                  <textarea
                    name="comment"
                    defaultValue={editingReview.comment}
                    className="textarea textarea-bordered rounded-xl h-24"
                    required
                  ></textarea>
                </div>
                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn bg-green-600 text-white border-none rounded-xl"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingReview(null)}
                    className="btn rounded-xl"
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
