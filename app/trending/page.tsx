import { fetchTrendingMovies, fetchTrendingTV } from "@/TMDB/config";
import MovieCard from "@/components/MovieCard";

export default async function TrendingPage() {
  const [movies, tv] = await Promise.all([
    fetchTrendingMovies(),
    fetchTrendingTV()
  ]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            TRENDING <span className="text-primary italic">NOW</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl">
            The most watched movies and TV shows across the globe today.
          </p>
        </header>

        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <span className="w-1.5 h-6 bg-primary rounded-full" />
               Movies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {movies.results?.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} type="movie" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
               <span className="w-1.5 h-6 bg-primary rounded-full" />
               TV Series
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {tv.results?.map((show: any) => (
                <MovieCard key={show.id} movie={show} type="tv" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

