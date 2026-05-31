import { useEffect, useState } from "react";
import { getTrendingMovies, searchMovies } from "../services/api";
import { getTrendingSearches } from "../services/appwrite";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadMovies();
    loadTrending();
  }, []);

  const loadMovies = async () => {
    const data = await getTrendingMovies();
    setMovies(data.results || []);
  };

  const loadTrending = async () => {
    const data = await getTrendingSearches();

    const formatted = data.map((item) => ({
      id: item.movieId,
      title: item.title,
      poster_path: item.posterPath
        ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
        : null
    }));

    setTrending(formatted);
  };

  const handleSearch = async (searchQuery) => {

    if (!searchQuery.trim()) {
      loadMovies();
      return;
    }

    const data = await searchMovies(searchQuery);
    setMovies(data.results || []);
  };

  return (
  // =========================
  // GLOBAL WRAPPER (MOBILE SAFE)
  // =========================
  <div className="bg-black min-h-screen text-white overflow-x-hidden w-full">

    {/* =========================
        SEARCH (RESPONSIVE WRAPPER)
    ========================== */}
    <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 py-3">
      <SearchBar onSearch={handleSearch} />
    </div>

    {/* =========================
        🔥 TRENDING SECTION
    ========================== */}
    <h2 className="text-base sm:text-lg md:text-xl font-bold px-3 sm:px-4 mt-4">
      🔥 Trending Searches
    </h2>

    <div
      className="
        flex
        gap-2 sm:gap-3 md:gap-4
        overflow-x-auto
        px-3 sm:px-4
        py-3
        scrollbar-hide
        scroll-smooth
      "
    >
      {trending.map((movie) => (
        <div
          key={movie.id}
          className="
            flex-shrink-0
            w-[90px]
            sm:w-[110px]
            md:w-[130px]
          "
        >
          <img
            src={movie.poster_path}
            className="
              w-full
              h-[130px]
              sm:h-[160px]
              md:h-[190px]
              object-cover
              rounded
            "
          />

          <p className="text-[10px] sm:text-xs mt-1 truncate">
            {movie.title}
          </p>
        </div>
      ))}
    </div>

    {/* =========================
        🎬 MOVIES GRID (FULL RESPONSIVE)
    ========================== */}
    <h2 className="text-base sm:text-lg md:text-xl font-bold px-3 sm:px-4 mt-5">
      🎬 Movies
    </h2>

    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        gap-2 sm:gap-3 md:gap-4
        px-2 sm:px-4 md:px-6 lg:px-10
        py-3
      "
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>

  </div>
);
}