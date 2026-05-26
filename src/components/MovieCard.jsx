import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(MovieContext);

  const isFav = favorites.some((m) => m.id === movie.id);

  return (
    <div className="relative bg-zinc-900 rounded-md overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10">
      
      <Link to={`/movie/${movie.id}`}>
        <img
          className="w-full h-72 object-cover transition duration-300 group-hover:brightness-50"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      </Link>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
        <h2 className="text-white text-sm font-semibold">
          {movie.title}
        </h2>

        <button
          onClick={() =>
            isFav ? removeFavorite(movie.id) : addFavorite(movie)
          }
          className="mt-2 w-full bg-red-600 hover:bg-red-700 py-1 rounded text-sm transition"
        >
          {isFav ? "Remove" : "Favorite"}
        </button>
      </div>
    </div>
  );
}