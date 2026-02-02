import { useState, useEffect } from "react";
import Card from "./components/Card";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}?sort_by=popularity.desc`,
        API_OPTIONS,
      );
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-[#58225a] text-white">
        <span>Logo</span>
        <nav className="space-x-4">
          <ul className="flex space-x-4 gap-2">
            <li>Home</li>
            <li>Info</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <div className="overlay"></div>
      <main className="hero-section flex flex-col items-center justify-center text-center p-8">
        <img
          className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md"
          src="/images/hero-img.png"
          alt="Hero image"
        />
      </main>
      <h1 className="text-white text-6xl font-bold text-center mt-8">
        Find{" "}
        <span className="bg-linear-to-r from-[#ccc5ff] to-[#972eff] bg-clip-text text-transparent">
          Movies
        </span>{" "}
        You'll Enjoy <br /> Without the Hassle
      </h1>
      <section className="flex flex-col mt-12 px-8 text-white">
        <h2 className="text-4xl z-10 ps-14 mt-14 relative">All Movies</h2>
        <div className="flex flex-wrap flex-row gap-8 justify-center mb-16 min-w-100 m-10 z-20 rounded-2xl">
          {movies.map((movie) => (
            <div
              className="flex flex-col bg-[#361159] rounded-2xl"
              key={movie.id}
            >
              <Card movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default App;
