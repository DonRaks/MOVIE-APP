import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔥 DEBOUNCE + AUTOCOMPLETE
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      onSearch(""); // reset trending
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const data = await searchMovies(query);
        setResults(data.results?.slice(0, 6) || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 500); // debounce delay

    return () => clearTimeout(delay);
  }, [query]);

  // 🔍 when user clicks result
  const handleSelect = (movie) => {
    setQuery(movie.title);
    setResults([]);
    setShowDropdown(false);
    onSearch(movie.title);
  };

  // ⌨️ manual submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">

      {/* INPUT */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="
        w-full px-4 py-2 rounded-lg
        bg-black
        text-white
        border border-red-500
        outline-none
        "
        />

        <button
          type="submit"
          className="
            bg-red-600 hover:bg-red-700
            px-4 py-2 rounded-lg
            text-white
          "
        >
          Search
        </button>
      </form>

      {/* DROPDOWN */}
      {showDropdown && results.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-zinc-900/95 backdrop-blur-md rounded-lg shadow-lg z-50 overflow-hidden">

          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="flex items-center gap-3 p-2 hover:bg-zinc-700 cursor-pointer"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : "https://via.placeholder.com/92x138"
                }
                className="w-10 h-14 object-cover rounded"
              />

              <div>
                <p className="text-white text-sm">
                  {movie.title}
                </p>
                <p className="text-gray-400 text-xs">
                  {movie.release_date?.slice(0, 4)}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}