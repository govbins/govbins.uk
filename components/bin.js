import React from "react"
import LazyLoad from 'react-lazyload';

const Bin = ({ fileName, councilCode, councilName, collectionDate }) => {
  return (
    <div className="sm:mb-10">
      <LazyLoad
        width={585}
        height={380}
      >
        <img src={fileName} />
      </LazyLoad>
      <div className="p-4 hidden sm:block">
        <h3 className="text-2xl mb-1" data-local-authority-eng={councilCode}>{councilName}</h3>
        <p className="text-xl font-sans font-light">{collectionDate}</p>
      </div>
    </div>
  );
};

export default Bin

