import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Skeleton from "@/components/Skeleton";

export default function ListLoading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 space-y-4">
          <div className="space-y-4">
            <Skeleton className="h-14 w-64 md:h-16 md:w-[450px]" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {Array.from({ length: 18 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
