import '../styles/tailwind.css'

export default function Govbins({ Component, pageProps }) {
  return (
    <React.Fragment>
      <div className="font-rubik text-gray-800 bg-gray-100">
        <header className="w-screen pr-5 pl-5 pt-4 pb-3">
          <h1 className="text-4xl">
            #govbins
          </h1>
        </header>
        <Component {...pageProps} />
      </div>
    </React.Fragment>
  )
}
