import HeroSkeleton from "@/components/HeroSkeleton";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Skeleton from "@/components/Skeleton";

export default function TVLoading() {
  return (
    <div className="min-h-screen bg-black pb-20">
      <HeroSkeleton />

      {/* Rows Skeletons */}
      <div className="max-w-7xl mx-auto space-y-16 mt-12 px-6 md:px-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-zinc-800 rounded-full" />
                <Skeleton className="h-8 w-48" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: 6 }).map((_, j) => (
                <MovieCardSkeleton key={j} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
