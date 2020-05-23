import React from "react"
import Head from "next/head"
import A from "../components/a"
import P from "../components/p"
import H2 from "../components/h2"
import Footer from "../components/footer"
import Contact from "../components/contact"

const About = () => {
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
      <div className="lg:w-2/3 lg:ml-40 pl-5 pr-5 text-2xl font-rubik">
        <P>Cataloguing a nation&apos;s bins.</P>
        <P><A href="https://medium.com/@HarryTrimble/contribute-to-govbins-88b23a24cbd7">Submit photos to #govbins</A></P>
        <P>
          Each bin is labelled with open data about local councils in <A href="https://www.registers.service.gov.uk/registers/local-authority-eng">England</A>, <A href="https://www.registers.service.gov.uk/registers/local-authority-nir">Northern Ireland</A>, <A href="https://www.registers.service.gov.uk/registers/local-authority-sct">Scotland</A> and <A href="https://www.registers.service.gov.uk/registers/principal-local-authority">Wales</A>.
      </P>
        <P>
          Follow on <A href="https://www.instagram.com/govbins.uk/">Instagram</A>
        </P>


        <H2>Press</H2>
        <P><A href="https://inews.co.uk/light-relief/offbeat/local-council-wheelie-bins/">The Independent</A></P>
        <P><A href="https://www.theguardian.com/cities/2018/apr/02/the-beauty-of-bins-instagram-account-catalogues-cities-unique-designs">The Guardian</A></P>
        <P><A href="https://www.citylab.com/design/2018/03/britains-beautiful-garbage-bins/556217/">The Atlantic</A></P>
        <P><A href="https://www.creativereview.co.uk/bin-done-visual-catalogue-nations-bins/">Creative Review</A></P>

        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default About;
