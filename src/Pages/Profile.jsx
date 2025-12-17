import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner"; // আপনার স্পিনার কম্পোনেন্টটি ইমপোর্ট করুন

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden md:w-4/5 lg:w-1/2 transform transition-all hover:scale-[1.01]">
        {/* Cover Section */}
        <div className="h-40 bg-gradient-to-r from-green-700 to-emerald-500 relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                alt="profile"
                src={user?.photoURL}
                className="mx-auto object-cover rounded-full h-32 w-32 border-4 border-white shadow-lg"
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
          </div>
        </div>

        {/* User Identity Section */}
        <div className="mt-16 text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {user?.displayName}
          </h2>

          {/* Role Badge - Dynamic Styling */}
          <div className="inline-block mt-2">
            <span
              className={`px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white ${
                role === "Admin"
                  ? "bg-red-500"
                  : role === "Moderator"
                  ? "bg-blue-500"
                  : "bg-green-600"
              }`}
            >
              {role || "Student"}
            </span>
          </div>

          <p className="text-gray-500 mt-1 text-sm italic">
            User ID: {user?.uid?.slice(0, 10)}...
          </p>
        </div>

        {/* Detailed Info Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Full Name
              </span>
              <span className="text-gray-700 font-medium">
                {user?.displayName}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Email Address
              </span>
              <span className="text-gray-700 font-medium">{user?.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Account Status
              </span>
              <span className="text-green-600 font-bold">Verified ✅</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase">
                Contact Support
              </span>
              <span className="text-gray-700 font-medium">Help Center</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex-1 bg-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-900 transition-colors duration-300">
              Update Profile
            </button>
            <button className="flex-1 bg-white border-2 border-green-800 text-green-800 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-300">
              Change Password
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-gray-50 py-4 px-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Welcome to University Scholarship Management Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
