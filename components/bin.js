import React from "react";
import LazyLoad from "react-lazy-load";
import Link from "next/link";

const Bin = ({
  fileName,
  councilCode,
  councilName,
  collectionDate,
  contributorHandle,
  contributorURL,
  slug,
}) => {
  let contributor;

  if (contributorHandle && contributorURL) {
    contributor = (
      <p className="text-xl font-sans font-light">
        <a className="contributor" href={contributorURL}>
          {contributorHandle}
        </a>
      </p>
    );
  } else if (contributorHandle) {
    contributor = (
      <p className="text-xl font-sans font-light">{contributorHandle}</p>
    );
  }

  return (
    <div>
      <Link href={`/${slug}`}>
        <a className="block sm:pb-10">
          <LazyLoad offsetVertical={1500}>
            <img src={fileName} />
          </LazyLoad>
          <div className="p-4 hidden sm:block">
            <h3
              className="text-2xl mb-1"
              data-local-authority-eng={councilCode}
            >
              {councilName}
            </h3>
            <p className="text-xl font-sans font-light">{collectionDate}</p>
            {contributor}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Bin;
