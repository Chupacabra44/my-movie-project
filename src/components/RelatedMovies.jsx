import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import Card from "./Card.jsx";

const RelatedMovies = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const genreId = query.get("genres")?.split(",") || [];

  const [relatedMovie, setRelatedMovie] = useState([]);
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
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId.join(",")}`,
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
  }, [genreId]);

  if (loading) {
    return <p className="text-white">Loading related movies</p>;
  }

  return (
    <div className="text-white flex flex-wrap flex-row gap-8 justify-center mb-16 min-w-100 m-10 z-20 rounded-2xl">
      {relatedMovie.map((movie) => (
        <div key={movie.id} className="flex flex-col bg-[#361159] rounded-2xl">
          <Card movie={movie} />
        </div>
      ))}
    </div>
  );
};
export default RelatedMovies;
