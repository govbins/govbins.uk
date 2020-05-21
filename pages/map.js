import React from "react"
import Head from "next/head"
import A from "../components/a"
import P from "../components/p"
import Footer from "../components/footer"
import Contact from "../components/contact"

const Map = () => {
  return (
    <>
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
      <div className="lg:w-2/3 lg:ml-40 pl-5 pr-5 lg:p-0 text-2xl font-rubik">
        <h3 className="">Bins catalogued so far</h3>
        <P>
          <small>Map made with <A href="https://data.gov.uk/dataset/6ff3fc08-26ff-453e-9289-6420269ba10e/local-authority-districts-counties-and-unitary-authorities-december-2017-map-in-united-kingdom">UK government data</A></small>
        </P>
        <img src="/images/map.svg" />

        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default Map
