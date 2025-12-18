import { Outlet } from "react-router";
import Sidebar from "../Pages/Sidebar";
import Navber from "../Components/Navber/Navber";
const DashboardLayout = () => {
  return (
    <div>
      <Navber />
      <div className="relative min-h-screen md:flex bg-white">
        <Sidebar />
        <div className="flex-1  md:ml-64">
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
