import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom"; // <-- 'react-router' থেকে নয়, 'react-router-dom' থেকে ইমপোর্ট করুন
import AuthProvider from "./Context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// QueryClient তৈরি করা
const queryClient = new QueryClient({
  // কিছু ডিফল্ট অপশন যোগ করা যেতে পারে
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// রুট এলিমেন্ট নির্বাচন করা
const container = document.getElementById("root");

// container যদি না থাকে, তবে একটি সুস্পষ্ট ত্রুটি দেখাবে
if (!container) {
  throw new Error("Failed to find the root element.");
}

// রুট তৈরি করা
const root = createRoot(container);

// রেন্ডার করা
root.render(
  <StrictMode>
    {/* StrictMode যোগ করা হলে এটি ডেভেলপমেন্টের সময় সমস্যাগুলো ধরতে সাহায্য করবে */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);
