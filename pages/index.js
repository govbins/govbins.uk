import fetch from "node-fetch";
import binsData from "../src/bins";
import Bin from "../components/bin";
import React from "react";
import Footer from "../components/footer";

const engAuthorityCodes = async () => {
  return await fetchCodes(
    "https://local-authority-eng.register.gov.uk/records.json?page-size=500"
  );
};

const welshAuthorityCodes = async () => {
  return await fetchCodes(
    "https://principal-local-authority.register.gov.uk/records.json?page-size=500"
  );
};

const scotAuthorityCodes = async () => {
  return await fetchCodes(
    "https://local-authority-sct.register.gov.uk/records.json?page-size=500"
  );
};

const niAuthorityCodes = async () => {
  return await fetchCodes(
    "https://local-authority-nir.register.gov.uk/records.json?page-size=500"
  );
};

const fetchCodes = async (url) => {
  let codes = {};

  try {
    const response = await fetch(url);
    const results = await response.json();
    for (var localAuthorityCode in results) {
      codes[localAuthorityCode] =
        results[localAuthorityCode]["item"][0]["name"];
    }
  } catch (e) {
    return null;
  }

  return codes;
};

export async function getStaticProps() {
  const engCodes = await engAuthorityCodes();
  const welshCodes = await welshAuthorityCodes();
  const scotCodes = await scotAuthorityCodes();
  const niCodes = await niAuthorityCodes();

  const bins = binsData.bins.map((bin) => {
    let councilName;
    switch (bin.localAuthorityCountry) {
      case "eng":
        councilName = engCodes[bin.localAuthorityCode];
        break;
      case "sct":
        councilName = scotCodes[bin.localAuthorityCode];
        break;
      case "wls":
        councilName = welshCodes[bin.localAuthorityCode];
        break;
      case "ni":
        councilName = niCodes[bin.localAuthorityCode];
        break;
      default:
        councilName = "";
    }

    return {
      councilName,
      ...bin,
    };
  });

  return {
    props: {
      bins,
    },
  };
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBin(key, binData) {
    return <Bin key={key} {...binData} />;
  }

  render() {
    return (
      <React.Fragment>
        <section className="grid grid-cols-2 lg:grid-cols-4">
          {binsData.bins.map((bin, index) => {
            return this.renderBin(index, bin);
          })}
        </section>
        <div className="pl-6 text-2xl">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
