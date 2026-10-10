import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { Skeleton, SkeletonRegion } from "@/components/ui/Skeleton";
import { getCategoryLabel } from "@/data/categories";
import { ApiError } from "@/lib/api/errors";
import { getProduct } from "@/lib/api/products";
import { buildProductsHref, DEFAULT_QUERY } from "@/lib/catalog/params";
import type { Product } from "@/types/product";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

/** Shared by generateMetadata and the page; unknown products render the 404. */
const loadProduct = cache(async (id: string): Promise<Product> => {
  try {
    return await getProduct(id);
  } catch (error) {
    if (error instanceof ApiError && error.code === "not-found") notFound();
    throw error;
  }
});

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await loadProduct(id);
  const description = `${getCategoryLabel(product.category)} | ${truncate(product.description, 140)}`;

  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      type: "website",
      title: product.title,
      description,
      images: [{ url: product.image, alt: product.title }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await loadProduct(id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumbs
        items={[
          { label: "خانه", href: "/" },
          { label: "محصولات", href: "/products" },
          {
            label: getCategoryLabel(product.category),
            href: buildProductsHref(DEFAULT_QUERY, { category: product.category }),
          },
          { label: product.title },
        ]}
      />

      <div className="mt-6">
        <ProductDetails product={product} />
      </div>

      <Suspense
        fallback={
          <SkeletonRegion label="در حال بارگذاری محصولات مشابه…" className="mt-20">
            <Skeleton className="mb-8 h-8 w-48" />
            <ProductGridSkeleton count={4} />
          </SkeletonRegion>
        }
      >
        <RelatedProducts product={product} />
      </Suspense>
    </div>
  );
}