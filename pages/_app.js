import '../styles/tailwind.css'
import React from "react"
import Link from "next/link"
import A from '../components/a'

export default function Govbins({ Component, pageProps }) {
  return (
    <React.Fragment>
      <style jsx global>
        {`
          body {
            background-color: #F8F8F8;
          }
        `}
      </style>
      <div className="font-rubik text-gray-800">
        <header className="w-screen pr-5 pl-5 pt-4 pb-3">
          <h1 className="float-left text-4xl">
            <Link href="/">
              #govbins
            </Link>
          </h1>
          <nav className="float-right text-xl mt-5">
            <ul>
              <li className="inline-block mr-5">
                <A href="/about">
                  About
                </A>
              </li>
              <li className="inline-block">
                <A href="/map">
                  Map
                </A>
              </li>
            </ul>
          </nav>
        </header>
        <main className="clear-both mt-20">
          <Component {...pageProps} />
        </main>
      </div>
    </React.Fragment>
  )
}
