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
        <h1 className="text-3xl mt-8 mb-4">Submit photos to #govbins</h1>
        <h2 className="text-2xl">Send photos from where you are and help catalogue a nations bins.</h2>
      </div>

      <div className="mx-auto w-full px-4 lg:px-0 lg:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-y-20">
        <div className="">
          <h2 className="text-2xl mb-5">1. Check your bin is missing</h2>
          <P>
            Use <A href='/map'>this map</A> to find out if your bin has been catalogued yet.
          </P>
          <P>
            If your bin is from outside the UK or from a council that no longer exists, we'd still love to see it.
          </P>
        </div>
        <div className="mb-10 lg:m-0">
          <img src="/images/govbins-map.gif" alt="Map" />
        </div>

        <div className="">
          <h2 className="text-2xl mb-5">2. Take consistent photos</h2>
          <P>
            Consistent photos make it easier to see the difference between different bins.
          </P>
          <P>
            Consistent photos are:
          </P>
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
        </div>
        <div className="">
          <img src="/images/Walford.png" alt="Walford" />
        </div>
      </div>

      <div className="mx-auto w-full px-4 lg:px-0 lg:w-3/4 my-16">
        <h1 className="text-2xl">3. Send your photos</h1>
        <Button href="/upload">
          Send your photos
        </Button>
      </div>
    </>
  )
}

export default Guidelines
