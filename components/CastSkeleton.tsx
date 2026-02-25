import Skeleton from "./Skeleton";

export default function CastSkeleton() {
  return (
    <div className="flex-shrink-0 w-32 md:w-40 space-y-3">
      <Skeleton className="aspect-square w-full rounded-full" />
      <Skeleton className="h-4 w-3/4 mx-auto" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
    </div>
  );
}
