import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Sidebar"; // আপনার সাইডবারের সঠিক পাথ দিন
import DashboardHome from "../Pages/DashboardHome";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* বাম পাশে সাইডবার */}
      <Sidebar />

      {/* ডান পাশে মূল কন্টেন্ট এরিয়া */}
      <div className="flex-1 md:ml-64 bg-gray-50 min-h-screen">
        <div className="p-5">
          <DashboardHome />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
