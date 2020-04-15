import fetch from 'node-fetch'
import Head from "next/head";
import binsData from "../src/bins"
import Bin from "../components/bin"

const engAuthorityCodes = () => {
  return fetchCodes('https://local-authority-sct.register.gov.uk/records.json?page-size=500')
}

const welshAuthorityCodes = () => {
  return fetchCodes('https://principal-local-authority.register.gov.uk/records.json?page-size=500')
}

const scotAuthorityCodes = () => {
  return fetchCodes('https://local-authority-sct.register.gov.uk/records.json?page-size=500')
}

const niAuthorityCodes = () => {
  return fetchCodes('https://local-authority-nir.register.gov.uk/records.json?page-size=500')
}

const fetchCodes = (url) => {
  let codes = {}

  fetch(url)
    .then((response) => response.json())
    .then((results) => {
      for (var localAuthorityCode in results) {
        codes[localAuthorityCode] = results[localAuthorityCode]['item'][0]['name']
      }
    })

  return codes
}

export async function getStaticProps(context) {
  return {
    props: {
      engAuthorityCodes: engAuthorityCodes(),
      welshAuthorityCodes: welshAuthorityCodes(),
      scotAuthorityCodes: scotAuthorityCodes(),
      niAuthorityCodes: niAuthorityCodes(),
    }
  }
}

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      bins: { ...binsData.bins },
    }
  }

  renderBin(key, binData) {
    let councilName
    switch (binData.localAuthorityCountry) {
      case "eng":
        debugger
        console.log(binData.localAuthorityCode)
        councilName = this.props.engAuthorityCodes[binData.localAuthorityCode]
      case "sct":
        councilName = this.props.scotAuthorityCodes[binData.localAuthorityCode]
      case "wls":
        councilName = this.props.welshAuthorityCodes[binData.localAuthorityCode]
      default:
        councilName = "";
    }

    return (
      <Bin
        key={key}
        {...binData}
        councilName={councilName}
      />
    )
  }


  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charset="utf-8" />
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
      </React.Fragment>
    )
  }
}
