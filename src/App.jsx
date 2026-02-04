import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Movies from "./components/Movies";
import Search from "./components/Search";
import DetailMovie from "./components/DetailMovie";
import Footer from "./components/Footer";
import ScrollButton from "./components/ScrollButton";
import ScrollToTop from "./components/ScrollToTop";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchMovies = async (query = "") => {
    try {
      const endpoint = query
        ? `${SEARCH_API_URL}?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      setMovies(data.results);
      // console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <title>Movies project</title>
      <Header />

      <ScrollButton />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="overlay"></div>
              <div className="hero-section flex flex-col items-center justify-center text-center p-8">
                <Hero />

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <Movies movies={movies} />
              </div>
            </>
          }
        />
        <Route path="/info" element={<div>Info Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/movie/:id" element={<DetailMovie movies={movies} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
