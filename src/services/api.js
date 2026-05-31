
const BASE_URL = "https://api.themoviedb.org/3";
// Get API key from environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("TMDB KEY:", import.meta.env.VITE_TMDB_API_KEY);

export const getTrendingMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return res.json();
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return res.json();
};

export const getMovieDetails = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY&append_to_response=videos`
  );
  return res.json();
};