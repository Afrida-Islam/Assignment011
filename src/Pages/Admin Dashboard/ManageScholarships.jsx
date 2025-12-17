import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["all-scholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "http://localhost:3000/scholarship"
      );
      return data;
    },
  });

  // ২. স্কলারশিপ ডিলিট করার ফাংশন
  const { mutateAsync: deleteScholarship } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(
        `http://localhost:3000/scholarship/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-scholarships"]);
      toast.success("Scholarship deleted successfully!");
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteScholarship(id);
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        <div className="p-6 border-b bg-green-700 text-white">
          <h2 className="text-2xl font-bold">Manage Scholarships</h2>
          <p className="text-sm opacity-80">
            Total Scholarships: {scholarships.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Scholarship Name</th>
                <th className="p-4">University</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Degree</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {scholarships.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 font-medium">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-semibold text-gray-800">
                        {item.scholarshipName}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{item.universityName}</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                      {item.subjectCategory}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{item.degree}</td>
                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        title="Update"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaTrashAlt size={18} />
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
  );
};

export default ManageScholarships;
