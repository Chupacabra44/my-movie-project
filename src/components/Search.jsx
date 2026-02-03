const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="text-white flex justify-center size-[50%] items-center gap-2 mt-12 border border-white max-w-md mx-auto p-4 rounded-lg bg-[#5a5a5a]">
      <img src="images/search.png" alt="Search icon" />
      <input
        className="w-full"
        placeholder="Search through thousands of movies"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </section>
  );
};

export default Search;
