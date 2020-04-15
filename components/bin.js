const Bin = ({ fileName, councilCode, councilName, collectionDate }) => {
  return (
    <div>
      <img src={fileName} />
      <h3 id="council-name" data-local-authority-eng={councilCode}></h3>
      <p id="collection-date">{collectionDate}</p>
    </div>
  );
};

export default Bin
