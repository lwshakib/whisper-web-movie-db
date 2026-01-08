import axios from "axios";

const MOVIE_DB_API_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_DB_API_KEY = process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY || process.env.MOVIE_DB_API_KEY;

// Movie Endpoints
const trendingMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/trending/movie/day?api_key=${MOVIE_DB_API_KEY}`;
const upcomingMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/movie/upcoming?api_key=${MOVIE_DB_API_KEY}`;
const topRatedMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/movie/top_rated?api_key=${MOVIE_DB_API_KEY}`;
const searchMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/search/movie?api_key=${MOVIE_DB_API_KEY}`;
const movieDetailsEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/movie/${id}?api_key=${MOVIE_DB_API_KEY}`;
const movieCreditsEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/movie/${id}/credits?api_key=${MOVIE_DB_API_KEY}`;
const similarMoviesEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/movie/${id}/similar?api_key=${MOVIE_DB_API_KEY}`;
const movieVideosEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/movie/${id}/videos?api_key=${MOVIE_DB_API_KEY}`;

// TV Endpoints
const trendingTVEndpoint = `${MOVIE_DB_API_BASE_URL}/trending/tv/day?api_key=${MOVIE_DB_API_KEY}`;
const popularTVEndpoint = `${MOVIE_DB_API_BASE_URL}/tv/popular?api_key=${MOVIE_DB_API_KEY}`;
const topRatedTVEndpoint = `${MOVIE_DB_API_BASE_URL}/tv/top_rated?api_key=${MOVIE_DB_API_KEY}`;
const searchTVEndpoint = `${MOVIE_DB_API_BASE_URL}/search/tv?api_key=${MOVIE_DB_API_KEY}`;
const tvDetailsEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/tv/${id}?api_key=${MOVIE_DB_API_KEY}`;
const tvCreditsEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/tv/${id}/credits?api_key=${MOVIE_DB_API_KEY}`;
const similarTVEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/tv/${id}/similar?api_key=${MOVIE_DB_API_KEY}`;
const tvVideosEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/tv/${id}/videos?api_key=${MOVIE_DB_API_KEY}`;

// Person Endpoints
const personDetailsEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/person/${id}?api_key=${MOVIE_DB_API_KEY}`;
const personMoviesEndpoint = (id: string) => `${MOVIE_DB_API_BASE_URL}/person/${id}/movie_credits?api_key=${MOVIE_DB_API_KEY}`;

export const image500 = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
export const image342 = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
export const image185 = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;
export const imageOriginal = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/original" + posterPath : null;

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/whitelaptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstractcircle-random-dots-vector-illustration-400-176057922.jpg";

export const fallbackPersonImage =
  "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg";

const apiCall = async (endpoint: string, params?: object) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

// Movie APIs
export const fetchTrendingMovies = (page?: number) => apiCall(trendingMoviesEndpoint + (page ? "&page=" + page : ""));
export const fetchUpcomingMovies = (page?: number) => apiCall(upcomingMoviesEndpoint + (page ? "&page=" + page : ""));
export const fetchTopRatedMovies = (page?: number) => apiCall(topRatedMoviesEndpoint + (page ? "&page=" + page : ""));
export const searchMovies = (params: { [key: string]: string | number }) => apiCall(searchMoviesEndpoint, params);
export const fetchMovieDetails = (id: number | string) => apiCall(movieDetailsEndpoint(String(id)));
export const fetchMovieCredits = (movieId: number | string) => apiCall(movieCreditsEndpoint(String(movieId)));
export const fetchSimilarMovies = (movieId: number | string) => apiCall(similarMoviesEndpoint(String(movieId)));
export const fetchMovieVideos = (movieId: number | string) => apiCall(movieVideosEndpoint(String(movieId)));

// TV APIs
export const fetchTrendingTV = (page?: number) => apiCall(trendingTVEndpoint + (page ? "&page=" + page : ""));
export const fetchPopularTV = (page?: number) => apiCall(popularTVEndpoint + (page ? "&page=" + page : ""));
export const fetchTopRatedTV = (page?: number) => apiCall(topRatedTVEndpoint + (page ? "&page=" + page : ""));
export const searchTV = (params: { [key: string]: string | number }) => apiCall(searchTVEndpoint, params);
export const fetchTVDetails = (id: number | string) => apiCall(tvDetailsEndpoint(String(id)));
export const fetchTVCredits = (id: number | string) => apiCall(tvCreditsEndpoint(String(id)));
export const fetchSimilarTV = (id: number | string) => apiCall(similarTVEndpoint(String(id)));
export const fetchTVVideos = (id: number | string) => apiCall(tvVideosEndpoint(String(id)));

// Person APIs
export const fetchPersonDetails = (personId: number | string) => apiCall(personDetailsEndpoint(String(personId)));
export const fetchPersonMovies = (personId: number | string) => apiCall(personMoviesEndpoint(String(personId)));
