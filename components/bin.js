const Bin = ({ fileName, councilCode, councilName, collectionDate }) => {
  return (
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 bin">
      <img src={fileName} class="img-responsive" alt="Responsive image"></img>
      <h3 id="council-name" data-local-authority-eng={councilCode}></h3>
      <p id="collection-date">{collectionDate}</p>
    </div>
  );
};

export default Bin
