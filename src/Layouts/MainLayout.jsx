import React from "react";
import Navber from "../Components/Navber/Navber";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navber />
      <div className="mt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
