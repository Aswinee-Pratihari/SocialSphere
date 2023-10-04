import React from "react";
import logo from "../assets/logo.png";
const Loader = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <img src={logo} alt="" className="w-20 h-20" />
    </section>
  );
};

export default Loader;
