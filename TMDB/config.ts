/**
 * TMDB API Configuration and Fetching Layer
 * Provides endpoints and utility functions for interacting with The Movie Database API.
 * Uses Next.js fetch with revalidation for optimized performance.
 */

const MOVIE_DB_API_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_DB_API_KEY = process.env.MOVIE_DB_API_KEY;

// Revalidation time: 1 hour (3600 seconds)
const REVALIDATE_TIME = 3600;

// Movie Endpoints
const trendingMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/trending/movie/day?api_key=${MOVIE_DB_API_KEY}`;
const upcomingMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/movie/upcoming?api_key=${MOVIE_DB_API_KEY}`;
const topRatedMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/movie/top_rated?api_key=${MOVIE_DB_API_KEY}`;
const searchMoviesEndpoint = `${MOVIE_DB_API_BASE_URL}/search/movie?api_key=${MOVIE_DB_API_KEY}`;
const movieDetailsEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/movie/${id}?api_key=${MOVIE_DB_API_KEY}`;
const movieCreditsEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/movie/${id}/credits?api_key=${MOVIE_DB_API_KEY}`;
const similarMoviesEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/movie/${id}/similar?api_key=${MOVIE_DB_API_KEY}`;
const movieVideosEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/movie/${id}/videos?api_key=${MOVIE_DB_API_KEY}`;

// TV Endpoints
const trendingTVEndpoint = `${MOVIE_DB_API_BASE_URL}/trending/tv/day?api_key=${MOVIE_DB_API_KEY}`;
const popularTVEndpoint = `${MOVIE_DB_API_BASE_URL}/tv/popular?api_key=${MOVIE_DB_API_KEY}`;
const topRatedTVEndpoint = `${MOVIE_DB_API_BASE_URL}/tv/top_rated?api_key=${MOVIE_DB_API_KEY}`;
const searchTVEndpoint = `${MOVIE_DB_API_BASE_URL}/search/tv?api_key=${MOVIE_DB_API_KEY}`;
const tvDetailsEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/tv/${id}?api_key=${MOVIE_DB_API_KEY}`;
const tvCreditsEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/tv/${id}/credits?api_key=${MOVIE_DB_API_KEY}`;
const similarTVEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/tv/${id}/similar?api_key=${MOVIE_DB_API_KEY}`;
const tvVideosEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/tv/${id}/videos?api_key=${MOVIE_DB_API_KEY}`;

// Person Endpoints
const personDetailsEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/person/${id}?api_key=${MOVIE_DB_API_KEY}`;
const personMoviesEndpoint = (id: string) =>
  `${MOVIE_DB_API_BASE_URL}/person/${id}/movie_credits?api_key=${MOVIE_DB_API_KEY}`;

/**
 * Returns a 500px wide image URL for posters/profiles
 */
export const image500 = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;

/**
 * Returns a 342px wide image URL
 */
export const image342 = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;

/**
 * Returns a 185px wide image URL
 */
export const image185 = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;

/**
 * Returns the original quality image URL for backdrops
 */
export const imageOriginal = (posterPath: string | null) =>
  posterPath ? "https://image.tmdb.org/t/p/original" + posterPath : null;

/**
 * Default fallback image for missing movie posters
 */
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/whitelaptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstractcircle-random-dots-vector-illustration-400-176057922.jpg";

/**
 * Default fallback image for missing person profiles
 */
export const fallbackPersonImage =
  "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg";

/**
 * Generic API caller with Next.js specific fetch options
 * @param endpoint - The API endpoint URL
 * @param params - Optional query parameters
 * @returns Parsed JSON response or empty object on error
 */
const apiCall = async (endpoint: string, params?: Record<string, string | number | boolean>) => {
  const url = new URL(endpoint);
  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));
  }

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: REVALIDATE_TIME },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    return {};
  }
};

/** Fetch daily trending movies */
export const fetchTrendingMovies = (page?: number) =>
  apiCall(trendingMoviesEndpoint + (page ? "&page=" + page : ""));

/** Fetch currently upcoming movies */
export const fetchUpcomingMovies = (page?: number) =>
  apiCall(upcomingMoviesEndpoint + (page ? "&page=" + page : ""));

/** Fetch top rated movies of all time */
export const fetchTopRatedMovies = (page?: number) =>
  apiCall(topRatedMoviesEndpoint + (page ? "&page=" + page : ""));

/** Search movies by title */
export const searchMovies = (params: { [key: string]: string | number }) =>
  apiCall(searchMoviesEndpoint, params);

/** Fetch detailed information for a specific movie */
export const fetchMovieDetails = (id: number | string) => apiCall(movieDetailsEndpoint(String(id)));

/** Fetch cast and crew for a movie */
export const fetchMovieCredits = (movieId: number | string) =>
  apiCall(movieCreditsEndpoint(String(movieId)));

/** Fetch movies similar to a given movie */
export const fetchSimilarMovies = (movieId: number | string) =>
  apiCall(similarMoviesEndpoint(String(movieId)));

/** Fetch trailers and clips for a movie */
export const fetchMovieVideos = (movieId: number | string) =>
  apiCall(movieVideosEndpoint(String(movieId)));

/** Fetch daily trending TV shows */
export const fetchTrendingTV = (page?: number) =>
  apiCall(trendingTVEndpoint + (page ? "&page=" + page : ""));

/** Fetch popular TV shows */
export const fetchPopularTV = (page?: number) =>
  apiCall(popularTVEndpoint + (page ? "&page=" + page : ""));

/** Fetch top rated TV shows */
export const fetchTopRatedTV = (page?: number) =>
  apiCall(topRatedTVEndpoint + (page ? "&page=" + page : ""));

/** Search TV series by name */
export const searchTV = (params: { [key: string]: string | number }) =>
  apiCall(searchTVEndpoint, params);

/** Fetch detailed information for a specific TV show */
export const fetchTVDetails = (id: number | string) => apiCall(tvDetailsEndpoint(String(id)));

/** Fetch cast and crew for a TV show */
export const fetchTVCredits = (id: number | string) => apiCall(tvCreditsEndpoint(String(id)));

/** Fetch TV shows similar to a given show */
export const fetchSimilarTV = (id: number | string) => apiCall(similarTVEndpoint(String(id)));

/** Fetch trailers and clips for a TV show */
export const fetchTVVideos = (id: number | string) => apiCall(tvVideosEndpoint(String(id)));

/** Fetch biography and details for a person (actor/director) */
export const fetchPersonDetails = (personId: number | string) =>
  apiCall(personDetailsEndpoint(String(personId)));

/** Fetch movies/shows associated with a person */
export const fetchPersonMovies = (personId: number | string) =>
  apiCall(personMoviesEndpoint(String(personId)));
