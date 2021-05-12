import data from "../src/bins";
import binImage from "../utils/binImage";
import H2 from "../components/h2";

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
      <div className="md:flex w-full md:w-10/12 mx-auto justify-between md:mt-12">
        <div className="lg:w-3/12 pt-5 px-5 md:px-0 text-2xl font-rubik">
          {bin.councilName && <H2>{bin.councilName}</H2>}
          {bin.collectionDate && <H2>{bin.collectionDate}</H2>}
          <Contributor bin={bin} />
        </div>
        <div className="lg:w-8/12 pt-5 text-2xl font-rubik">
          <img src={bin.fileName} className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Bin;
