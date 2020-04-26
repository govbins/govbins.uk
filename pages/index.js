import fetch from 'node-fetch'
import Head from "next/head";
import binsData from "../src/bins"
import Bin from "../components/bin"
import React from "react";
import Footer from "../components/footer"

const engAuthorityCodes = async () => {
  return await fetchCodes('https://local-authority-eng.register.gov.uk/records.json?page-size=500')
}

const welshAuthorityCodes = async () => {
  return await fetchCodes('https://principal-local-authority.register.gov.uk/records.json?page-size=500')
}

const scotAuthorityCodes = async () => {
  return await fetchCodes('https://local-authority-sct.register.gov.uk/records.json?page-size=500')
}

const niAuthorityCodes = async () => {
  return await fetchCodes('https://local-authority-nir.register.gov.uk/records.json?page-size=500')
}

const fetchCodes = async (url) => {
  let codes = {}

  try {
    const response = await fetch(url);
    const results = await response.json();
    for (var localAuthorityCode in results) {
      codes[localAuthorityCode] = results[localAuthorityCode]['item'][0]['name'];
    }
  }
  catch (e) { return null }

  return codes
}

export async function getStaticProps() {
  const eng = engAuthorityCodes()
  const wales = welshAuthorityCodes()
  const scot = scotAuthorityCodes()
  const ni = niAuthorityCodes()
  return {
    props: {
      engAuthorityCodes: await eng,
      welshAuthorityCodes: await wales,
      scotAuthorityCodes: await scot,
      niAuthorityCodes: await ni,
    }
  }
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bins: { ...binsData.bins },
    }
  }

  renderBin(key, binData) {
    let councilName
    switch (binData.localAuthorityCountry) {
      case "eng":
        councilName = this.props.engAuthorityCodes[binData.localAuthorityCode]
        break;
      case "sct":
        councilName = this.props.scotAuthorityCodes[binData.localAuthorityCode]
        break;
      case "wls":
        councilName = this.props.welshAuthorityCodes[binData.localAuthorityCode]
        break;
      default:
        councilName = "";
    }

    return (
      <Bin
        key={key}
        councilName={councilName}
        {...binData}
      />
    )
  }


  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title>#govbins</title>

          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://govbins.uk/" />
          <meta property="og:title" content="#govbins" />
          <meta property="og:description" content="Cataloguing a nation's bins" />
          <meta property="og:image" content="http://govbins.uk/images/preview-card.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="http://govbins.uk/" />
          <meta property="twitter:title" content="#govbins" />
          <meta property="twitter:description" content="Cataloguing a nation's bins" />
          <meta property="twitter:image" content="http://govbins.uk/images/preview-card.png" />

          <link href="https://fonts.googleapis.com/css?family=Rubik" rel="stylesheet" />
        </Head>

        <section className="grid grid-cols-2 lg:grid-cols-4">
          {binsData.bins.map((bin, index) => {
            return this.renderBin(index, bin)
          })}
        </section>
        <Footer />
      </React.Fragment>
    )
  }
}
