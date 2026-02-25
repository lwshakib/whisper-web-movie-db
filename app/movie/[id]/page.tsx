import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchMovieVideos,
  imageOriginal,
  image500,
  fallbackMoviePoster,
} from "@/TMDB/config";
import Image from "next/image";
import { Star, Clock, Calendar } from "lucide-react";
import DetailsActionButtons from "@/components/DetailsActionButtons";
import MovieRow from "@/components/MovieRow";
import TrailerSection from "@/components/TrailerSection";
import Link from "next/link";

/**
 * Dynamic Movie Details Page.
 * Fetches and displays comprehensive information about a specific movie,
 * including cast, similar titles, and trailers.
 * @param params - Contains the dynamic movie ID from the URL
 */
export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  /**
   * Fetch all required data in parallel to minimize total loading time.
   * This includes core info, credits (cast), similar movies, and video assets.
   */
  const [movie, credits, similar, videos] = await Promise.all([
    fetchMovieDetails(id),
    fetchMovieCredits(id),
    fetchSimilarMovies(id),
    fetchMovieVideos(id),
  ]);

  /**
   * Validation: If TMDB returns no data for this ID, show a 404-style error state
   * with a fallback navigation option.
   */
  if (!movie || !movie.id) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Movie Not Found</h1>
          <p className="text-zinc-500">
            The movie you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Derived data for display
  const backdrop = imageOriginal(movie.backdrop_path || movie.poster_path);
  const poster = image500(movie.poster_path) || fallbackMoviePoster;
  const title = movie.title || "Untitled Movie";
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const year = (movie.release_date || "").split("-")[0] || "TBA";
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "Unknown";

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Hero Header Section: Large backdrop with title and primary metadata */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {backdrop ? (
          <Image
            src={backdrop}
            alt={`${title} backdrop`}
            fill
            priority
            className="object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Dynamic Header Content Layer */}
        <div className="absolute inset-0 flex items-end px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            {/* Poster Preview: Only shown on tablet/desktop */}
            <div className="hidden md:block col-span-3">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 group">
                <Image src={poster} alt={`${title} poster`} fill className="object-cover" />
              </div>
            </div>

            {/* Core Info & Primary Actions */}
            <div className="col-span-1 md:col-span-9 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {movie.genres?.map((genre: { id: number; name: string }) => (
                  <span
                    key={genre.id}
                    className="glass px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-zinc-300 font-medium">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-bold">{rating}</span>
                  <span className="text-zinc-500 text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{runtime}</span>
                </div>
                <div className="flex items-center gap-2 border-l border-white/20 pl-6">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{year}</span>
                </div>
              </div>

              <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed md:line-clamp-3 hover:line-clamp-none transition-all duration-500">
                {movie.overview || "No overview available."}
              </p>

              <TrailerSection vs={videos?.results || []} />

              <DetailsActionButtons id={String(movie.id)} type="movie" title={title} />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Information Sections: Cast, Gallery, and Similar contents */}
      <div className="max-w-7xl mx-auto pt-20 divide-y divide-white/5">
        {/* Cast Section: Horizontal scrolling list of top 10 billed actors */}
        <section className="px-6 md:px-12 py-12">
          <h2 className="text-white text-2xl font-bold mb-8 uppercase tracking-tight flex items-center gap-3">
            <span className="w-1.5 h-8 bg-primary rounded-full" />
            Top Cast
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-8 gradient-mask no-scrollbar">
            {credits?.cast
              ?.slice(0, 10)
              .map(
                (person: {
                  id: number;
                  name: string;
                  character: string;
                  profile_path: string | null;
                }) => (
                  <Link
                    href={`/person/${person.id}`}
                    key={person.id}
                    className="flex-shrink-0 w-32 md:w-40 text-center space-y-3 group"
                  >
                    <div className="relative aspect-square rounded-full overflow-hidden border-2 border-white/5 group-hover:border-primary transition-colors">
                      {person.profile_path ? (
                        <Image
                          src={image500(person.profile_path)!}
                          alt={person.name || "Cast member"}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-2xl font-bold">
                          {person.name?.charAt(0) || "?"}
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-primary line-clamp-1">
                      {person.name}
                    </h4>
                    <p className="text-xs text-zinc-500 line-clamp-1">{person.character}</p>
                  </Link>
                )
              )}
          </div>
        </section>

        {/* Video Gallery: Extra trailers and behind the scenes clips */}
        {videos?.results && videos.results.length > 0 && (
          <TrailerSection galleryOnly vs={videos.results} />
        )}

        {/* Discovery: Related cinematic recommendations */}
        {similar?.results && similar.results.length > 0 && (
          <section className="py-12">
            <MovieRow title="Similar Movies" movies={similar.results} />
          </section>
        )}
      </div>
    </div>
  );
}
