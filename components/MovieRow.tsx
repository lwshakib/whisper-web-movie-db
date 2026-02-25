"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  type?: "movie" | "tv";
  viewAllHref?: string;
}

/**
 * A horizontal row of movie/TV show cards.
 * Used to group cinematic content into thematic sections (Trending, Popular, etc.)
 * @param title - The headline for the section
 * @param movies - The list of media items to display
 * @param type - Media category for correct card routing
 * @param viewAllHref - Optional link for a dedicated full-page view of the collection
 */
export default function MovieRow({ title, movies, type = "movie", viewAllHref }: MovieRowProps) {
  // Gracefullly exit if no data is provided to prevent rendering empty sections
  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-8 px-6 md:px-12">
      {/* Dynamic Header: Includes an accent bar and optional "View All" navigation */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
          <span className="w-1.5 h-8 bg-primary rounded-full" />
          {title}
        </h2>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* 
        Responsive Grid: Adaptive columns ranging from 2 (mobile) to 6 (XL screens).
        Currently displays a maximum of 6 items to maintain page performance and layout density.
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </section>
  );
}
