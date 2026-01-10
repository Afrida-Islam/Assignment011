import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import Container from "./Container";
import avatarImg from "../../assets/download.jpeg";
import logo from "../../assets/logo.webp";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    `transition-all duration-300 font-bold text-lg lg:text-xl px-2 py-1 ${
      isActive
        ? "text-green-700 border-b-4 border-green-600"
        : "text-gray-700 hover:text-green-600"
    }`;

  return (
    <>
      {/* নিচের এই div টি ব্যবহারের ফলে মূল কন্টেন্ট আর নেভিবারের নিচে ঢুকে যাবে না। 
        h-24 (মোবাইলের জন্য) এবং md:h-28 (ডেস্কটপের জন্য) নেভিবারের সমান জায়গা দখল করে রাখবে।
      */}
      <div className="h-24 md:h-28"></div>

      <div className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-md border-b-[1px]">
        <div className="py-3 md:py-4">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3">
              {/* Logo Section - এখন মোবাইলেও নাম দেখা যাবে */}
              <Link
                to="/"
                className="flex flex-shrink-0 items-center space-x-2"
              >
                <img
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  src={logo}
                  alt="logo"
                />
                <div className="text-green-800 text-base md:text-xl leading-tight font-extrabold">
                  <p>National</p>
                  <p>Scholarship</p>
                  <p>Trust</p>
                </div>
              </Link>

              {/* Desktop Navigation - বড় স্ক্রিনে ৪টি রুট */}
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
                <NavLink to="/" className={navLinkStyles}>
                  Home
                </NavLink>
                <NavLink to="/scholarships" className={navLinkStyles}>
                  All Scholarships
                </NavLink>
                <NavLink to="/about" className={navLinkStyles}>
                  About Us
                </NavLink>
                <NavLink to="/contact" className={navLinkStyles}>
                  Contact
                </NavLink>
              </div>

              {/* Profile / Mobile Dropdown Section */}
              <div className="relative">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 md:py-2 md:px-4 border-[2px] border-neutral-200 flex flex-row items-center gap-2 md:gap-3 rounded-full cursor-pointer hover:shadow-lg transition"
                >
                  <AiOutlineMenu className="text-xl md:text-2xl text-gray-700" />
                  <div className="block">
                    <img
                      className="rounded-full h-8 w-8 md:h-10 md:w-10 object-cover border border-green-500"
                      src={user?.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                    />
                  </div>
                </div>

                {isOpen && (
                  <div className="absolute rounded-xl shadow-2xl w-[65vw] md:w-[25vw] bg-white overflow-hidden right-0 top-14 md:top-16 text-base border-[1px] border-neutral-100 py-3">
                    <div className="flex flex-col cursor-pointer">
                      {/* মোবাইল ও ছোট ট্যাবলেটে মেনু আইটেমগুলো এখানে দেখা যাবে */}
                      <div className="lg:hidden flex flex-col">
                        <Link
                          to="/"
                          className="px-6 py-3 hover:bg-neutral-100 text-lg font-bold"
                        >
                          Home
                        </Link>
                        <Link
                          to="/scholarships"
                          className="px-6 py-3 hover:bg-neutral-100 text-lg font-bold"
                        >
                          All Scholarships
                        </Link>
                        <Link
                          to="/about"
                          className="px-6 py-3 hover:bg-neutral-100 text-lg font-bold"
                        >
                          About Us
                        </Link>
                        <Link
                          to="/contact"
                          className="px-6 py-3 hover:bg-neutral-100 text-lg font-bold"
                        >
                          Contact
                        </Link>
                        <hr className="my-2" />
                      </div>

                      {user ? (
                        <>
                          <div className="px-6 py-2 border-b text-lg font-extrabold text-green-800 truncate bg-green-50">
                            {user?.displayName || "User"}
                          </div>
                          <Link
                            to="/dashboard"
                            className="px-6 py-3 hover:bg-neutral-100 transition text-lg font-semibold"
                          >
                            Dashboard
                          </Link>
                          <Link
                            to="/dashboard/my-applications"
                            className="px-6 py-3 hover:bg-neutral-100 transition text-lg font-semibold"
                          >
                            My Applications
                          </Link>
                          <Link
                            to="/dashboard/profile"
                            className="px-6 py-3 hover:bg-neutral-100 transition text-lg font-semibold"
                          >
                            My Profile
                          </Link>
                          <hr className="my-2" />
                          <button
                            onClick={logOut}
                            className="px-6 py-3 hover:bg-red-50 text-red-600 text-left transition text-lg font-bold"
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="px-6 py-3 hover:bg-neutral-100 transition text-lg font-bold"
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="px-6 py-3 hover:bg-neutral-100 transition text-lg font-bold"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Navbar;
