import React, { useRef } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import useAuth from "../hooks/useAuth";
import { saveOrUpdateUser } from "../utils";
import LoadingSpinner from "../Components/LoadingSpinner";
import Container from "../Components/Navber/Container";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef();

  // Redirect location logic
  const from = location.state?.from || "/";

  // Loading and User state check
  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true); // লোডিং শুরু
      const result = await signIn(email, password);

      // Database এ ইউজার সেভ বা আপডেট করা
      await saveOrUpdateUser(
        {
          name: result?.user?.displayName,
          email: result?.user?.email,
          image: result?.user?.photoURL,
        },
        result?.user?.accessToken
      );

      toast.success("Welcome Back!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login Error:", err.code);

      // Firebase Specific Error Handling
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found"
      ) {
        toast.error("Account not found! Please Sign Up first with this email.");
      } else if (err.code === "auth/wrong-password") {
        toast.error("Wrong password! Please try again.");
      } else {
        toast.error(err?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // এরর হলেও লোডিং বন্ধ হবে
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        role: "student", // Google লগইনে ডিফল্ট রোল
      });
      toast.success("Google Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    const credentials = {
      admin: { email: "admin@nst.com", pass: "123456" },
      moderator: { email: "moderator@nst.com", pass: "123456" },
      student: { email: "student@nst.com", pass: "123456" },
    };

    const { email, pass } = credentials[role];
    if (formRef.current) {
      formRef.current.email.value = email;
      formRef.current.password.value = pass;
      toast.success(
        `${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled!`
      );
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 md:py-20 flex items-center">
      <Container>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          {/* Left Visual Side */}
          <div className="lg:w-1/2 bg-green-900 p-12 text-white flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-extrabold mb-6">Welcome Back!</h2>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              Login to access your National Scholarship Trust dashboard.
            </p>
            <div className="hidden lg:block">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--secure-access-internet-user-sign-in-pack-network-communication-illustrations-5345719.png"
                alt="Login Illustration"
                className="w-80 opacity-90"
              />
            </div>
          </div>

          {/* Right Form Side */}
          <div className="lg:w-1/2 p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800">
                Account Login
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Please enter your credentials
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <HiOutlineMail />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@nst.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Password
                </label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <HiOutlineLockClosed />
                  </span>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-800 text-white py-3.5 rounded-xl font-bold hover:bg-green-900 transition-all shadow-lg disabled:bg-gray-400 mt-4"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            {/* Quick Demo Buttons */}
            <div className="mt-8">
              <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => fillDemoCredentials("admin")}
                  className="py-2 px-1 text-[10px] bg-red-50 text-red-600 border border-red-100 rounded-lg font-bold hover:bg-red-100 transition"
                >
                  Admin
                </button>
                <button
                  onClick={() => fillDemoCredentials("moderator")}
                  className="py-2 px-1 text-[10px] bg-blue-50 text-blue-600 border border-blue-100 rounded-lg font-bold hover:bg-blue-100 transition"
                >
                  Moderator
                </button>
                <button
                  onClick={() => fillDemoCredentials("student")}
                  className="py-2 px-1 text-[10px] bg-green-50 text-green-600 border border-green-100 rounded-lg font-bold hover:bg-green-100 transition"
                >
                  Student
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center gap-3 border-2 border-gray-100 py-3 rounded-xl hover:bg-gray-50 transition font-bold text-gray-700 shadow-sm"
              >
                <FcGoogle size={24} /> Google
              </button>
              <p className="mt-8 text-center text-gray-500 font-medium">
                New to the Trust?{" "}
                <Link
                  to="/signup"
                  className="text-green-700 font-bold hover:underline"
                >
                  Sign Up Free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
