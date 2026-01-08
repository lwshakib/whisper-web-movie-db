import { fetchPopularTV, fetchTopRatedTV, fetchTrendingTV } from "@/TMDB/config";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";

export default async function TVPage() {
  const [popular, topRated, trending] = await Promise.all([
    fetchPopularTV(),
    fetchTopRatedTV(),
    fetchTrendingTV()
  ]);

  return (
    <div className="min-h-screen pb-20">
      <Hero movies={trending.results || []} />
      
      <div className="max-w-7xl mx-auto space-y-12 mt-12">
        <MovieRow title="Popular TV Shows" type="tv" movies={popular.results || []} />
        <MovieRow title="Top Rated TV" type="tv" movies={topRated.results || []} />
        <MovieRow title="Trending TV" type="tv" movies={trending.results || []} />
      </div>
    </div>
  );
}

