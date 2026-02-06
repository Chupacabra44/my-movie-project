const DropdownSort = ({ sortBy, setSortBy }) => {
  return (
    <div className="relative w-48 mt-6">
      <select
        onChange={(event) => setSortBy(event.target.value)}
        value={sortBy}
        className="appearance-none w-full bg-zinc-900 text-white px-4 py-2 pr-10 rounded-lg border border-zinc-700 focus:outline-none focus:border-zinc-500 cursor-pointer"
      >
        <option value="popularity.desc">Popular</option>
        <option value="vote_average.desc">Rating</option>
        <option value="release_date.desc">Newest</option>
      </select>

      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white pointer-events-none">
        ▼
      </span>
    </div>
  );
};

export default DropdownSort;
