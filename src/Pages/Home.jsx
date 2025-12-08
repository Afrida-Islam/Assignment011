import React from "react";
import HeroBanner from "../Components/HeroBanner";

import CanaGatePage from "../Components/CanaGatePage";
import Allscholarship from "../Components/Allscholarship";

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <Allscholarship></Allscholarship>
      <CanaGatePage></CanaGatePage>
    </div>
  );
};

export default Home;
