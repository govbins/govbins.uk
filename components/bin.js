import React, { useState } from "react";
import LazyLoad from "react-lazy-load";

const BinData = (councilName, councilCode, collectionDate, contributor) => {
  return (
    <>
      <h3 className="text-2xl mb-1">
        {councilName}
      </h3>
      <p className="text-xl font-sans font-light">{collectionDate}</p>
      <p>{contributor}</p>
    </>
  )
}

const RetroBinData = (retroName, retroWhy, startDate, endDate, contributor) => {
  return (
    <>
      <h3 className="text-2xl mb-1">
        {retroWhy == "abolished" ? <span className="line-through">{retroName}</span> : retroName}
      </h3>
      <p className="text-xl font-sans font-light">{RetroDate(startDate, endDate)}</p>
      {contributor}
    </>
  )
}

const RetroDate = (startDate, endDate) => {
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`
  } else if (startDate) {
    return `After ${startDate}`
  } else if (endDate) {
    return `Pre-${endDate}`
  } else {
    return ''
  }
}

const Bin = ({
  fileName,
  councilCode,
  councilName,
  collectionDate,
  contributorHandle,
  contributorURL,
  retro,
  retroName,
  retroWhy,
  startDate,
  endDate,
  presentTwinFileName,
}) => {
  let contributor;

  const [showPresentDay, setShowPresentDay] = useState(false)

  const onMouseEnter = () => {
    setShowPresentDay(true)
  }

  const onMouseLeave = () => {
    setShowPresentDay(false)
  }

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
      { retro ?
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {showPresentDay ?
            <LazyLoad offsetVertical={1500}>
              <img src={presentTwinFileName} />
            </LazyLoad>
            :
            <LazyLoad offsetVertical={1500}>
              <img src={fileName} />
            </LazyLoad>
          }
        </div>
        :
        <LazyLoad offsetVertical={1500}>
          <img src={fileName} />
        </LazyLoad>
      }
      <div className="p-4 hidden sm:block">
        {retro ?
          RetroBinData(retroName, retroWhy, startDate, endDate, contributor) :
          BinData(councilName, councilCode, collectionDate, contributor)}
      </div>
    </div>
  );
};

export default Bin;
