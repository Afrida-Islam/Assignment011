import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("All");

  // ডাটা ফেচ করা
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `http://localhost:3000/users?role=${filter}`
      );
      return data;
    },
  });

  // রোল চেঞ্জ মিউটেশন
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
      toast.success("User role updated!");
    },
  });

  // ইউজার ডিলিট মিউটেশন
  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(
        `http://localhost:3000/users/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User deleted successfully!");
    },
  });

  const handleRoleChange = async (id, newRole) => {
    await updateRole({ id, role: newRole });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) await deleteUser(id);
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800">Manage Users</h2>
        {/* ফিল্টার ড্রপডাউন */}
        <select
          className="select select-bordered w-full max-w-xs border-green-500 focus:ring-green-500"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-ghost font-semibold">
                    {user.role}
                  </span>
                </td>
                <td>
                  <select
                    defaultValue={user.role}
                    className="select select-sm select-ghost border-gray-300"
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="Student">Student</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-ghost text-red-600"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
