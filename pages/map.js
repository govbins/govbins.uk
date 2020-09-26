import React from "react";
import A from "../components/a";
import P from "../components/p";
import Footer from "../components/footer";
import Contact from "../components/contact";

const Map = () => {
  return (
    <>
      <div className="lg:w-2/3 lg:ml-40 px-5 pt-5 lg:px-0 text-2xl font-rubik">
        <h3 className="">Bins catalogued so far</h3>
        <P>
          <small>
            Map made with{" "}
            <A href="https://data.gov.uk/dataset/6ff3fc08-26ff-453e-9289-6420269ba10e/local-authority-districts-counties-and-unitary-authorities-december-2017-map-in-united-kingdom">
              UK government data
            </A>
          </small>
        </P>
        <img src="/images/map.svg" />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Map;
