import React, { useState } from "react";

import logo from "../../assets/logo.webp";
import { Link } from "react-router";
const Navber = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = {
    profileImg: "https://i.pravatar.cc/150?img=1",
    name: "User",
  };

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // --- Always Visible Links ---
  const alwaysVisibleLinks = [
    { name: "Home", path: "/" },
    { name: "All Scholarships", path: "/scholarships" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-25">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <img className="w-[90px] h-[90px]" src={logo}></img>
              <div className="text-green-800  text-xl leading-none font-bold ">
                <p>National</p>
                <p>Scholarship</p>
                <p>Trust</p>
              </div>
            </div>
          </div>

          <div className="flex items-center  space-x-4">
            <div className="hidden md:flex  ">
              {alwaysVisibleLinks.map((link) => (
                <div className="flex justify-center items-center ">
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-green-800  text-xl font-bold hover:text-green-700    transition duration-150 p-10 text-center "
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    to={`/dashboard`}
                    className="text-green-800 hover:text-green-700 text-xl font-bold"
                  >
                    Dashboard
                  </Link>

                  <div className="relative">
                    <button className="flex items-center focus:outline-none">
                      <img
                        className="h-8 w-8 rounded-full object-cover border-2 border-green-500"
                        src={user.profileImg}
                        alt={`${user.name} profile`}
                      />
                    </button>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to={`/login`}>
                    <button
                      onClick={handleLogin}
                      className="text-green-800 hover:text-green-700 text-xl  font-bold"
                    >
                      Login
                    </button>
                  </Link>
                  <Link
                    to="/register" // Link to the registration page
                    className="px-3 py-1 text-xl  font-bold bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
