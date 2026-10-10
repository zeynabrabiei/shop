import { Info, SearchX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ActiveFilterChips } from "@/components/products/ActiveFilterChips";
import { MobileFilters } from "@/components/products/MobileFilters";
import { Pagination } from "@/components/products/Pagination";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductSort } from "@/components/products/ProductSort";
import { buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCategories, getProducts } from "@/lib/api/products";
import { queryCatalog } from "@/lib/catalog";
import {
  buildProductsHref,
  countActiveFilters,
  DEFAULT_QUERY,
  parseCatalogQuery,
} from "@/lib/catalog/params";
import { getPriceBounds } from "@/lib/catalog/filters";
import { formatCount } from "@/lib/formatters";
import { DEMO_PRICE_NOTICE } from "@/lib/pricing";
import type { RawSearchParams } from "@/types/catalog";

interface ProductsPageProps {
  searchParams: Promise<RawSearchParams>;
}

export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const raw = await searchParams;
  const q = (typeof raw.q === "string" ? raw.q : "").trim().slice(0, 60);

  return {
    title: q ? `نتایج جستجوی «${q}»` : "محصولات",
    description:
      "کاتالوگ محصولات با جستجو، فیلتر دسته‌بندی، قیمت و امتیاز و مرتب‌سازی. داده‌ها نمایشی هستند.",
    alternates: { canonical: "/products" },
    robots: q ? { index: false, follow: true } : undefined,
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const raw = await searchParams;
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const query = parseCatalogQuery(raw, categories);
  const result = queryCatalog(products, query);
  const bounds = getPriceBounds(products);
  const activeCount = countActiveFilters(query);

  const filters = (
    <ProductFilters query={query} categories={categories} bounds={bounds} />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumbs
        items={[{ label: "خانه", href: "/" }, { label: "محصولات" }]}
      />

      <header className="mt-5 mb-8">
        <h1 className="text-3xl font-extrabold">محصولات</h1>
        <p className="mt-3 flex items-start gap-2 text-xs leading-6 text-muted">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {DEMO_PRICE_NOTICE}
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-10">
        <aside aria-label="فیلترها" className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-5">
            {filters}
          </div>
        </aside>

        <section aria-label="نتایج محصولات" className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ProductSearch query={query} />
            <div className="flex gap-3">
              <div className="flex-1 sm:flex-none">
                <ProductSort query={query} />
              </div>
              <MobileFilters total={result.total} activeCount={activeCount}>
                {filters}
              </MobileFilters>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <ActiveFilterChips query={query} />
            <p className="text-sm text-muted" aria-live="polite" aria-atomic="true">
              {result.total === 0
                ? "هیچ محصولی پیدا نشد."
                : `${formatCount(result.total)} محصول پیدا شد.`}
            </p>
          </div>

          <div className="mt-6">
            {result.total === 0 ? (
              <EmptyState
                icon={SearchX}
                title="محصولی با این مشخصات پیدا نشد"
                description="عبارت جستجو را تغییر دهید یا برخی فیلترها را بردارید."
                action={
                  <Link
                    href={buildProductsHref(DEFAULT_QUERY, { sort: query.sort })}
                    className={buttonStyles({ variant: "secondary" })}
                  >
                    پاک کردن همه فیلترها
                  </Link>
                }
              />
            ) : (
              <ProductGrid products={result.items} dense />
            )}
          </div>

          <Pagination
            query={query}
            page={result.page}
            pageCount={result.pageCount}
            total={result.total}
          />
        </section>
      </div>
    </div>
  );
}