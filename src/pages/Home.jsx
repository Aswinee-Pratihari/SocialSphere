import React from "react";
import { Main } from "../components";

const Home = () => {
  return (
    <div className="flex py-4">
      <div className="flex-[3]">
        <Main />
      </div>
      <div className="flex-[1] max-md:hidden">"helll"</div>
    </div>
  );
};

export default Home;
