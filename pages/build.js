import React from "react";
import A from "../components/a";
import P from "../components/p";
import H2 from "../components/h2";
import Footer from "../components/footer";
import Contact from "../components/contact";

const Li = ({ children }) => {
  return (
    <li className="text-xl list-disc ml-5">{children}</li>
  )
}

const About = () => {
  return (
    <>
      <div className="lg:w-2/3 lg:ml-40 px-5 pt-5 text-2xl font-rubik">
        <H2>How this site is built</H2>
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
            Map made with{" "}
            <A href="https://data.gov.uk/dataset/6ff3fc08-26ff-453e-9289-6420269ba10e/local-authority-districts-counties-and-unitary-authorities-december-2017-map-in-united-kingdom">
              UK government data
            </A>
        </P>

        <Footer />
      </div>
    </>
  );
};

export default About;
