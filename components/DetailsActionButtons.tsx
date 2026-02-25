"use client";

import { useState } from "react";
import { Heart, List, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailsActionButtonsProps {
  id: string;
  type: "movie" | "tv";
  title: string;
}

/**
 * Action buttons for movie/TV details.
 * Manages local persistence for "Likes" and "Watchlist" states using localStorage,
 * and executes social sharing with fallback to clipboard.
 */
export default function DetailsActionButtons({ id, type, title }: DetailsActionButtonsProps) {
  // Unique key for individual title storage to prevent data collision between movies and TV shows
  const storageKeyPrefix = `whisper_${type}_${id}`;

  /**
   * Lazy state initialization: Directly reads from localStorage during the initial render.
   * Ensures UI consistency across page navigations without flashing default states.
   */
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`${storageKeyPrefix}_liked`) === "true";
  });

  const [isWatchlisted, setIsWatchlisted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(`${storageKeyPrefix}_watchlist`) === "true";
  });

  const [copied, setCopied] = useState(false);

  /**
   * Toggles the "Liked" state and persists to local storage
   */
  const toggleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    localStorage.setItem(`${storageKeyPrefix}_liked`, String(newState));
  };

  /**
   * Toggles the "Watchlist" state and persists to local storage
   */
  const toggleWatchlist = () => {
    const newState = !isWatchlisted;
    setIsWatchlisted(newState);
    localStorage.setItem(`${storageKeyPrefix}_watchlist`, String(newState));
  };

  /**
   * Orchestrates the share interaction.
   * Uses native mobile sharing if available (Navigator Share API),
   * otherwise falls back to copying the current URL to the user's clipboard.
   */
  const handleShare = async () => {
    const shareData = {
      title: `Whisper - ${title}`,
      text: `Check out ${title} on Whisper Movie DB`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Logic for clipboard fallback + UI success feedback
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {/* Love Interaction: Visual toggle with scale animation on click */}
      <button
        onClick={toggleLike}
        className={cn(
          "glass p-4 rounded-2xl transition-all group active:scale-95",
          isLiked ? "bg-red-500/20 border-red-500/50" : "hover:bg-white/10"
        )}
        aria-label={isLiked ? "Unlike" : "Like"}
      >
        <Heart
          className={cn(
            "w-6 h-6 transition-colors",
            isLiked ? "text-red-500 fill-red-500" : "group-hover:text-red-500"
          )}
        />
      </button>

      {/* Watchlist Interaction: Distinct visual feedback for saved items */}
      <button
        onClick={toggleWatchlist}
        className={cn(
          "glass p-4 rounded-2xl transition-all group active:scale-95",
          isWatchlisted ? "bg-primary/20 border-primary/50" : "hover:bg-white/10"
        )}
        aria-label={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        <List
          className={cn(
            "w-6 h-6 transition-colors",
            isWatchlisted ? "text-primary" : "group-hover:text-primary"
          )}
        />
      </button>

      {/* Share Interaction: Dynamic icon change and tooltip for success feedback */}
      <div className="relative">
        <button
          onClick={handleShare}
          className="glass p-4 rounded-2xl hover:bg-white/10 cursor-pointer transition-all group active:scale-95"
          aria-label="Share"
        >
          {copied ? (
            <Check className="w-6 h-6 text-green-500" />
          ) : (
            <Share2 className="w-6 h-6 group-hover:text-blue-500 transition-colors" />
          )}
        </button>

        {copied && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2">
            Link Copied!
          </div>
        )}
      </div>
    </div>
  );
}
