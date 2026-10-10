import { Suspense } from "react";

import { SectionHeading } from "@/components/home/SectionHeading";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import { SkeletonRegion } from "@/components/ui/Skeleton";
import { getFeaturedProducts } from "@/lib/api/products";

async function FeaturedGrid() {
  const products = await getFeaturedProducts(4);
  return <ProductGrid products={products} />;
}

export function FeaturedProducts() {
  return (
    <section
      aria-labelledby="featured-heading"
      className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="featured-heading"
        title="محصولات منتخب"
        description="پرامتیازترین محصولات کاتالوگ نمایشی، بر اساس امتیاز ثبت‌شده در داده‌های API."
        actionHref="/products"
        actionLabel="مشاهده همه"
      />
      <Suspense
        fallback={
          <SkeletonRegion label="در حال بارگذاری محصولات منتخب…">
            <ProductGridSkeleton count={4} />
          </SkeletonRegion>
        }
      >
        <FeaturedGrid />
      </Suspense>
    </section>
  );
}