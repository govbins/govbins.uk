import React from "react";
import A from "../components/a";
import P from "../components/p";
import H2 from "../components/h2";
import H3 from "../components/h3";
import Footer from "../components/footer";

const Build = () => {
  return (
    <>
      <div className="lg:w-2/3 lg:ml-40 px-5 pt-5 text-2xl font-rubik">
        <H2>How this site is built</H2>
        <P>
          This site is built using {" "}
          <A href="https://nextjs.org/">
            Next.js
          </A> and {" "}
          <A href="https://tailwindcss.com/">
            Tailwind CSS
          </A>.
        </P>
        <P>
          Originally {" "}<A href="https://www.harrytrimble.co.uk/">Harry</A> built the site with Bootstrap and some gnarly jQuery soup, which made it slow and expensive. Thankfully, {" "}<A href="http://tommyp.org/">Tommy</A> got involved and changed all that.
        </P>
        <H3>Open government data</H3>
        <P>
          Each bin image is labelled with open government APIs about local councils in{" "}
          <A href="https://www.registers.service.gov.uk/registers/local-authority-eng">
            England
          </A>
          ,{" "}
          <A href="https://www.registers.service.gov.uk/registers/local-authority-nir">
            Northern Ireland
          </A>
          ,{" "}
          <A href="https://www.registers.service.gov.uk/registers/local-authority-sct">
            Scotland
          </A>{" "}
          and{" "}
          <A href="https://www.registers.service.gov.uk/registers/principal-local-authority">
            Wales
          </A>
        </P>
        <P>
            The current {" "}<A href='/map'>map</A> is a SVG exported from a {" "}
            <A href="https://data.gov.uk/dataset/6ff3fc08-26ff-453e-9289-6420269ba10e/local-authority-districts-counties-and-unitary-authorities-december-2017-map-in-united-kingdom">
              government vector map
            </A>, with colours we tweaked bit.
        </P>
        <H3>Hosting and privacy</H3>
        <P>
          Hosted on {" "}<A href="https://www.netlify.com/">Netlify</A>, the site {" "}<A href="https://www.netlify.com/products/analytics/">counts page views and visitors</A> using aggregated data, anonymised. Meaning the site doesn't use cookies or any other potentially creepy tracking stuff.
        </P>
        <H3>Web performance</H3>
        <P>
          The homepage has lazy loading to decrease it's latency. Also to improve performance images are pasted through {" "}<A href="https://imageoptim.com/">ImageOptim</A> and synced them to {" "}<A href="https://aws.amazon.com/s3/">Amazon S3</A>, when deployed via GitHib.
        </P>

        <H3>Open code</H3>
        <P>
          Go to {" "}<A href="https://github.com/govbins/govbins.uk">GitHib</A> to look all the code for this site.
        </P>
        <Footer />
      </div>
    </>
  );
};

export default Build;
