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
import ScholarshipForm from "../Pages/Admin Dashboard/ScholarshipForm";

import ManageScholarships from "../Pages/Admin Dashboard/ManageScholarships";
import ManageUsers from "../Pages/Admin Dashboard/ManageUsers";
import PaymentSuccess from "../Pages/PaymentSuccess";

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
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/ScholarshipForm",
        Component: ScholarshipForm,
      },

      {
        path: "/ManageScholarships",
        Component: ManageScholarships,
      },
      {
        path: "/ManageUsers",
        Component: ManageUsers,
      },
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
      
      {
        path: "/dashboard",
        Component: DashboardLayout,
      },
      //  {
      //   path: "/dashboard",
      //   Component: DashboardLayout,
      // },
    ],
  },
]);
