"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Play, Film } from "lucide-react";
import { image342 } from "@/TMDB/config";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

/**
 * Individual Movie or TV Show card component.
 * Displays a poster, rating, and metadata with high-quality hover animations.
 * @param movie - The media object to display
 * @param type - The category of the media ('movie' or 'tv') to ensure correct routing
 */
export default function MovieCard({
  movie,
  type = "movie",
}: {
  movie: Movie;
  type?: "movie" | "tv";
}) {
  const title = movie.title || movie.name || "Untitled";
  const rating = movie.vote_average?.toFixed(1) || "N/A";
  const year = (movie.release_date || movie.first_air_date || "").split("-")[0] || "";
  const posterUrl = image342(movie.poster_path);

  return (
    <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }} className="group relative">
      <Link href={`/${type}/${movie.id}`}>
        {/* Poster Container: Aspect ratio maintained for cinematic consistency */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 shadow-xl transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-primary/10">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`${title} poster`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            /* Fallback State: Shown when no poster_path is provided by the API */
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800 text-zinc-600">
              <Film className="w-12 h-12 mb-2" />
              <span className="text-xs">No Poster</span>
            </div>
          )}

          {/* Interactive Overlay: Appears on hover with a Play icon and darkened backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 transform scale-50 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>

          {/* Rating Badge: Persistent high-contrast indicator */}
          <div className="absolute top-3 right-3 glass px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            {rating}
          </div>
        </div>

        {/* Text Information Section */}
        <div className="mt-3 space-y-1">
          <h4 className="text-sm font-semibold line-clamp-1 text-white group-hover:text-primary transition-colors">
            {title}
          </h4>
          {year && <p className="text-xs text-zinc-500 font-medium">{year}</p>}
        </div>
      </Link>
    </motion.div>
  );
}
