import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // localStorage থেকে টোকেন চেক করা
  const token = localStorage.getItem("access-token");
console.log("My Token:", token);
  // ১. ব্যাকএন্ড থেকে স্ট্যাটিস্টিকস ডাটা ফেচ করা
  const { data: stats = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    enabled: !!token, // টোকেন না থাকলে রিকোয়েস্ট যাবে না
    queryFn: async () => {
      const res = await axiosSecure.get("https://serverside11.vercel.app/admin-stats");
      return res.data;
    },
  });

  // ২. টেবিলের জন্য রিসেন্ট অ্যাপ্লিকেশন ডাটা ফেচ করা
  const { data: applications = [], isLoading: isAppLoading } = useQuery({
    queryKey: ["all-applications"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axiosSecure.get("https://serverside11.vercel.app/all-applications");
      return res.data;
    },
    
  });
console.log("Current Stats Data:", stats);
  // ৩. ডাটা লোড হওয়া বা টোকেন না থাকা অবস্থায় হ্যান্ডেলিং
  if (isStatsLoading || isAppLoading) return <LoadingSpinner />;

  // if (!token) {
  //   return (
  //     <div className="p-10 text-center text-red-500 font-bold">
  //       Please login to view dashboard.
  //     </div>
  //   );
  // }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Overview Dashboard
      </h1>

      {/* --- Overview Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
          <p className="text-sm text-gray-500 font-bold uppercase">
            Total Scholarships
          </p>
          <p className="text-2xl font-black text-gray-800">
            {stats?.scholarships || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
          <p className="text-sm text-gray-500 font-bold uppercase">
            Total Applications
          </p>
          <p className="text-2xl font-black text-gray-800">
            {stats?.totalApplications || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-500 font-bold uppercase">
            Total Users
          </p>
          <p className="text-2xl font-black text-gray-800">
            {stats?.users || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-600">
          <p className="text-sm text-gray-500 font-bold uppercase">
            Total Revenue
          </p>
          <p className="text-2xl font-black text-gray-800">
            ${stats?.totalFees || 0}
          </p>
        </div>
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* লাইন ৯৭ এরর ফিক্স: কন্টেইনারে পজিশন রিলেটিভ এবং ডেবাউন্স যোগ করা হয়েছে */}
        <div
          className="bg-white p-6 rounded-xl shadow-md"
          style={{ height: "400px", position: "relative" }}
        >
          <h3 className="font-bold mb-4 text-gray-700">
            Applications by Category
          </h3>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <BarChart data={stats.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#166534" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* লাইন ১১৩ এরর ফিক্স */}
        <div
          className="bg-white p-6 rounded-xl shadow-md"
          style={{ height: "400px", position: "relative" }}
        >
          <h3 className="font-bold mb-4 text-gray-700">System Overview</h3>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%" debounce={50}>
              <LineChart data={stats.chartData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1d4ed8"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-gray-800">Recent Applications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-sm font-bold text-gray-600">
                  Applicant Email
                </th>
                <th className="p-4 text-sm font-bold text-gray-600">
                  Scholarship
                </th>
                <th className="p-4 text-sm font-bold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.slice(0, 5).map((app) => (
                  <tr key={app._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-sm">{app.studentEmail}</td>
                    <td className="p-4 text-sm font-medium">
                      {app.scholarshipName}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No recent applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
