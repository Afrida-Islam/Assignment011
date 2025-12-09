import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Allscholarship from "../Components/Allscholarship";
import ScholarshipDetailsPage from "../Components/ScholarshipDetailsPage";
import ApplicationSubmissionPage from "../Components/ApplicationSubmissionPage";
import DashboardLayout from "../Components/DashboardLayout";
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
        path: "/application/:_id",
        Component: ApplicationSubmissionPage,
      },
      {
        path: "/dashboard",
        Component: DashboardLayout,
      },
    ],
  },
]);
