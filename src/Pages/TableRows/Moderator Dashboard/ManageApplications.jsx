import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "https://serverside11.vercel.app/all-applications"
      );
      return data;
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(
        `https://serverside11.vercel.app/applications/${id}`,
        {
          status,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-applications"]);
      toast.success("Status updated!");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Reject this application?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateStatus({ id, status: "rejected" });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-5xl font-bold text-green-800">
              Applied Applications
            </h2>
            <p className="text-gray-700  mt-1">
              Manage and track all student scholarship requests
            </p>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <span className="text-purple-700 font-semibold">
              Total: {applications.length}
            </span>
          </div>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <table className="min-w-full leading-normal bg-white">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="px-5 py-4 text-left text-xl font-bold text-gray-700 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-5 py-4 text-left text-xl font-bold text-gray-700  uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-5 py-4 text-left text-xl font-bold text-gray-700  uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-4 text-left text-xl font-bold text-gray-700  uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-5 py-4 text-center text-xl font-bold text-gray-700  uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-5 py-5 text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-bold text-base">
                          {app.studentName}
                        </span>
                        <span className="text-gray-500 italic text-xs">
                          {app.studentEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <p className="text-gray-700 font-medium">
                        {app.universityName}
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          app.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : app.status === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-sm font-semibold text-green-600 text-lg">
                      ${app.amountPaid}
                    </td>
                    <td className="px-5 py-5 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        {/* Details */}
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-600"
                          title="Details"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>

                        {/* Status Select */}
                        <select
                          onChange={(e) =>
                            updateStatus({
                              id: app._id,
                              status: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-700 text-xs rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-1.5 outline-none"
                          defaultValue={app.status}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>

                        {/* Feedback */}
                        <button
                          onClick={() => {
                            /* Feedback Logic */
                          }}
                          className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold"
                        >
                          Feedback
                        </button>

                        {/* Cancel */}
                        <button
                          disabled={app.status === "rejected"}
                          onClick={() => handleCancel(app._id)}
                          className={`p-2 rounded-full transition-all ${
                            app.status === "rejected"
                              ? "text-gray-300"
                              : "text-red-500 hover:bg-red-50"
                          }`}
                          title="Reject Application"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageApplications;
