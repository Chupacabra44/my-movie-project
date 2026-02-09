import { Link } from "react-router";
import Card from "./Card.jsx";
import Button from "./Button.jsx";

const Movies = ({ movies, clickToGetMoreMovies }) => {
  return (
    <section className="flex flex-col mt-12 px-8 text-white">
      <h2 className="text-4xl z-10 ps-14 mt-14 relative">All Movies</h2>
      <div className="flex flex-wrap flex-row gap-8 justify-center mb-16 min-w-100 m-10 z-20 rounded-2xl">
        {movies.map((movie) => (
          <div
            className="flex flex-col bg-[#361159] rounded-2xl"
            key={movie.id}
          >
            <Link
              to={`/movie/${movie.id}`}
              className="block hover:scale-105 transition"
            >
              <Card movie={movie} />
            </Link>
          </div>
        ))}
      </div>
      <Button onClick={clickToGetMoreMovies} children="Load More Movies" />
    </section>
  );
};

export default Movies;
