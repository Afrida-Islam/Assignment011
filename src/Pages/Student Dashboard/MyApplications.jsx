import { useQuery } from "@tanstack/react-query";
import StudentApplicationDataRow from "../../Pages/TableRows/StudentApplicationDataRow";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import AddReviewModal from "./Actions/AddReviewModal";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const result = await axiosSecure.get(
        `https://serverside11.vercel.app/my-applications/${user?.email}`
      );
      return result.data;
    },
  });
  const openReviewModal = (application) => {
    setSelectedApplication(application);
    setIsReviewModalOpen(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-5xl font-bold leading-tight text-green-800 mb-6">
          My Scholarship Applications
        </h2>
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
                  <th className="px-5 py-3 border-b text-left">Scholarship</th>
                  <th className="px-5 py-3 border-b text-left">University</th>
                  <th className="px-5 py-3 border-b text-left">
                    University Image
                  </th>
                  <th className="px-5 py-3 border-b text-left">Address</th>
                  <th className="px-5 py-3 border-b text-left">Category</th>
                  <th className="px-5 py-3 border-b text-left">Fees</th>
                  <th className="px-5 py-3 border-b text-left">Status</th>
                  <th className="px-5 py-3 border-b text-left">Feedback</th>
                  <th className="px-5 py-3 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <StudentApplicationDataRow
                    key={application._id}
                    application={application}
                    onReview={() => openReviewModal(application)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* রিভিউ মোডাল */}
      {selectedApplication && (
        <AddReviewModal
          isOpen={isReviewModalOpen}
          closeModal={() => setIsReviewModalOpen(false)}
          application={selectedApplication}
        />
      )}
    </div>
  );
};

export default MyApplications;
