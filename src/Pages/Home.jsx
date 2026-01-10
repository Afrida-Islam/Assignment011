import React from "react";
import HeroBanner from "../Components/HeroBanner";

import CanaGatePage from "../Components/CanaGatePage";
import Allscholarship from "../Components/Allscholarship";
import About from "../Components/About";
import SuccessStories from "../Components/SuccessStories";
import ScholarshipBlogs from "../Components/ScholarshipBlogs";
import Contact from "../Components/Contact";
const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <Allscholarship></Allscholarship>
      <CanaGatePage></CanaGatePage>
      <SuccessStories></SuccessStories>
      <ScholarshipBlogs></ScholarshipBlogs>
      <About></About>
      <Contact></Contact>
    </div>
  );
};

export default Home;
