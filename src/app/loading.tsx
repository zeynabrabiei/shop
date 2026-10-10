import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import { Skeleton, SkeletonRegion } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <SkeletonRegion label="در حال بارگذاری صفحه…">
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full max-w-md" />
            <Skeleton className="h-12 w-4/5 max-w-sm" />
            <Skeleton className="h-4 w-full max-w-lg" />
            <Skeleton className="h-4 w-3/4 max-w-lg" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
          <Skeleton className="aspect-5/4 w-full rounded-3xl" />
        </div>
        <ProductGridSkeleton count={4} />
      </div>
    </SkeletonRegion>
  );
}