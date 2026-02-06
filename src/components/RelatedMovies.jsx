import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import DropdownSort from "./DropdownSort.jsx";

const RelatedMovies = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const genreId = query.get("genres")?.split(",") || [];

  const [relatedMovie, setRelatedMovie] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
        setRelatedMovie(relatedMovies.results);
      } catch (error) {
        console.log(error);
        setError("Failed to load movies!");
        setLoading(false);
      }
    };
    fetchRelatedMovies();
  }, [genreId, sortBy]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <DropdownSort sortBy={sortBy} setSortBy={setSortBy} />
      </div>
      {loading ? (
        <p className="text-white flex justify-center mt-6">
          Loading related movies
        </p>
      ) : (
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
      )}
    </>
  );
};
export default RelatedMovies;
