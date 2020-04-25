const Bin = ({ fileName, councilCode, councilName, collectionDate }) => {
  return (
    <div className="mb-10">
      <img src={fileName} />
      <div className="p-4">
        <h3 className="text-2xl mb-1" data-local-authority-eng={councilCode}>{councilName}</h3>
        <p className="text-xl font-sans font-light">{collectionDate}</p>
      </div>
    </div>
  );
};

export default Bin
