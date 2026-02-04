import { useState, useEffect } from "react";
import { useParams } from "react-router";

const DetailMovie = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === Number(id));
  const [genres, setGenres] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    backdrop_path,
    original_title,
    overview,
    poster_path,
    genre_ids,
    original_language,
    release_date,
  } = movie || {};

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const MOVIE_GENRE_URL =
    "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const MOVIE_VIDEOS_URL = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const response = await fetch(MOVIE_GENRE_URL, API_OPTIONS);
      const responseVideos = await fetch(MOVIE_VIDEOS_URL, API_OPTIONS);
      const movieCredits = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        API_OPTIONS,
      );
      const data = await response.json();
      const dataVideos = await responseVideos.json();
      const dataCredits = await movieCredits.json();
      setCredits(dataCredits.cast);
      console.log(dataCredits);
      setMovieVideos(dataVideos.results);
      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  if (!movie) {
    return <div className="text-white p-12">Movie not found.</div>;
  }

  const movieGenres = genres.filter((genre) => genre_ids?.includes(genre.id));
  const genreName = movieGenres.map((genre) => genre.name).join(", ");

  const trailer = movieVideos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  const video = trailer
    ? `https://www.youtube.com/embed/${trailer?.key}`
    : null;

  const creditsList = credits
    .slice(0, 5)
    .map((credit) => credit.name)
    .join(", ");

  console.log(creditsList);

  if (loading) {
    return <div className="text-white p-12">Loading...</div>;
  }

  return (
    <>
      <title>{original_title}</title>
      <div className="flex flex-row p-12 justify-around text-white mt-12">
        <div className="max-w-md">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "/images/No-Poster.png"
            }
            alt={original_title}
          />
        </div>
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-8">{original_title}</h2>
          <p className="font-bold text-lg mb-6 bg-linear-to-r from-[#ccc5ff] to-[#a955fd] bg-clip-text text-transparent">
            Genre: {genreName}
          </p>
          <p>
            <span className="font-semibold">Overview: </span>
            {overview}
          </p>
          <p className="mt-6">
            Original language: {original_language.toUpperCase()}
          </p>
          <p className="mt-3">Release year: {release_date.slice(0, 4)}</p>
          <p className="mt-3">Cast members: {creditsList}</p>
        </div>
      </div>
      <div className="px-12">
        {video ? (
          <iframe
            width="1000"
            height="600"
            src={video}
            title={original_title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="object-cover rounded-2xl m-[0_auto] bg-linear-to-tr from-[#991ff7] to-[#d396ff] p-1 rounded-2xl"
          />
        ) : (
          <img
            className="mt-12 bg-linear-to-tr from-[#991ff7] to-[#ac4af2] p-1 rounded-2xl"
            src={
              backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
                : "/images/No-Poster.png"
            }
            alt={original_title}
          />
        )}
      </div>
    </>
  );
};

export default DetailMovie;
