import { useContext } from "react";
import { RelatedMoviesContext } from "./RelatedMoviesContext.jsx";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import DropdownSort from "./DropdownSort.jsx";

const RelatedMovies = () => {
  const location = useLocation();
  const {
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    genreId,
    setGenreId,
  } = useContext(RelatedMoviesContext);

  const query = new URLSearchParams(location.search);

  const [relatedMovie, setRelatedMovie] = useState([]);
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
      if (!genreId.length) {
        setRelatedMovie([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const relatedRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId.join(",")}&sort_by=${sortBy}&page=${currentPage}`,
          API_OPTIONS,
        );

        if (!relatedRes.ok) {
          throw new Error("Can not fetch movies!");
        }

        const relatedMovies = await relatedRes.json();
        setRelatedMovie(relatedMovies.results);
      } catch (error) {
        console.log(error);
        setError("Failed to load movies!");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedMovies();
  }, [genreId, sortBy, currentPage]);

  useEffect(() => {
    setGenreId(query.get("genres")?.split(",") || []);
    setCurrentPage(1);
  }, [location.search]);

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
        <>
          <div className="relative text-white flex flex-wrap justify-end m-10 z-20 rounded-2xl">
            {currentPage === 1 ? (
              ""
            ) : (
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="absolute left-0 font-bold border-solid border-2 px-4 py-2 rounded-2xl hover:bg-amber-600 hover:text-gray-800 border-amber-300 cursor-pointer"
              >
                ← Page {currentPage - 1}
              </button>
            )}

            {!loading && relatedMovie.length === 0 ? (
              <p>No more related movies!</p>
            ) : (
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="font-bold border-solid border-2 px-4 py-2 rounded-2xl hover:bg-amber-600 hover:text-gray-800 border-amber-300 cursor-pointer"
              >
                Page {currentPage} →
              </button>
            )}
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
      )}
    </>
  );
};
export default RelatedMovies;
