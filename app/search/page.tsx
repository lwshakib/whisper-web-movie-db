import { 
  searchMovies, 
  searchTV 
} from "@/TMDB/config";
import MovieCard from "@/components/MovieCard";
import { Film, Tv, TrendingUp as TrendingUpIcon, Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchParams {
  q?: string;
  type?: "movie" | "tv";
}

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<SearchParams> 
}) {
  const params = await searchParams;
  const query = params.q || "";
  const type = params.type || "movie";

  let results = [];
  if (query.trim()) {
    const data = type === "movie" 
      ? await searchMovies({ query }) 
      : await searchTV({ query });
    results = data.results || [];
  }

  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Results Title/Context */}
        <div className="mb-12">
          {query ? (
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary text-sm font-black uppercase tracking-[0.3em]">
                  <div className="w-8 h-px bg-primary" />
                  Search Results
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                  {query}
                </h1>
              </div>
              
              {/* Tab Selection */}
              <div className="flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
                <Link
                  href={`/search?q=${query}&type=movie`}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                    type === "movie" 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : "text-zinc-500 hover:text-white"
                  )}
                >
                  <Film className="w-4 h-4" />
                  Movies
                </Link>
                <Link
                  href={`/search?q=${query}&type=tv`}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                    type === "tv" 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : "text-zinc-500 hover:text-white"
                  )}
                >
                  <Tv className="w-4 h-4" />
                  TV Series
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <SearchIcon className="w-24 h-24 text-zinc-800 relative z-10 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                  Discover Something New
                </h1>
                <p className="text-zinc-500 max-w-sm mx-auto">
                  Type your favorite movie or TV show title in the header search to see magic happen.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        {query && (
          <>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 pb-32">
                {results.map((item: any) => (
                  <MovieCard key={item.id} movie={item} type={type} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                <TrendingUpIcon className="w-16 h-16 text-zinc-900" />
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">No results found</h2>
                  <p className="text-zinc-500">We couldn't find any {type === 'movie' ? 'movies' : 'TV series'} matching your search.</p>
                </div>
                <Link 
                  href="/search?q=Marvel&type=movie"
                  className="text-primary text-sm font-bold uppercase tracking-widest hover:underline"
                >
                  Try searching for "Marvel"
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
