import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from "@/TMDB/config";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";

export default async function MoviesPage() {
  const [trending, upcoming, topRated] = await Promise.all([
    fetchTrendingMovies(),
    fetchUpcomingMovies(),
    fetchTopRatedMovies()
  ]);

  return (
    <div className="min-h-screen pb-20">
      <Hero movies={trending.results || []} />
      
      <div className="max-w-7xl mx-auto space-y-12 mt-12">
        <MovieRow title="Trending Movies" movies={trending.results || []} />
        <MovieRow title="Upcoming Releases" movies={upcoming.results || []} />
        <MovieRow title="Top Rated Cinema" movies={topRated.results || []} />
      </div>
    </div>
  );
}

