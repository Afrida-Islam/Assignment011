import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";

import Allscholarship from "../Components/Allscholarship";
import ScholarshipDetailsPage from "../Components/ScholarshipDetailsPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
        path: "/register",
        Component: Register,
      },
      {
        path: "/scholarships",
        Component: Allscholarship,
        loader: () => fetch("http://localhost:3000/data"),
      },
      {
        path: "/scholarshipdetails/:id",
        Component: ScholarshipDetailsPage,
      },
    ],
  },
]);
