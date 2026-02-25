"use client";

import { Play, PlayCircle } from "lucide-react";
import { useState } from "react";
import TrailerModal from "./TrailerModal";
import Image from "next/image";

interface VideoItem {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface TrailerSectionProps {
  vs: VideoItem[];
  galleryOnly?: boolean;
}

/**
 * Video asset display section.
 * Can render either as a primary "Watch Trailer" button or as a full gallery section.
 * @param vs - Array of video objects from TMDB API
 * @param galleryOnly - If true, renders as a horizontal scrolling list of videos;
 *                     if false, renders as a standalone action button.
 */
export default function TrailerSection({ vs, galleryOnly = false }: TrailerSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);

  /**
   * Filter and prioritize videos:
   * 1. Only YouTube hosted videos are supported.
   * 2. Prioritize 'Trailer' or 'Teaser' types.
   */
  const trailers = vs.filter(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  // Selection logic for the "Main" trailer action
  const mainTrailer = trailers.find((v) => v.type === "Trailer") || trailers[0];

  /**
   * Opens the video player with specific asset key
   */
  const handleOpen = (key: string) => {
    setActiveVideoKey(key);
    setIsOpen(true);
  };

  /**
   * GALLERY MODE: Full section with horizontal scrolling thumbnails
   */
  if (galleryOnly) {
    if (trailers.length <= 1) return null;
    return (
      <section className="py-12 px-6 md:px-12 border-t border-white/5">
        <h2 className="text-white text-2xl font-bold mb-8 uppercase tracking-tight flex items-center gap-3">
          <span className="w-1.5 h-8 bg-primary rounded-full" />
          Trailers & Extras
        </h2>

        {/* Horizontal scroll container with hidden scrollbar for a clean UI */}
        <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar">
          {trailers.map((video) => (
            <div
              key={video.id}
              onClick={() => handleOpen(video.key)}
              className="flex-shrink-0 w-72 md:w-80 group cursor-pointer"
            >
              {/* Thumbnail with hover zoom and localized play icon overlay */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
                <Image
                  src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                  alt={video.name}
                  fill
                  sizes="(max-width: 768px) 280px, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                {/* Visual indicator of video category (e.g. "Trailer", "Teaser") */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase tracking-wider">
                  {video.type}
                </div>
              </div>
              <h4 className="mt-3 text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors line-clamp-1 text-center">
                {video.name}
              </h4>
            </div>
          ))}
        </div>

        {/* Reusable modal for full-screen playback */}
        <TrailerModal isOpen={isOpen} onClose={() => setIsOpen(false)} videoKey={activeVideoKey} />
      </section>
    );
  }

  /**
   * BUTTON MODE: Inline action trigger (usually for detail headers)
   */
  return (
    <>
      <div className="flex flex-wrap items-center gap-4 pt-4">
        <button
          onClick={() => mainTrailer && handleOpen(mainTrailer.key)}
          className="flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 disabled:opacity-50"
          disabled={!mainTrailer}
        >
          <Play className="w-6 h-6 fill-white" />
          {mainTrailer ? "Watch Trailer" : "Trailer N/A"}
        </button>
      </div>

      <TrailerModal isOpen={isOpen} onClose={() => setIsOpen(false)} videoKey={activeVideoKey} />
    </>
  );
}
