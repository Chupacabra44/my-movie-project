import { useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";

const RelatedMovies = () => {
  const { id } = useParams();
  const location = useLocation();

  console.log(location.search.slice(8));
  const [movie, setMovie] = useState([]);

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
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list`,
          API_OPTIONS,
        );

        const movieData = await response.json();
        setMovie(movieData.genres);
      } catch (error) {}
    };
    fetchRelatedMovies();
  }, []);

  const mapMovieIdGenres = movie.map((movie) => movie.id);

  console.log(mapMovieIdGenres);

  return <div className="text-white">RelatedMovies</div>;
};
export default RelatedMovies;
