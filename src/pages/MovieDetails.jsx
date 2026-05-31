import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    loadMovie();
  }, []);

  const loadMovie = async () => {
    const data = await getMovieDetails(id);
    setMovie(data);
  };

  if (!movie) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <img
        className="w-64 rounded"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      />

      <h1 className="text-3xl mt-3">{movie.title}</h1>

      <p className="mt-2 text-gray-300">{movie.overview}</p>

      <p className="mt-2">⭐ {movie.vote_average}</p>
    </div>
  );
}