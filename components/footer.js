import React from "react"
import P from "../components/p"
import A from "../components/a"

const Footer = () => {
  return (
    <footer className="mt-40">
      <P>
        © <A href="http://www.harrytrimble.co.uk/" target="_blank">Harry Trimble</A> {new Date().getFullYear()}
      </P>
    </footer>
  )
}

export default Footer
