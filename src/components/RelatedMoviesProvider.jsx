import { useState } from "react";
import { RelatedMoviesContext } from "./RelatedMoviesContext";

const RelatedMoviesProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [genreId, setGenreId] = useState([]);

  return (
    <RelatedMoviesContext.Provider
      value={{
        sortBy,
        setSortBy,
        currentPage,
        setCurrentPage,
        genreId,
        setGenreId,
      }}
    >
      {children}
    </RelatedMoviesContext.Provider>
  );
};

export default RelatedMoviesProvider;
