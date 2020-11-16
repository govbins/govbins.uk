import React from "react";
import Image from "next/image";

const Bin = ({
  fileName,
  councilCode,
  councilName,
  collectionDate,
  contributorHandle,
  contributorURL,
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
    <div className="sm:mb-10">
      <Image
        src={fileName}
        alt={councilName}
        width={720}
        height={540}
        loading="lazy"
      />
      <div className="p-4 hidden sm:block">
        <h3 className="text-2xl mb-1" data-local-authority-eng={councilCode}>
          {councilName}
        </h3>
        <p className="text-xl font-sans font-light">{collectionDate}</p>
        {contributor}
      </div>
    </div>
  );
};

export default Bin;
