import React from "react";
import A from "../components/a";
import P from "../components/p";
import H2 from "../components/h2";
import Footer from "../components/footer";
import Contact from "../components/contact";

const About = () => {
  return (
    <>
      <div className="lg:w-2/3 lg:ml-40 px-5 pt-5 text-2xl font-rubik">
        <P>Cataloguing a nation&apos;s bins</P>
        <P>
          <A href="https://medium.com/@HarryTrimble/contribute-to-govbins-88b23a24cbd7">
            Submit photos to #govbins
          </A>
        </P>
        <P>
          Each bin is labelled with open data about local councils in{" "}
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
          Follow on{" "}
          <A href="https://www.instagram.com/govbins.uk/">Instagram</A>
        </P>

        <H2>Press</H2>
        <P>
          <A href="https://www.theguardian.com/cities/2018/apr/02/the-beauty-of-bins-instagram-account-catalogues-cities-unique-designs">
            The Guardian
          </A>
        </P>
        <P>
          <A href="https://www.creativereview.co.uk/bin-done-visual-catalogue-nations-bins/">
            Creative Review
          </A>
        </P>
        <P>
          <A href="https://www.citylab.com/design/2018/03/britains-beautiful-garbage-bins/556217/">
            Bloomberg
          </A>
        </P>
        <P>
          <A href="https://inews.co.uk/light-relief/offbeat/local-council-wheelie-bins/">
            The Independent
          </A>
        </P>
        <P>
          <A href="https://qz.com/emails/quartz-obsession/1687384/">
            Quartz
          </A> (scroll way down)
        </P>
        <P>
          <A href="https://www.gizmodo.co.uk/2020/08/this-website-shows-you-what-bins-look-like-around-the-uk/">
            Gizmodo UK
          </A>
        </P>

        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default About;
