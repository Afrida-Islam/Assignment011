import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.webp";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ModeratorMenu from "./Menu/ModeratorMenu";
import StudentMenu from "./Menu/StudentMenu";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();

  const handleToggle = () => setActive(!isActive);

  if (isRoleLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-green-800 text-white flex justify-between md:hidden p-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-10" />
        </Link>
        <button onClick={handleToggle} className="p-2 focus:outline-none">
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar Container */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between bg-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform shadow-xl transition duration-300 ease-in-out 
        ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 border-r border-gray-200`}
      >
        <div>
          {/* Logo Section */}
          <div className="hidden md:flex p-4 shadow-sm rounded-lg justify-center items-center bg-green-50 mx-2">
            <Link to="/">
              <img src={logo} alt="logo" className="w-24" />
            </Link>
          </div>

          <nav className="mt-6">
            {/* Common Menu: Statistics */}
            <MenuItem
              icon={BsGraphUp}
              label="Dashboard Home"
              address="/dashboard"
            />

            {/* Role Based Menus */}
            {role === "Admin" && <AdminMenu />}
            {role === "Moderator" && <ModeratorMenu />}
            {role === "Student" && <StudentMenu />}
          </nav>
        </div>

        {/* Bottom Section */}
        <div>
          <hr className="my-4 border-gray-300" />
          <MenuItem
            icon={FcSettings}
            label="My Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-2 text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-300 rounded-lg"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
