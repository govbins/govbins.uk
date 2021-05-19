import React from 'react'
import A from "../components/a";
import Link from "next/link"
import Button from '../components/button';

const P = ({ children }) => {
  return (
    <p className="text-xl mb-5">
      {children}
    </p>
  )
}

const Li = ({ children }) => {
  return (
    <li className="text-xl list-disc ml-5">{children}</li>
  )
}

const Guidelines = () => {
  return (
    <>
      <div className="mx-auto w-full px-4 lg:px-0 pt-5 lg:w-3/4 mb-16">
        <h1 className="text-3xl mt-8 mb-4">Submit photos</h1>
        <P>Help catalogue a nations bins.</P>
      </div>

      <div className="mx-auto w-full px-4 lg:px-0 lg:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-y-20">

        <div className="">
          <h2 className="text-2xl mb-5">Consistent photos</h2>
          <ul>
            <Li>Flat and straight to the bin</Li>
            <Li>Have enough space to be cropped</Li>
            <Li>Landscape (4:3 ratio)</Li>
            <Li>
              Like this example image{' '}
              <span className="lg:hidden">👇</span>
              <span className="hidden lg:inline">👉</span>
            </Li>
          </ul>
          <P></P>
          <P>
            Consistent photos make it easier to see the difference between different bin designs.
          </P>
        </div>
        <div className="">
          <img src="/images/Walford.png" alt="Walford" />
        </div>
      </div>

      <div className="mx-auto w-full px-4 lg:px-0 lg:w-3/4 my-16">
        <Button href="/upload">
          Send your photos
        </Button>
      </div>
    </>
  )
}

export default Guidelines
