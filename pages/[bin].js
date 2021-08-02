import data from "../src/bins";
import binImage from "../utils/binImage";
import Head from "next/head";
import Link from "next/link";
import councils from "../src/councils";
import A from "../components/a";

export async function getStaticProps({ params }) {
  const { bin: binParam } = params;

  const bin = data.bins.filter((b) => b.slug === binParam)[0];

  const council = councils.filter((council) => council.slug == binParam)[0];

  if (bin) {
    return {
      props: {
        bin: binImage(bin),
      },
    };
  } else {
    return {
      props: {
        bin: {
          councilName: council.name,
        },
        placeHolder: true,
      },
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: councils.map((council) => {
      return {
        params: {
          bin: council.slug,
        },
      };
    }),
    fallback: false,
  };
}

const Contributor = ({ bin, placeHolder }) => {
  const { contributorURL, contributorHandle } = bin;

  if (contributorHandle && contributorURL) {
    return (
      <p className="text-xl font-sans font-light">
        <a className="contributor" href={contributorURL}>
          {contributorHandle}
        </a>
      </p>
    );
  } else if (contributorHandle) {
    return <p className="text-xl font-sans font-light">{contributorHandle}</p>;
  } else {
    return null;
  }
};

const Bin = ({ bin, placeHolder }) => {
  return (
    <>
      <Head>
        <title key="title">{`${bin.councilName} | #govbins`}</title>
        <meta
          property="twitter:title"
          content={`${bin.councilName} | #govbins`}
          key="tw_title"
        />
        <meta
          property="og:title"
          content={`${bin.councilName} | #govbins`}
          key="og_title"
        />
      </Head>
      <div className="mx-auto w-full px-4 lg:px-0 lg:w-3/4 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-y-20">
        {placeHolder}
        <div className="text-2xl font-rubik pt-16">
          <Link href="/search">
            <a className="text-lg">&larr; Search</a>
          </Link>
          {bin.councilName && (
            <h1 className="text-3xl mt-8 mb-4">{bin.councilName}</h1>
          )}
          {bin.collectionDate && (
            <h2 className="text-xl">{bin.collectionDate}</h2>
          )}
          {placeHolder && (
            <div>
              <p className="text-xl font-sans font-light mb-4">
                Not catalogued...yet!
              </p>
              <p className="text-2xl">
                <A href="/submit-photos">Submit photos</A>
              </p>
            </div>
          )}
          <Contributor bin={bin} />
        </div>
        <div className="col-span-2 md:mt-16">
          {bin.fileName && <img src={bin.fileName} className="w-full" />}
          {placeHolder && (
            <div className="border-dashed border-2 border-black w-full h-96 md:h-128"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bin;
