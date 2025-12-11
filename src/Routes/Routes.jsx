import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Allscholarship from "../Components/Allscholarship";
import ScholarshipDetailsPage from "../Components/ScholarshipDetailsPage";
import ApplicationSubmissionPage from "../Components/ApplicationSubmissionPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Profile";
import ScholarshipForm from "../Components/ScholarshipForm";
import PaymentStatusPage from "../Components/PaymentStatusPage";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: ErrorPage,
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
        path: "/PaymentStatus",
        Component: PaymentStatusPage,
      },
      {
        path: "/scholarships",
        Component: Allscholarship,
        loader: () => fetch("http://localhost:3000/data"),
      },
      {
        path: "/scholarshipdetails/:_id",
        Component: ScholarshipDetailsPage,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/data/${params._id}`),
      },
      {
        path: "/application",
        Component: ApplicationSubmissionPage,
      },
      {
        path: "/dashboard",
        Component: DashboardLayout,
      },
    ],
  },
]);
