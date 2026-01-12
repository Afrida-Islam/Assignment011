import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

// Instance বাইরেই থাকবে, তবে ইন্টারসেপ্টর থাকবে হুকের ভেতরে
const axiosSecure = axios.create({
  baseURL: "https://serverside11.vercel.app",
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // ১. রিকোয়েস্ট ইন্টারসেপ্টর
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ২. রেসপন্স ইন্টারসেপ্টর
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // ক্লিনআপ ফাংশন: এটি খুবই গুরুত্বপূর্ণ যাতে ইন্টারসেপ্টর ডুপ্লিকেট না হয়
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;