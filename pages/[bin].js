import data from "../src/bins";
import binImage from "../utils/binImage";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const { bin: binParam } = params;

  const bin = data.bins.filter((b) => b.slug === binParam)[0];

  return {
    props: {
      bin: binImage(bin),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: data.bins.map((bin) => {
      return {
        params: {
          bin: bin.slug,
        },
      };
    }),
    fallback: false,
  };
}

const Contributor = ({ bin }) => {
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

const Bin = ({ bin }) => {
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
        <div className="text-2xl font-rubik">
          {bin.councilName && (
            <h1 className="text-3xl mt-8 mb-4">{bin.councilName}</h1>
          )}
          {bin.collectionDate && (
            <h2 className="text-xl">{bin.collectionDate}</h2>
          )}
          <Contributor bin={bin} />
        </div>
        <div className="col-span-2 md:mt-16">
          <img src={bin.fileName} className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Bin;
