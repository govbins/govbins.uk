import React, { useState } from "react";
import P from "../components/p";
import H2 from "../components/h2";
import Footer from "../components/footer";
import data from "../src/bins";

const Map = () => {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <>
      <div className="lg:w-2/3 lg:ml-40 px-5 pt-5 lg:px-0 text-2xl font-rubik">
        <H2>Map</H2>
        <P>{data.bins.filter((bin) => !bin.retro).length} bins catalogued</P>
        <img onLoad={() => setLoaded(true)} src="/images/map.svg" />
        {!isLoaded &&
          <span className="border border-black p-5">
            Map loading...
          </span>
        }
        <Footer />
      </div>
    </>
  );
};

export default Map;
