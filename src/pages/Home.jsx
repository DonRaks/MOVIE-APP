// Import React hooks
import { useEffect, useState } from "react";

// Import API functions
import { getTrendingMovies, searchMovies } from "../services/api";

// Import components
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [hero, setHero] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadTrending();
  }, []);

  // ===============================
// LOAD TRENDING (FIXED)
// ===============================
const loadTrending = async () => {
  const data = await getTrendingSearches();

  const formatted = data.map((item) => ({
    id: item.movieId,
    title: item.title,

    // 🔥 MUST convert poster path
    poster_path: item.posterPath
      ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
      : null
  }));

  setMovies(formatted);
};

  // Handles searches coming from SearchBar component
  const handleSearch = async (searchQuery) => {

    // If search box is empty, reload trending movies
    if (!searchQuery.trim()) {
      loadTrending();
      return;
    }

    try {

      // Search TMDB
      const data = await searchMovies(searchQuery);

      // Update movies grid
      setMovies(data.results || []);

    } catch (error) {

      console.error("Search failed:", error);

    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      {/* HERO SECTION */}
      {hero && (
        <div
          className="h-[70vh] flex items-end p-10 relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${hero.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="relative z-10 max-w-xl">
            <h1 className="text-4xl font-bold">{hero.title}</h1>
            <p className="text-sm text-gray-300 mt-2">
              {hero.overview?.slice(0, 150)}...
            </p>

            <button className="mt-4 bg-red-600 px-4 py-2 rounded">
              Watch Now
            </button>
          </div>
        </div>
      )}

        {/* SEARCH BAR COMPONENT */}
        <div className="p-4">
          <SearchBar onSearch={handleSearch} />
        </div>


      {/* MOVIES GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}