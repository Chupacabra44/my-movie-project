import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";

const RelatedMovies = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const genreId = query.get("genres")?.split(",") || [];

  const [relatedMovie, setRelatedMovie] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchRelatedMovies = async () => {
      try {
        if (!genreId.length) return;
        const relatedRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId.join(",")}&sort_by=${sortBy}`,
          API_OPTIONS,
        );

        if (!relatedRes.ok) {
          throw new Error("Can not fetch movies!");
        }

        const relatedMovies = await relatedRes.json();

        setRelatedMovie(relatedMovies.results);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRelatedMovies();
  }, [genreId, sortBy]);

  if (loading) {
    return <p className="text-white">Loading related movies</p>;
  }

  return (
    <>
      <div className="flex justify-center items-center">
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
      </div>
      <div className="text-white flex flex-wrap flex-row gap-8 justify-center mb-16 min-w-100 m-10 z-20 rounded-2xl">
        {relatedMovie.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col bg-[#361159] rounded-2xl"
          >
            <Card movie={movie} />
          </div>
        ))}
      </div>
    </>
  );
};
export default RelatedMovies;
