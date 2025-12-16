import { useQuery } from "@tanstack/react-query";
import StudentApplicationDataRow from "../../Pages/TableRows/StudentApplicationDataRow";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Note: Assuming your backend returns { applications: [...] }
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-applications`);
      return Array.isArray(result.data)
        ? result.data
        : result.data.applications || [];
    },
  });

  console.log(applications);

  if (isLoading) return <LoadingSpinner />;

    // // Display message if no applications are found
    // if (applications.length === 0) {
    //   return (
    //     <div className="flex flex-col items-center justify-center p-10 h-[50vh] bg-gray-50">
    //       <h1 className="text-2xl font-bold text-gray-700 mb-4">
    //         No Applications Found
    //       </h1>
    //       <p className="text-gray-500">
    //         You have not submitted any scholarship applications yet.
    //       </p>
    //     </div>
    //   );
    // }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-3xl font-semibold leading-tight text-gray-800 mb-6">
            My Scholarship Applications
          </h2>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {/* NEW COLUMNS START HERE */}
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                    >
                      University Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                    >
                      University Address
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                    >
                      Subject Category
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                    >
                      Fees Paid
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                    >
                      Application Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                    >
                      Feedback (Moderator)
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold"
                    >
                      Actions
                    </th>
                    {/* NEW COLUMNS END HERE */}
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <StudentApplicationDataRow
                      key={application._id}
                      application={application} // Renamed prop to 'application' for consistency
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyApplications;
