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
import Analytics from "../Pages/Admin Dashboard/Analytics";
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
      // {
      //   path: "/profile",
      //   Component: Profile,
      // },
      // {
      //   path: "/dashboard/add-scholarship",
      //   Component: AddScholarship,
      // },

      // {
      //   path: "dashboard/manage-scholarships",
      //   Component: ManageScholarships,
      // },
      // {
      //   path: "/dashboard/ManageUsers",
      //   Component: ManageUsers,
      // },
      {
        path: "/scholarships",
        Component: Allscholarship,
        loader: () => fetch(`http://localhost:3000/scholarship`),
      },
      {
        path: "/scholarshipdetails/:_id",
        Component: ScholarshipDetailsPage,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/scholarship/${params._id}`),
      },

      // {
      //   path: "/dashboard",
      //   Component: DashboardLayout,
      // },
      // {
      //   path: "/my-applications",
      //   Component: MyApplications,
      // },
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
      // {
      //   path: "manage-applied-applications",
      //   element: <ManageAppliedApplications />,
      // },
      // { path: "all-reviews", element: <AllReviews /> },

      // Student Routes
      { path: "my-applications", element: <MyApplications /> },
      // { path: "my-reviews", element: <MyReviews /> },
    ],
  },
]);
