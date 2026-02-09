import { useState, useEffect } from "react";

export const useRelatedMovies = ({ genreId, sortBy, currentPage }) => {
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

  return { relatedMovie, loading, error };
};
