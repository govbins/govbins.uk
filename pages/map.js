import React from "react";
import A from "../components/a";
import P from "../components/p";
import H2 from "../components/h2";
import Footer from "../components/footer";
import Contact from "../components/contact";

const Map = () => {
  return (
    <>
      <div className="lg:w-2/3 lg:ml-40 px-5 pt-5 lg:px-0 text-2xl font-rubik">
        <H2>Map</H2>
        <P>Bins catalogued so far</P>
        <img src="/images/map.svg" />
        <Footer />
      </div>
    </>
  );
};

export default Map;
