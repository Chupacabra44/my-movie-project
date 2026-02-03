import { useParams } from "react-router";

const DetailMovie = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === Number(id));
  console.log(movie);

  const { backdrop_path, original_title, overview, poster_path } = movie || {};

  return (
    <>
      <title>{original_title}</title>
      <div className="flex flex-row p-12 justify-around text-white mt-12">
        <div className="max-w-md">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "images/No-Poster.png"
            }
            alt={original_title}
          />
        </div>
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-8">{original_title}</h2>
          <p>
            <span className="font-semibold">Overview: </span>
            {overview}
          </p>
        </div>
      </div>
      <div className="px-12">
        <img
          className="w-full h-auto object-cover mt-12 bg-linear-to-tr from-[#991ff7] to-[#ac4af2] p-1 rounded-2xl"
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
              : "images/No-Backdrop.png"
          }
          alt={original_title}
        />
        <div></div>
      </div>
    </>
  );
};

export default DetailMovie;
