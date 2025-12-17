import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import {
  FaTrashAlt,
  FaUsers,
  FaUserShield,
  FaUserGraduate,
  FaUserTag,
} from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("All");

  const { data: usersData, isLoading } = useQuery({
    queryKey: ["users", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `http://localhost:3000/users?role=${filter}`
      );
      return data;
    },
  });

  const users = Array.isArray(usersData) ? usersData : usersData?.users || [];

  const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      const { data } = await axiosSecure.patch(
        `http://localhost:3000/users/role/${id}`,
        { role }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Role Updated Successfully! ✨");
    },
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(
        `http://localhost:3000/users/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User removed successfully.");
    },
  });

  const handleRoleChange = async (id, newRole) => {
    await updateRole({ id, role: newRole });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then(async (result) => {
      if (result.isConfirmed) await deleteUser(id);
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-10 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header Card */}
        <div className="bg-green-100 p-8 rounded-3xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-green-300 rounded-2xl text-green-700">
              <FaUsers size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-gray-800">
                Manage Community
              </h2>
              <p className="text-gray-500 font-medium">
                Monitoring {users.length} registered members
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-200 w-full md:w-auto">
            <label className="text-sm font-bold text-gray-400 px-2 uppercase tracking-wider">
              Filter By
            </label>
            <select
              className="bg-white border-none focus:ring-2 focus:ring-green-500 rounded-xl px-6 py-2.5 font-bold text-gray-700 shadow-sm outline-none cursor-pointer"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="All">All Roles</option>
              <option value="Student">Student</option>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-green-100 rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-0">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-8 py-5 text-xl font-black text-gray-800 uppercase tracking-[0.1em]">
                    User Profile
                  </th>
                  <th className="px-8 py-5 text-xl font-black text-gray-800 uppercase tracking-[0.1em]">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xl font-black text-gray-800 uppercase tracking-[0.1em]">
                    Manage Role
                  </th>
                  <th className="px-8 py-5 text-xl font-black text-gray-800 uppercase tracking-[0.1em] text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-green-50/40 transition-all duration-300 group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-100 to-green-400 flex items-center justify-center text-green-700 font-bold text-xl border-2 border-white shadow-sm overflow-hidden">
                          {user.image ? (
                            <img
                              src={user.image}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            user.name?.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 group-hover:text-green-800 transition-colors">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500 font-medium">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider ${
                          user.role === "Admin"
                            ? "bg-red-50 text-red-600 border border-red-100"
                            : user.role === "Moderator"
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "bg-green-50 text-green-600 border border-green-100"
                        }`}
                      >
                        {user.role === "Admin" ? (
                          <FaUserShield />
                        ) : user.role === "Moderator" ? (
                          <FaUserTag />
                        ) : (
                          <FaUserGraduate />
                        )}
                        {user.role}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <select
                        defaultValue={user.role}
                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all cursor-pointer"
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                      >
                        <option value="Student">Student</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-sm"
                        title="Delete User"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-40">
              <FaUsers size={80} className="text-gray-200 mb-4" />
              <p className="text-xl font-bold text-gray-400">
                No members found in this category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
