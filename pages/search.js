import { useState } from "react";
import data from "../src/bins";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const handleChange = (e) => {
    switch (e.keyCode) {
      case 13:
        router.push(results[selected].slug);
        break;

      case 38:
        setSelected(selected - 1);
        break;

      case 40:
        setSelected(selected + 1);
        break;

      default:
        if (e.target.value === "") {
          setResults([]);
          setSelected(0);
        } else {
          setResults(
            bins.filter((b) => b.name.toLowerCase().includes(e.target.value))
          );
        }
        break;
    }
  };
  return (
    <>
      <div className="w-full px-4 md:px-0 md:w-1/2 mx-auto">
        <form>
          <input
            type="text"
            name="search"
            className="bg-white border border-gray-700 focus:border-gray-900 mt-10 text-4xl w-full px-3 py-1"
            autoComplete="off"
            onChange={handleChange}
          />
        </form>
        {results && (
          <ul className="bg-white text-4xl">
            {results.map((result, idx) => {
              return (
                <li key={idx}>
                  <Link href={result.slug}>
                    <a
                      className={`${
                        selected == idx ? "text-white bg-gray-800" : null
                      } hover:text-white hover:bg-gray-800 px-3 py-1 border-b border-l border-r border-gray-300 block`}
                    >
                      {result.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
