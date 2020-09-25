import "../styles/index.css";
import React from "react";
import Link from "next/link";
import Head from "next/head"
import A from "../components/a";
import "fontsource-rubik";

export default function Govbins({ Component, pageProps }) {
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
      <style jsx global>
        {`
          body {
            background-color: #f8f8f8;
          }
        `}
      </style>
      <div className="font-rubik text-gray-800">
        <header className="w-screen pr-5 pl-5 pt-4 pb-3">
          <h1 className="float-left text-4xl">
            <Link href="/">
              <a>#govbins</a>
            </Link>
          </h1>
          <nav className="float-left w-full sm:w-auto sm:float-right text-xl sm:mt-5">
            <ul>
              <li className="inline-block mr-5">
                <A href="/guidelines">Submit photos</A>
              </li>
              <li className="inline-block mr-5">
                <A href="/about">About</A>
              </li>
              <li className="inline-block">
                <A href="/map">Map</A>
              </li>
            </ul>
          </nav>
        </header>
        <main className="clear-both mt-20">
          <Component {...pageProps} />
        </main>
      </div>
    </React.Fragment>
  );
}
