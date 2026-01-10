import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
// HiOutlineLock এর বদলে HiOutlineLockClosed ব্যবহার করা হয়েছে
import { HiOutlineUser, HiOutlineMail, HiCloudUpload } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { imageUpload, saveOrUpdateUser } from "../utils";
import Container from "../Components/Navber/Container";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const result = await createUser(email, password);
      let user = await result.user;
      const imageURL = await imageUpload(imageFile);
      await updateUserProfile(name, imageURL);

      await saveOrUpdateUser(
        { name, email, image: imageURL },
        user.accessToken
      );

      reset();
      navigate(from, { replace: true });
      toast.success("Welcome! Registration Successful");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });
      navigate(from, { replace: true });
      toast.success("Signup Successful with Google");
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed.");
    }
  };

  const fillDemoData = () => {
    setValue("name", "John Doe");
    setValue("email", "student@demo.com");
    setValue("password", "123456");
    toast.success("Demo details filled! Now upload an image.");
  };

  return (
    <div className="bg-white min-h-screen py-10 md:py-20 flex items-center">
      <Container>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          {/* Left Branding Side */}
          <div className="lg:w-1/2 bg-green-900 p-12 text-white flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              Join National Scholarship Trust
            </h2>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              Unlock your future. Access thousands of scholarship opportunities
              with one account.
            </p>
            <div className="hidden lg:block">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/student-registration-illustration-download-in-svg-png-gif-file-formats--form-school-university-pack-people-illustrations-5240416.png"
                alt="Registration Illustration"
                className="w-80 opacity-90"
              />
            </div>
          </div>

          {/* Right Form Side */}
          <div className="lg:w-1/2 p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Join our community of scholars
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div className="relative">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <HiOutlineUser />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
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
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Profile Image */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-700 ml-1">
                  Profile Photo
                </label>
                <label className="flex items-center gap-4 p-4 bg-green-50 border-2 border-dashed border-green-200 rounded-xl cursor-pointer hover:bg-green-100 transition">
                  <HiCloudUpload className="text-2xl text-green-700" />
                  <span className="text-sm text-green-800 font-semibold">
                    Upload Photo
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    {...register("image", { required: "Photo is required" })}
                  />
                </label>
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Password */}
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
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-800 text-white py-3.5 rounded-xl font-bold hover:bg-green-900 transition-all shadow-lg disabled:bg-gray-400"
                >
                  {loading ? (
                    <TbFidgetSpinner className="animate-spin m-auto" />
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <button
                  type="button"
                  onClick={fillDemoData}
                  className="w-full bg-orange-100 text-orange-700 py-3 rounded-xl font-bold border border-orange-200 hover:bg-orange-200 transition"
                >
                  Demo Autofill
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="flex items-center gap-4 mb-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span>Or connect with</span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center gap-3 border-2 border-gray-100 py-3 rounded-xl hover:bg-gray-50 transition font-bold text-gray-700"
              >
                <FcGoogle size={24} /> Google
              </button>

              <p className="mt-8 text-center text-gray-500 font-medium">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="text-green-700 font-bold hover:underline"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
