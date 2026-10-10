import { Skeleton, SkeletonRegion } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <SkeletonRegion label="در حال بارگذاری محصول…">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Skeleton className="h-4 w-72" />
        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-2/3" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-6 h-10 w-48" />
            <Skeleton className="mt-8 h-11 w-40" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="mt-8 h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}