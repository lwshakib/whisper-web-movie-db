import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchTrendingTV,
  fetchPopularTV,
} from "@/TMDB/config";
import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import { Footer } from "@/components/Footer";

/**
 * Application Home Page (Dashboard).
 * Aggregates various cinematic categories into a single landing experience.
 * Uses Server Components for optimized data fetching and SEO.
 */
export default async function Home() {
  /**
   * Initial Data Load: Fetches multiple content streams in parallel.
   * This populates the Hero carousel and all categorized rows below it.
   */
  const [trendingMovies, upcomingMovies, topRatedMovies, trendingTV, popularTV] = await Promise.all(
    [
      fetchTrendingMovies(),
      fetchUpcomingMovies(),
      fetchTopRatedMovies(),
      fetchTrendingTV(),
      fetchPopularTV(),
    ]
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Dynamic Hero: Displays daily trending highlights with integrated trailer logic */}
      <Hero movies={trendingMovies?.results || []} />

      {/* Discovery Rows: Partitioned by theme and media type (Movie vs TV) */}
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
