import '../styles/tailwind.css'

export default function Govbins({ Component, pageProps }) {
  return (
    <React.Fragment>
      <section className="font-sans text-gray-900">
        <header className="w-screen pr-5 pl-5 mt-4 pb-3">
          <h1 className="text-4xl">
            #govbins
          </h1>
        </header>
        <Component {...pageProps} />
      </section>
    </React.Fragment>
  )
}
