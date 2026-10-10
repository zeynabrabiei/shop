import { Check, Star } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { PriceFilter } from "@/components/products/PriceFilter";
import { buttonStyles } from "@/components/ui/Button";
import { getCategoryLabel } from "@/data/categories";
import {
  buildProductsHref,
  DEFAULT_QUERY,
  hasActiveFilters,
  RATING_THRESHOLDS,
} from "@/lib/catalog/params";
import { formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { CatalogQuery, PriceBounds } from "@/types/catalog";

interface ProductFiltersProps {
  query: CatalogQuery;
  categories: readonly string[];
  bounds: PriceBounds;
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title}>
      <h3 className="mb-3 text-sm font-bold">{title}</h3>
      {children}
    </section>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={cn(
        "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
        active
          ? "bg-primary/10 font-semibold text-primary"
          : "text-foreground/80 hover:bg-surface-muted",
      )}
    >
      {children}
      {active ? <Check className="size-4" aria-hidden="true" /> : null}
    </Link>
  );
}

export function ProductFilters({ query, categories, bounds }: ProductFiltersProps) {
  const clearHref = buildProductsHref(DEFAULT_QUERY, { sort: query.sort });

  return (
    <div className="space-y-8">
      <FilterGroup title="دسته‌بندی">
        <div className="space-y-1">
          <FilterLink
            href={buildProductsHref(query, { category: null })}
            active={query.category === null}
          >
            همه دسته‌ها
          </FilterLink>
          {categories.map((category) => (
            <FilterLink
              key={category}
              href={buildProductsHref(query, { category })}
              active={query.category === category}
            >
              {getCategoryLabel(category)}
            </FilterLink>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="بازه‌ی قیمت">
        <PriceFilter
          key={`${query.minPrice ?? ""}-${query.maxPrice ?? ""}`}
          query={query}
          bounds={bounds}
        />
      </FilterGroup>

      <FilterGroup title="امتیاز">
        <div className="space-y-1">
          <FilterLink
            href={buildProductsHref(query, { minRating: null })}
            active={query.minRating === null}
          >
            همه امتیازها
          </FilterLink>
          {RATING_THRESHOLDS.map((threshold) => (
            <FilterLink
              key={threshold}
              href={buildProductsHref(query, { minRating: threshold })}
              active={query.minRating === threshold}
            >
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
                {formatNumber(threshold)} ستاره و بالاتر
              </span>
            </FilterLink>
          ))}
        </div>
      </FilterGroup>

      {hasActiveFilters(query) ? (
        <Link
          href={clearHref}
          scroll={false}
          className={buttonStyles({ variant: "secondary", fullWidth: true })}
        >
          پاک کردن همه فیلترها
        </Link>
      ) : null}
    </div>
  );
}