import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Skeleton from "@/components/Skeleton";

export default function PersonLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Profile Sidebar Skeleton */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <div className="space-y-8">
              <Skeleton className="aspect-[2/3] w-full rounded-[2.5rem]" />
              <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-6">
                <Skeleton className="h-3 w-24 opacity-50" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-2 w-16" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="col-span-1 md:col-span-8 lg:col-span-9 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-zinc-800" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-16 w-3/4 md:h-24 md:w-full" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-zinc-800 rounded-full" />
                <Skeleton className="h-8 w-48" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-full opacity-50" />
                <Skeleton className="h-4 w-2/3 opacity-30" />
              </div>
            </div>

            <section className="pt-12 space-y-10">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-zinc-800 rounded-full" />
                <Skeleton className="h-8 w-64" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
