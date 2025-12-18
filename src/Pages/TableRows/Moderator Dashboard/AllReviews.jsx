import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { format } from "date-fns";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "https://serverside11.vercel.app/all-reviews"
      );
      return data;
    },
  });

  const { mutateAsync: deleteReview } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`https://serverside11.vercel.app/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-reviews"]);
      toast.success("Review deleted successfully!");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteReview(id);
        } catch (err) {
          toast.error("Failed to delete review");
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          All Student Reviews
        </h2>
        <p className="text-gray-500">Moderate student feedback and ratings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{review.userName}</h3>
                  <p className="text-xs text-gray-500">{review.userEmail}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm font-semibold text-purple-700">
                  {review.universityName}
                </p>
                <div className="flex text-yellow-500 my-1">
                  {[...Array(review.ratingPoint)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="ml-2 text-gray-600 text-xs">
                    ({review.ratingPoint}/5)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm italic mb-4">
                "{review.reviewComment}"
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
              <span className="text-xs text-gray-400">
                {review.reviewDate
                  ? format(new Date(review.reviewDate), "PP")
                  : "N/A"}
              </span>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-xl font-medium">
            No reviews found yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllReviews;
