import React, { useState } from "react";
import LazyLoad from "react-lazy-load";

const date = (startDate, endDate) => {
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

const RetroBin = ({
  fileName,
  contributorHandle,
  contributorURL,
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
      <div className="p-4 hidden sm:block">
        <h3 className="text-2xl mb-1">
          {retroWhy == "abolished" ? <span className="line-through">{retroName}</span> : retroName}
        </h3>
        <p className="text-xl font-sans font-light">{date(startDate, endDate)}</p>
        {contributor}
      </div>
    </div>
  );
};

export default RetroBin;
