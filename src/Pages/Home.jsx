import React from "react";
import HeroBanner from "../Components/HeroBanner";

import CanaGatePage from "../Components/CanaGatePage";
import Allscholarship from "../Components/Allscholarship";
import About from "../Components/About";
import SuccessStories from "../Components/SuccessStories";
import ScholarshipBlogs from "../Components/ScholarshipBlogs";
const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <Allscholarship></Allscholarship>
      <CanaGatePage></CanaGatePage>
      <SuccessStories></SuccessStories>
      <ScholarshipBlogs></ScholarshipBlogs>
      <About></About>
    </div>
  );
};

export default Home;
