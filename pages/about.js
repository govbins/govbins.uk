import React from "react"
import A from "../components/a"

const P = ({ children }) => {
  return (
    <p className="mb-6">
      {children}
    </p>
  )
}

const H2 = ({ children }) => {
  return (
    <h2 className="text-3xl mb-6 mt-12">{children}</h2>
  )
}

const About = () => {
  return (
    <div className="lg:w-2/3 lg:ml-40 pl-5 pr-5 text-2xl font-rubik">
      <P>Cataloguing a nation&apos;s bins.</P>
      <P>
        Each bin is photographed in person by me, then labelled with data about local councils in <A href="https://local-authority-eng.register.gov.uk/">England</A>, <A href="https://local-authority-nir.register.gov.uk/">Northern Ireland</A>, <A href="https://local-authority-sct.register.gov.uk/">Scotland</A> and <A href="https://principal-local-authority.register.gov.uk/">Wales</A>.
      </P>
      <P>
        Follow on <A href="https://www.instagram.com/govbins.uk/">Instagram</A>
      </P>


      <H2>Press</H2>
      <P><A href="https://inews.co.uk/light-relief/offbeat/local-council-wheelie-bins/">The Independent</A></P>
      <P><A href="https://www.theguardian.com/cities/2018/apr/02/the-beauty-of-bins-instagram-account-catalogues-cities-unique-designs">The Guardian</A></P>
      <P><A href="https://www.citylab.com/design/2018/03/britains-beautiful-garbage-bins/556217/">The Atlantic</A></P>
      <P><A href="https://www.creativereview.co.uk/bin-done-visual-catalogue-nations-bins/">Creative Review</A></P>

      <H2>Contact</H2>
      <A href="https://twitter.com/HarryTrimble/">Twitter</A>, <A href="https://github.com/HarryTrimble/govbins.uk">Github</A>, <A href="mailto:harryroberttrimble@gmail.com">email</A>

      <footer className="mt-40">
        <P>
          © <A href="http://www.harrytrimble.co.uk/" target="_blank">Harry Trimble</A> {new Date().getFullYear()}
        </P>
      </footer>
    </div>
  )
}

export default About;
