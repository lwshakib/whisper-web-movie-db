import { fetchUpcomingMovies } from "@/TMDB/config";
import MovieCard from "@/components/MovieCard";

export default async function UpcomingPage() {
  const data = await fetchUpcomingMovies();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            UPCOMING <span className="text-primary italic">RELEASES</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl">
            Get ready for the most anticipated movies coming soon to theaters and streaming.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {data.results?.map(
            (movie: {
              id: number;
              title?: string;
              name?: string;
              poster_path: string;
              vote_average: number;
              release_date?: string;
              first_air_date?: string;
            }) => (
              <MovieCard key={movie.id} movie={movie} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
