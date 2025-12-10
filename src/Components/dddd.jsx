// import React, { useState } from 'react';

// // --- Sidebar Navigation Data ---
// const ADMIN_NAV = [
//   { name: 'My Profile', href: '#profile', icon: '👤' },
//   { name: 'Add Scholarship', href: '#add-scholarship', icon: '📝' },
//   { name: 'Manage Scholarships', href: '#manage-scholarships', icon: '🎓' },
//   { name: 'Manage Users', href: '#manage-users', icon: '👥' },
//   { name: 'Analytics', href: '#analytics', icon: '📊' },
// ];

// const MODERATOR_NAV = [
//   { name: 'My Profile', href: '#profile', icon: '👤' },
//   { name: 'Manage Applications', href: '#manage-applications', icon: '📥' },
//   { name: 'All Reviews', href: '#all-reviews', icon: '⭐' },
// ];

// const STUDENT_NAV = [
//   { name: 'My Profile', href: '#profile', icon: '👤' },
//   { name: 'My Applications', href: '#my-applications', icon: '💼' },
//   { name: 'My Reviews', href: '#my-reviews', icon: '💬' },
// ];

// /**
//  * Renders the navigation links based on the user's role.
//  * @param {Array} navItems - The array of navigation objects.
//  * @param {string} currentActive - The currently active link (for styling).
//  */
// const SidebarNav = ({ navItems, currentActive }) => (
//   <nav className="flex-1 space-y-2 px-2 py-4">
//     {navItems.map((item) => (
//       <a
//         key={item.name}
//         href={item.href}
//         className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
//           currentActive === item.href
//             ? 'bg-indigo-700 text-white shadow-lg'
//             : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
//         }`}
//       >
//         <span className="mr-3">{item.icon}</span>
//         {item.name}
//       </a>
//     ))}
//   </nav>
// );

// const DashboardLayout = ({ children }) => {
//   // 💡 State for demonstration: Change this value to test different roles.
//   const [userRole, setUserRole] = useState('Admin'); // Try 'Moderator' or 'Student'
//   const [activeLink, setActiveLink] = useState('#profile');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Control sidebar toggle

//   // 1. Determine which navigation links to show based on the role
//   let navigation = [];
//   if (userRole === 'Admin') {
//     navigation = ADMIN_NAV;
//   } else if (userRole === 'Moderator') {
//     navigation = MODERATOR_NAV;
//   } else if (userRole === 'Student') {
//     navigation = STUDENT_NAV;
//   }

//   // Helper function to change role (for demonstration only)
//   const switchRole = (role) => {
//     setUserRole(role);
//     setActiveLink('#profile'); // Reset active link on role switch
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">

//       <div
//         className={`fixed inset-y-0 left-0 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-300 ease-in-out w-64 bg-green-800 dark:bg-green-900 text-white shadow-xl flex flex-col`}
//       >
//         <div className="flex items-center justify-center h-20 shadow-md">
//           <h2 className="text-2xl font-bold tracking-wider uppercase">
//             {userRole} Portal
//           </h2>
//         </div>

//         <SidebarNav navItems={navigation} currentActive={activeLink} />

//         <div className="p-4 border-t border-indigo-700">
//           <p className="text-xs text-indigo-300 mb-2">Switch Role (Demo):</p>
//           <div className="flex space-x-2">
//             {['Admin', 'Moderator', 'Student'].map(role => (
//               <button
//                 key={role}
//                 onClick={() => switchRole(role)}
//                 className={`text-xs px-2 py-1 rounded ${userRole === role ? 'bg-indigo-600 text-white' : 'bg-indigo-500 hover:bg-indigo-400 text-white'}`}
//               >
//                 {role}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col overflow-hidden">

//         <header className="flex items-center justify-between h-20 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 sm:px-6 lg:px-8">
//           <button
//             className="text-gray-500 lg:hidden focus:outline-none"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             aria-label="Toggle sidebar"
//           >
//             {/* Hamburger/Close Icon */}
//             {isSidebarOpen ? '✕' : '☰'}
//           </button>

//           <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
//             Dashboard Overview
//           </h1>

//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600 dark:text-gray-400 text-sm">Welcome, {userRole}!</span>
//             <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
//               Logout
//             </button>
//           </div>
//         </header>

//         {/* Main Page Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
//           <div className="container mx-auto">
//             {/* This is where the content for the specific pages will be rendered.
//               (e.g., Manage Users table, Add Scholarship form, My Applications table)
//             */}
//             {children || (
//               <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
//                 <h3 className="text-xl font-medium text-gray-900 dark:text-white">
//                   Current View: {navigation.find(i => i.href === activeLink)?.name || 'Profile'}
//                 </h3>
//                 <p className="mt-2 text-gray-600 dark:text-gray-400">
//                   Load the respective content component here based on the active link.
//                 </p>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
