import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
// NOTE: Assuming you have a standard axios/fetch hook or utility for data fetching
// If using TanStack Query, replace this simple fetch with useQuery.

// --- Placeholder for API Base URL ---
const SCHOLARSHIP_API_URL = "http://localhost:3000/data";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- 1. Fetch Data Function ---
  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const response = await fetch(SCHOLARSHIP_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch scholarships: ${response.statusText}`);
      }
      const data = await response.json();
      setScholarships(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(`Error loading data: ${error.message}`);
      setScholarships([]); // Clear scholarships on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // --- 2. Action Handlers ---

  const handleUpdate = (scholarshipId) => {
    // Redirect to an Edit page. You'll need to create this page.
    navigate(`/dashboard/edit-scholarship/${scholarshipId}`);
    toast(`Redirecting to edit ID: ${scholarshipId}`, { icon: "✏️" });
  };

  const handleDelete = async (scholarshipId) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?")) {
      return;
    }

    const deleteToastId = toast.loading("Deleting scholarship...");

    try {
      // NOTE: Ensure your backend supports the DELETE method on this endpoint
      const response = await fetch(`${SCHOLARSHIP_API_URL}/${scholarshipId}`, {
        method: "DELETE",
        // If your backend requires authentication for DELETE, add headers here:
        // headers: { 'Authorization': `Bearer ${userToken}` }
      });

      if (!response.ok) {
        throw new Error(`Deletion failed: ${response.statusText}`);
      }

      // Update the UI by filtering out the deleted scholarship
      setScholarships((prev) =>
        prev.filter((scholarship) => scholarship.id !== scholarshipId)
      );

      toast.success("🗑️ Scholarship deleted successfully!", {
        id: deleteToastId,
      });
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(`Failed to delete: ${error.message}`, { id: deleteToastId });
    }
  };

  // --- 3. Loading and Empty States ---

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-xl text-green-700">
        <TbFidgetSpinner className="animate-spin mr-2" /> Loading
        Scholarships...
      </div>
    );
  }

  if (scholarships.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-50 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-gray-700">
          No Scholarships Found
        </h2>
        <p className="text-gray-500 mt-2">
          It looks like no scholarships have been added yet.
        </p>
        <button
          onClick={() => navigate("/dashboard/add-scholarship")}
          className="mt-4 btn bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center mx-auto"
        >
          <FaPlus className="mr-2" /> Add New Scholarship
        </button>
      </div>
    );
  }

  // --- 4. Main Component Render ---
  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-4xl font-extrabold text-green-700">
          📜 Manage All Scholarships ({scholarships.length})
        </h1>
        <button
          onClick={() => navigate("/dashboard/add-scholarship")}
          className="btn bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center shadow-lg transition duration-150"
        >
          <FaPlus className="mr-2" /> Add New
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Scholarship Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                University / Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Tuition
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scholarships.map((scholarship, index) => (
              <tr key={scholarship.id || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {scholarship.scholarshipName}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {scholarship.degree}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {scholarship.universityName}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {scholarship.city}, {scholarship.country} (Rank:{" "}
                    {scholarship.worldRank || "N/A"})
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {scholarship.scholarshipCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                  {scholarship.tuitionFees}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(scholarship.id)}
                      className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition"
                      title="Edit Scholarship"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(scholarship.id)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete Scholarship"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
