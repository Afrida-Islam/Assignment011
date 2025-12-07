import React, { useState } from "react";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";

import { useNavigate } from "react-router";
import { Link } from "react-router";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config"; // ✅ import actual Firebase auth

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validations = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
  };
  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!isPasswordValid) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google sign-up successful:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign-up failed:", error);
        setError(error.message);
      });
  };

  return (
    <>
      <div className="min-h-screen bg-lime-100/50 flex items-center justify-center p-4">
        <form
          onSubmit={handleRegister}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
            Create Your SkillSet Account
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <User className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full p-2 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <User className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full p-2 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-2 outline-none text-gray-700"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="w-full p-2 outline-none text-gray-700"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {!isPasswordValid && password.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2 text-sm text-red-700">
                <p className="font-semibold mb-1">Password Requirements:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {!validations.length && <li>At least 6 characters</li>}
                  {!validations.upper && <li>One uppercase letter</li>}
                  {!validations.lower && <li>One lowercase letter</li>}
                </ul>
              </div>
            )}
          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={!isPasswordValid}
            className={`w-full py-2 rounded-lg font-medium transition ${
              isPasswordValid
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Register
          </button>

          {/* Divider */}
          <div className="my-4 text-center text-gray-500 text-sm">OR</div>

          {/* Google Sign-up */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-700 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
