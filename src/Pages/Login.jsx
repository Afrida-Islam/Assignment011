import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Link } from "react-router";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        setError(errorMessage);
      });
  };
  // const handleGoogleSignIn = () => {};
  return (
    <>
      <div className="min-h-screen bg-lime-100/50 flex items-center justify-center p-4 mt-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
            Login to SkillSet
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

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
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <Lock className="w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
          </div>

          <div className="text-right mb-4">
            <Link to="/resetpasswort">
              <span className="text-sm text-orange-400 hover:underline">
                Forgot Password?
              </span>
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition"
          >
            Login
          </button>

          {/* Divider */}
          <div className="my-4 flex items-center">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
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
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-green-700 hover:underline font-medium"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
