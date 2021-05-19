import { useState } from "react";
import data from "../src/bins";
import Link from "next/link";

export async function getStaticProps() {
  return {
    props: {
      bins: data.bins
        .map((bin) => {
          if (bin.retro != "true" || bin.retro === undefined) {
            return {
              name: bin.councilName,
              slug: bin.slug,
            };
          }
        })
        .filter((bin) => bin !== undefined),
    },
  };
}

const Search = ({ bins }) => {
  const [results, setResults] = useState([]);

  const searchBins = (e) => {
    if (e.target.value === "") {
      setResults([]);
    } else {
      setResults(
        bins.filter((b) => b.name.toLowerCase().includes(e.target.value))
      );
    }
  };
  return (
    <>
      <div className="w-1/2 mx-auto">
        <input
          type="text"
          name="search"
          className="bg-white border border-gray-400 focus:border-gray-700 mt-10 text-4xl w-full"
          autoComplete="off"
          onChange={searchBins}
        />
        {results &&
          results.map((result, idx) => {
            return (
              <h2 key={idx}>
                <Link href={result.slug}>{result.name}</Link>
              </h2>
            );
          })}
      </div>
    </>
  );
};

export default Search;
