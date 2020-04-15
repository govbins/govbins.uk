import Head from "next/head";
import binsData from "../src/bins"
import Bin from "../components/bin"

const Home = () => (
  <React.Fragment>
    <Head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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


    {binsData.bins.map((bin) => {
      return <Bin {...bin} />
    })}
  </React.Fragment >
);

export default Home;
