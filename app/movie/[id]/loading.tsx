import CastSkeleton from "@/components/CastSkeleton";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Skeleton from "@/components/Skeleton";

export default function MovieDetailsLoading() {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Hero Backdrop Skeleton */}
      <div className="relative h-[85vh] w-full overflow-hidden bg-zinc-900/10">
        <div className="absolute inset-0 flex items-end px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            {/* Poster Skeleton */}
            <div className="hidden md:block col-span-3">
              <Skeleton className="aspect-[2/3] w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10" />
            </div>

            {/* Info Skeleton */}
            <div className="col-span-1 md:col-span-9 space-y-6">
              <div className="flex gap-3">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <Skeleton className="h-16 md:h-20 w-3/4 md:w-5/6" />

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <div className="h-5 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="h-5 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Skeleton className="h-14 w-40 rounded-2xl" />
                <div className="flex gap-3">
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                  <Skeleton className="h-14 w-14 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Skeletons */}
      <div className="max-w-7xl mx-auto pt-20 divide-y divide-white/5 space-y-0">
        <section className="px-6 md:px-12 py-12 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-zinc-800 rounded-full" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <CastSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Gallery Skeleton */}
        <section className="px-6 md:px-12 py-12 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-zinc-800 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-72 md:w-80 space-y-3">
                <Skeleton className="aspect-video w-full rounded-2xl" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-12 py-12 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-zinc-800 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
