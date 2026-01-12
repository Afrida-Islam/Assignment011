import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineWbSunny, MdOutlineNightlight } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import Container from "./Container";
import avatarImg from "../../assets/download.jpeg";
import logo from "../../assets/logo.webp";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e) => {
    e.stopPropagation(); 
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const navLinkStyles = ({ isActive }) =>
    `transition-all duration-300 font-bold text-lg lg:text-xl px-2 py-1 ${
      isActive
        ? "text-green-700 dark:text-green-400 border-b-4 border-green-600"
        : "text-gray-700 dark:text-gray-300 hover:text-green-600"
    }`;

  return (
    <>
      {/* অরিজিনাল স্পেসার */}
      <div className="h-24 md:h-28"></div>

      <nav className="fixed top-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-50 shadow-md border-b-[1px] dark:border-slate-800 transition-colors duration-300">
        <div className="py-3 md:py-4">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3">
              
              {/* ১. লোগো সেকশন (আপনার অরিজিনাল স্টাইল ফিরিয়ে আনা হয়েছে) */}
              <Link to="/" className="flex flex-shrink-0 items-center space-x-2">
                <img className="w-12 h-12 md:w-16 md:h-16 object-contain" src={logo} alt="logo" />
                <div className="text-green-800 dark:text-green-500 text-base md:text-xl leading-tight font-extrabold">
                  <p>National</p>
                  <p>Scholarship</p>
                  <p>Trust</p>
                </div>
              </Link>

              {/* ২. ডেস্কটপ নেভিগেশন (Large ডিভাইসের জন্য) */}
              <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
                <NavLink to="/" className={navLinkStyles}>Home</NavLink>
                <NavLink to="/scholarships" className={navLinkStyles}>All Scholarships</NavLink>
                <NavLink to="/about" className={navLinkStyles}>About Us</NavLink>
                <NavLink to="/contact" className={navLinkStyles}>Contact</NavLink>
              </div>

              {/* ৩. প্রোফাইল ও ড্রপডাউন (যেখানে ডার্ক মোড থাকবে) */}
              <div className="relative">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 md:py-2 md:px-4 border-[2px] border-neutral-200 dark:border-slate-700 flex flex-row items-center gap-2 md:gap-3 rounded-full cursor-pointer hover:shadow-lg transition dark:bg-slate-800"
                >
                  <AiOutlineMenu className="text-xl md:text-2xl text-gray-700 dark:text-gray-300" />
                  <img
                    className="rounded-full h-8 w-8 md:h-10 md:w-10 object-cover border border-green-500"
                    src={user?.photoURL ? user.photoURL : avatarImg}
                    alt="profile"
                  />
                </div>

                {isOpen && (
                  <div className="absolute rounded-xl shadow-2xl w-[70vw] md:w-[25vw] bg-white dark:bg-slate-800 overflow-hidden right-0 top-14 md:top-16 text-base border-[1px] border-neutral-100 dark:border-slate-700 py-3 animate-in fade-in zoom-in duration-200">
                    <div className="flex flex-col cursor-pointer">
                      
                      {/* --- ড্রপডাউনের ভেতরে ডার্ক মোড টগল --- */}
                      <div 
                        onClick={toggleTheme}
                        className="flex items-center justify-between px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 transition"
                      >
                        <span className="font-bold dark:text-gray-200">
                          {theme === "light" ? "Dark Mode" : "Light Mode"}
                        </span>
                        <div className="text-2xl text-gray-700 dark:text-yellow-400">
                          {theme === "light" ? <MdOutlineNightlight /> : <MdOutlineWbSunny />}
                        </div>
                      </div>
                      <hr className="dark:border-slate-700" />

                      {/* মোবাইল মেনু লিংক (lg স্ক্রিনের নিচে দেখা যাবে) */}
                      <div className="lg:hidden flex flex-col">
                        <Link to="/" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 text-lg font-bold dark:text-white">Home</Link>
                        <Link to="/scholarships" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 text-lg font-bold dark:text-white">All Scholarships</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 text-lg font-bold dark:text-white">About Us</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 text-lg font-bold dark:text-white">Contact</Link>
                        <hr className="dark:border-slate-700" />
                      </div>

                      {user ? (
                        <>
                          <div className="px-6 py-2 border-b dark:border-slate-700 text-lg font-extrabold text-green-800 dark:text-green-400 truncate bg-green-50 dark:bg-slate-900/50">
                            {user?.displayName || "User"}
                          </div>
                          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 transition text-lg font-semibold dark:text-gray-200">Dashboard</Link>
                          <Link to="/dashboard/profile" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 transition text-lg font-semibold dark:text-gray-200">My Profile</Link>
                          <hr className="my-2 dark:border-slate-700" />
                          <button onClick={() => { logOut(); setIsOpen(false); }} className="px-6 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 text-left transition text-lg font-bold">Logout</button>
                        </>
                      ) : (
                        <>
                          <Link to="/login" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 transition text-lg font-bold dark:text-white">Login</Link>
                          <Link to="/signup" onClick={() => setIsOpen(false)} className="px-6 py-3 hover:bg-neutral-100 dark:hover:bg-slate-700 transition text-lg font-bold dark:text-white">Sign Up</Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </nav>
    </>
  );
};

export default Navbar;