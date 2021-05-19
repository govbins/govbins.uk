const Search = () => {
  const searchBins = (e) => {
    console.log(e.target.value);
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
      </div>
    </>
  );
};

export default Search;
