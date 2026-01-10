import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Allscholarship from "../Components/Allscholarship";
import ScholarshipDetailsPage from "../Components/ScholarshipDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Profile";
import AddScholarship from "../Pages/Admin Dashboard/AddScholarship";

import ManageScholarships from "../Pages/Admin Dashboard/ManageScholarships";
import ManageUsers from "../Pages/Admin Dashboard/ManageUsers";
import PaymentSuccess from "../Pages/PaymentSuccess";
import MyApplications from "../Pages/Student Dashboard/MyApplications";
import MyReviews from "../Pages/Student Dashboard/MyReviews";
import Analytics from "../Pages/Admin Dashboard/Analytics";
import ManageApplications from "../Pages/TableRows/Moderator Dashboard/ManageApplications";
import AllReviews from "../Pages/TableRows/Moderator Dashboard/AllReviews";
import About from "../Components/About";
import Contact from "../Components/Contact";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    // errorElement: ErrorPage,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/PaymentSuccess",
        Component: PaymentSuccess,
      },
      {
        path: "/signup",
        Component: Register,
      },

      {
        path: "/scholarships",
        Component: Allscholarship,
        loader: () => fetch(`https://serverside11.vercel.app/scholarship`),
      },
      {
        path: "/scholarshipdetails/:_id",
        Component: ScholarshipDetailsPage,
        loader: ({ params }) =>
          fetch(`https://serverside11.vercel.app/scholarship/${params._id}`),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "profile", element: <Profile /> },

      // Admin Routes
      { path: "/dashboard/add-scholarship", element: <AddScholarship /> },
      { path: "manage-scholarships", element: <ManageScholarships /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "analytics", element: <Analytics /> },

      // Moderator Routes
      {
        path: "manage-applied-applications",
        element: <ManageApplications />,
      },
      { path: "all-reviews", element: <AllReviews /> },

      // Student Routes
      { path: "my-applications", element: <MyApplications /> },
      { path: "my-reviews", element: <MyReviews /> },
    ],
  },
]);
