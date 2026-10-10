import { getProductGridClassName } from "@/components/products/grid";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-24" />
        <div className="mt-auto flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="size-10" />
        </div>
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  /** Matches the grid used next to the filter sidebar. */
  dense?: boolean;
}

export function ProductGridSkeleton({
  count = 8,
  dense = false,
}: ProductGridSkeletonProps) {
  return (
    <div className={getProductGridClassName(dense)}>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}