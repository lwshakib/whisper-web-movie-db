import { 
  fetchTrendingMovies, 
  fetchUpcomingMovies, 
  fetchTopRatedMovies,
  fetchTrendingTV,
  fetchPopularTV
} from "@/TMDB/config";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const [
    trendingMovies,
    upcomingMovies,
    topRatedMovies,
    trendingTV,
    popularTV
  ] = await Promise.all([
    fetchTrendingMovies(),
    fetchUpcomingMovies(),
    fetchTopRatedMovies(),
    fetchTrendingTV(),
    fetchPopularTV()
  ]);

  return (
    <div className="min-h-screen pb-20">
      <Hero movies={trendingMovies?.results || []} />
      
      <div className="max-w-7xl mx-auto space-y-12 mt-12">
        <MovieRow 
          title="Trending Movies" 
          movies={trendingMovies?.results || []} 
          viewAllHref="/trending"
        />
        
        <MovieRow 
          title="Upcoming Hits" 
          movies={upcomingMovies?.results || []} 
          viewAllHref="/upcoming"
        />

        <MovieRow 
          title="Top Rated Cinema" 
          movies={topRatedMovies?.results || []} 
          viewAllHref="/top-rated"
        />

        <MovieRow 
          title="Popular TV Shows" 
          type="tv"
          movies={popularTV?.results || []} 
          viewAllHref="/tv"
        />

        <MovieRow 
          title="Trending TV" 
          type="tv"
          movies={trendingTV?.results || []} 
          viewAllHref="/tv"
        />
      </div>
      
      <Footer />
    </div>
  );
}

