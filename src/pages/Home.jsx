import { useEffect, useState } from "react";
import { getTrendingMovies, searchMovies } from "../services/api";
import { getTrendingSearches } from "../services/appwrite";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Home() {

  // =========================
  // NORMAL MOVIES (GRID)
  // =========================
  const [movies, setMovies] = useState([]);

  // =========================
  // TRENDING SEARCHES (SLIDER)
  // =========================
  const [trending, setTrending] = useState([]);

  const [query, setQuery] = useState("");

  // Load BOTH on page start
  useEffect(() => {
    loadMovies();
    loadTrending();
  }, []);

  // =========================
  // NORMAL MOVIES FROM API
  // =========================
  const loadMovies = async () => {
    const data = await getTrendingMovies();
    setMovies(data.results || []);
  };

  // =========================
  // TRENDING FROM APPWRITE
  // =========================
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

  // =========================
  // SEARCH
  // =========================
  const handleSearch = async (searchQuery) => {

    if (!searchQuery.trim()) {
      loadMovies();
      return;
    }

    const data = await searchMovies(searchQuery);
    setMovies(data.results || []);
  };

  return (
    <div className="bg-black min-h-screen text-white">

      {/* HERO + SEARCH */}
      <SearchBar onSearch={handleSearch} />

      {/* =========================
          🔥 TRENDING SLIDER
      ========================== */}
      <h2 className="text-xl font-bold px-4 mt-6">
        🔥 Trending Searches
      </h2>

      <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">

        {trending.map((movie) => (
          <div key={movie.id} className="min-w-[120px]">

            <img
              src={movie.poster_path}
              className="w-[120px] h-[180px] object-cover rounded"
            />

            <p className="text-xs mt-1">
              {movie.title}
            </p>

          </div>
        ))}

      </div>

      {/* =========================
          🎬 NORMAL MOVIES GRID
      ========================== */}
      <h2 className="text-xl font-bold px-4 mt-6">
        🎬 Movies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">

        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

      </div>

    </div>
  );
}