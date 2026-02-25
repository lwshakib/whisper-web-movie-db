"use client";

import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 mx-auto group">
          <Search className="w-12 h-12 text-primary transition-transform group-hover:scale-110 duration-500" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
          4<span className="text-primary italic">0</span>4
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Lost in the <span className="text-primary">Cinema?</span>
        </h2>

        <p className="text-zinc-500 text-lg max-w-md mb-12 mx-auto">
          The scene you&apos;re looking for isn&apos;t in our script. It might have been cut in the
          final edit or never existed at all.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Back to Premiere
          </Link>
          <button
            onClick={() => window.history.back()}
            className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all border border-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous Act
          </button>
        </div>
      </div>

      {/* Footer hint */}
      <p className="mt-16 text-zinc-700 text-sm font-medium tracking-widest uppercase">
        Whisper Web Movie DB • Scene Missing
      </p>
    </div>
  );
}
