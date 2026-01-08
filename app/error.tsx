"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
        <RefreshCcw className="w-12 h-12 text-primary animate-spin-slow" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
        OVAL <span className="text-primary italic">GLITCH</span>
      </h1>
      <p className="text-zinc-500 text-lg max-w-md mb-12">
        Something went wrong while fetching the cinematic metadata. This might be due to a missing API key or network issues.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all"
        >
          <Home className="w-5 h-5" />
          Back Home
        </Link>
      </div>
    </div>
  );
}
