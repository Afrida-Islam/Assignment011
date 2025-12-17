import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { FaUsers, FaDollarSign, FaGraduationCap } from "react-icons/fa";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        "http://localhost:3000/admin-stats"
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
        Platform Overview
      </h2>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          icon={<FaUsers size={30} />}
          title="Total Users"
          value={stats.users}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaGraduationCap size={30} />}
          title="Total Scholarships"
          value={stats.scholarships}
          color="bg-green-600"
        />
        <StatCard
          icon={<FaDollarSign size={30} />}
          title="Fees Collected"
          value={`$${stats.totalFees || 0}`}
          color="bg-amber-500"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-700 mb-6 italic">
          Scholarships by Category
        </h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip cursor={{ fill: "#f3f4f6" }} />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]}>
                {stats.chartData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 transform hover:scale-105 transition-all">
    <div className={`p-4 rounded-2xl text-white ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <h4 className="text-3xl font-black text-gray-800">{value}</h4>
    </div>
  </div>
);

export default Analytics;
