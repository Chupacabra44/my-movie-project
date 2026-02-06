import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const DetailMovie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [movieVideos, setMovieVideos] = useState([]);
  const [credits, setCredits] = useState({ actors: [], directors: [] });
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
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);

        const [movieRes, videosRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}`, API_OPTIONS),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, API_OPTIONS),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits`,
            API_OPTIONS,
          ),
        ]);

        const movieData = await movieRes.json();
        const videosData = await videosRes.json();
        const creditsData = await creditsRes.json();

        setMovie(movieData);
        setMovieVideos(videosData.results || []);

        const actorsData = creditsData.cast.slice(0, 7) ?? [];
        const directorsData =
          creditsData.crew.filter((person) => person.job === "Director") ?? [];

        setCredits({
          actors: actorsData,
          directors: directorsData,
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="text-white p-12">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-white p-12">Movie not found.</div>;
  }

  const {
    backdrop_path,
    original_title,
    overview,
    poster_path,
    genres,
    original_language,
    release_date,
  } = movie;

  const genreName = genres?.map((g) => g.name).join(", ");

  const trailer = movieVideos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  const videoUrl = trailer
    ? `https://www.youtube.com/embed/${trailer?.key}`
    : null;

  return (
    <>
      <title>{original_title}</title>

      <div className="flex flex-row p-12 justify-evenly text-white mt-12 flex-wrap gap-10">
        <div className="max-w-md">
          <img
            className="rounded-2xl"
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "/images/No-Poster.png"
            }
            alt={original_title}
          />
        </div>

        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-6">{original_title}</h2>

          <p className="font-bold text-lg mb-4 bg-linear-to-r from-[#ccc5ff] to-[#a955fd] bg-clip-text text-transparent">
            Genre: {genreName}
          </p>

          <p className="mb-4">
            <span className="font-bold">Overview:</span> {overview}
          </p>

          <p className="mb-2">
            <span className="font-bold">Language: </span>
            {original_language?.toUpperCase()}
          </p>

          <p className="mb-2">
            <span className="font-bold">Release year: </span>
            {release_date?.slice(0, 4)}
          </p>

          <p className="mb-4">
            <span className="font-bold">Cast: </span>
            {credits.actors.map((person) => person.name).join(", ")}
          </p>

          <p className="mb-4">
            <span className="font-bold">Director: </span>
            {credits.directors.map((person) => person.name).join(", ")}
          </p>
          <Link
            to={`/relatedmovie/${id}?genres=${genres.map((g) => g.id)}`}
            className="inline-block font-bold text-2xl my-3 p-3 rounded-full bg-fuchsia-800 text-white shadow-lg hover:bg-fuchsia-900"
          >
            Related Movies
          </Link>
          <img
            className={`max-w-md mt-6 rounded-2xl ${
              !backdrop_path ? "opacity-80" : ""
            }`}
            src={
              backdrop_path
                ? `https://image.tmdb.org/t/p/w780${backdrop_path}`
                : "/images/No-Poster.png"
            }
            alt="Movie backdrop"
          />
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        {videoUrl ? (
          <iframe
            width="1000"
            height="600"
            src={videoUrl}
            title={original_title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl bg-linear-to-tr from-[#991ff7] to-[#d396ff] p-1"
          />
        ) : (
          <p className="text-white text-center">Trailer not available</p>
        )}
      </div>
    </>
  );
};

export default DetailMovie;
