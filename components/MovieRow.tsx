"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";

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

export default function MovieRow({ title, movies, type = "movie", viewAllHref }: MovieRowProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-8 px-6 md:px-12">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </section>
  );
}

