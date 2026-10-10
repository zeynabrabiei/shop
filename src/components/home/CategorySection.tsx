import {
  ArrowLeft,
  Gem,
  Shirt,
  Smartphone,
  Sparkles,
  Tag,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { SectionHeading } from "@/components/home/SectionHeading";
import { Skeleton, SkeletonRegion } from "@/components/ui/Skeleton";
import { getCategoryLabel } from "@/data/categories";
import { getCategories, getProducts } from "@/lib/api/products";
import { buildProductsHref, DEFAULT_QUERY } from "@/lib/catalog/params";
import { formatCount } from "@/lib/formatters";

const CATEGORY_ICONS: Readonly<Partial<Record<string, LucideIcon>>> = {
  electronics: Smartphone,
  jewelery: Gem,
  "men's clothing": Shirt,
  "women's clothing": Sparkles,
};

async function CategoryCards() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }

  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map((category) => {
        const Icon = CATEGORY_ICONS[category] ?? Tag;
        return (
          <li key={category}>
            <Link
              href={buildProductsHref(DEFAULT_QUERY, { category })}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold">{getCategoryLabel(category)}</p>
                <p className="mt-1 text-xs text-muted">
                  {formatCount(counts.get(category) ?? 0)} محصول
                </p>
              </div>
              <ArrowLeft
                className="mt-auto size-4 self-end text-muted transition-all group-hover:-translate-x-1 group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function CategorySection() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="mx-auto mt-20 max-w-7xl scroll-mt-24 px-4 sm:mt-28 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="categories-heading"
        title="خرید بر اساس دسته‌بندی"
        description="مستقیم به بخشی که دنبالش هستید بروید."
      />
      <Suspense
        fallback={
          <SkeletonRegion label="در حال بارگذاری دسته‌بندی‌ها…">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-40 rounded-2xl" />
              ))}
            </div>
          </SkeletonRegion>
        }
      >
        <CategoryCards />
      </Suspense>
    </section>
  );
}