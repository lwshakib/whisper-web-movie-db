import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Skeleton from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 space-y-4">
          <div className="space-y-4">
            <Skeleton className="h-14 w-64 md:h-16 md:w-[450px]" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-2/3 max-w-md" />
          </div>
        </header>

        <div className="space-y-24">
          {Array.from({ length: 2 }).map((_, i) => (
            <section key={i}>
              <div className="mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-zinc-800 rounded-full" />
                <Skeleton className="h-8 w-40" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {Array.from({ length: 12 }).map((_, j) => (
                  <MovieCardSkeleton key={j} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
