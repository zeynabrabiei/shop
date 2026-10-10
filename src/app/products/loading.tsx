import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import { Skeleton, SkeletonRegion } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <SkeletonRegion label="در حال بارگذاری محصولات…">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-6 h-10 w-48" />
        <Skeleton className="mt-3 mb-8 h-4 w-full max-w-lg" />

        <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-10">
          <div className="hidden space-y-6 lg:block">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div>
            <div className="mb-6 flex gap-3">
              <Skeleton className="h-11 flex-1" />
              <Skeleton className="h-11 w-40" />
            </div>
            <ProductGridSkeleton dense count={8} />
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}