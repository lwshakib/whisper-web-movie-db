import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Skeleton from "@/components/Skeleton";

export default function SearchLoading() {
  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Results Title/Context Skeleton */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-zinc-800" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-14 md:h-20 w-64 md:w-96" />
            </div>

            {/* Tab Selection Skeleton */}
            <div className="flex items-center gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <Skeleton className="h-10 w-28 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Content Area Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 pb-32">
          {Array.from({ length: 18 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
