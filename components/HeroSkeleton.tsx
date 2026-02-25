import Skeleton from "./Skeleton";

export default function HeroSkeleton() {
  return (
    <div className="relative h-screen min-h-[750px] w-full bg-zinc-900/10">
      <div className="absolute inset-x-0 top-0 bottom-0 z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col pt-32 pb-12">
        {/* Hero Top Content */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-24 rounded-md" />
            <Skeleton className="h-5 w-16" />
            <div className="h-4 w-px bg-white/20 ml-2" />
            <Skeleton className="h-5 w-12 ml-2" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-16 md:h-24 w-full md:w-[120%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <div className="flex gap-4 pt-4">
            <Skeleton className="h-14 w-44 rounded-xl" />
            <Skeleton className="h-14 w-32 rounded-xl" />
          </div>
        </div>

        {/* Hero Bottom Mini Slider */}
        <div className="mt-auto flex justify-end">
          <div className="w-full md:w-1/2 lg:w-[40%] space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-16" />
              <div className="h-px bg-white/10 flex-1" />
            </div>
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-[2/3] w-[110px] md:w-[140px] flex-shrink-0 rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
