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
  const eng = engAuthorityCodes();
  const wales = welshAuthorityCodes();
  const scot = scotAuthorityCodes();
  const ni = niAuthorityCodes();
  return {
    props: {
      engAuthorityCodes: await eng,
      welshAuthorityCodes: await wales,
      scotAuthorityCodes: await scot,
      niAuthorityCodes: await ni,
    },
  };
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bins: { ...binsData.bins },
    };
  }

  renderBin(key, binData) {
    let councilName;
    switch (binData.localAuthorityCountry) {
      case "eng":
        councilName = this.props.engAuthorityCodes[binData.localAuthorityCode];
        break;
      case "sct":
        councilName = this.props.scotAuthorityCodes[binData.localAuthorityCode];
        break;
      case "wls":
        councilName = this.props.welshAuthorityCodes[
          binData.localAuthorityCode
        ];
        break;
      case "ni":
        councilName = this.props.niAuthorityCodes[binData.localAuthorityCode];
        break;
      default:
        councilName = "";
    }

    return <Bin key={key} councilName={councilName} {...binData} />;
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
