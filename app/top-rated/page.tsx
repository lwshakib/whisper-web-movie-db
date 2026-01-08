import { fetchTopRatedMovies } from "@/TMDB/config";
import MovieCard from "@/components/MovieCard";

export default async function TopRatedPage() {
  const data = await fetchTopRatedMovies();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
            TOP RATED <span className="text-primary italic">CINEMA</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl">
            The highest-rated cinematic masterpieces as voted by the community.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {data.results?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

