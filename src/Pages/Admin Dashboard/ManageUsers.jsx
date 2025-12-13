import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash, FaUserEdit, FaFilter } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";

// --- Placeholder for API Base URL ---
// NOTE: Adjust this URL to your actual backend user management endpoint
const USER_API_URL = "http://localhost:3000/users";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("All"); // State for the filter dropdown

  // Available roles for filtering and updating
  const roles = ["All", "Student", "Moderator", "Admin"];

  // --- 1. Fetch Data Function ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(USER_API_URL); // Fetch all users initially
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      const data = await response.json();
      // NOTE: Assuming the fetched user data has an 'id', 'email', 'name', and 'role' field
      setUsers(data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(`Error loading user data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- 2. Action Handlers ---

  const handleChangeRole = async (userId, newRole) => {
    if (
      !window.confirm(
        `Are you sure you want to change this user's role to ${newRole}?`
      )
    ) {
      return;
    }

    const updateToastId = toast.loading(`Updating role to ${newRole}...`);

    try {
      // NOTE: Ensure your backend supports PATCH or PUT for role updates
      const response = await fetch(`${USER_API_URL}/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Add auth headers if required
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error(`Role update failed: ${response.statusText}`);
      }

      // Optimistically update the UI or re-fetch data for accuracy
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      toast.success(`Role updated to ${newRole} successfully!`, {
        id: updateToastId,
      });
    } catch (error) {
      console.error("Role Update Error:", error);
      toast.error(`Failed to update role: ${error.message}`, {
        id: updateToastId,
      });
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (
      !window.confirm(`Are you sure you want to delete the user: ${userName}?`)
    ) {
      return;
    }

    const deleteToastId = toast.loading("Deleting user...");

    try {
      const response = await fetch(`${USER_API_URL}/${userId}`, {
        method: "DELETE",
        // Add auth headers if required
      });

      if (!response.ok) {
        throw new Error(`Deletion failed: ${response.statusText}`);
      }

      // Update the UI by filtering out the deleted user
      setUsers((prev) => prev.filter((user) => user.id !== userId));

      toast.success(`🗑️ User ${userName} deleted successfully!`, {
        id: deleteToastId,
      });
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(`Failed to delete user: ${error.message}`, {
        id: deleteToastId,
      });
    }
  };

  // --- 3. Filtering Logic ---
  const filteredUsers = users.filter(
    (user) => filterRole === "All" || user.role === filterRole
  );

  // --- 4. Loading and Empty States ---

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-xl text-indigo-700">
        <TbFidgetSpinner className="animate-spin mr-2" /> Loading Users...
      </div>
    );
  }

  // --- 5. Main Component Render ---
  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-3">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 md:mb-0">
          👥 Manage Platform Users ({filteredUsers.length} / {users.length})
        </h1>

        {/* Role Filter Dropdown */}
        <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm border">
          <FaFilter className="text-gray-500" />
          <label
            htmlFor="role-filter"
            className="text-sm font-medium text-gray-700 sr-only"
          >
            Filter by Role
          </label>
          <select
            id="role-filter"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="select border-none focus:ring-0 focus:outline-none pr-8 bg-transparent text-sm font-semibold text-indigo-600"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        {filteredUsers.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            No users found matching the '{filterRole}' filter.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Change Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "Admin"
                          ? "bg-red-100 text-red-800"
                          : user.role === "Moderator"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Role Change Dropdown */}
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleChangeRole(user.id, e.target.value)
                      }
                      className="p-2 border border-gray-300 rounded-md text-sm bg-white focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {roles
                        .filter((r) => r !== "All")
                        .map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() =>
                        handleDeleteUser(user.id, user.name || user.email)
                      }
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete User"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
