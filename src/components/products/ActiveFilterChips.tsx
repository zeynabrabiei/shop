import { X } from "lucide-react";
import Link from "next/link";

import { getCategoryLabel } from "@/data/categories";
import { buildProductsHref, DEFAULT_QUERY } from "@/lib/catalog/params";
import { formatNumber } from "@/lib/formatters";
import { getPriceUnit } from "@/lib/pricing";
import type { CatalogQuery } from "@/types/catalog";

interface Chip {
  key: string;
  label: string;
  href: string;
}

function formatPriceValue(value: number): string {
  return formatNumber(value, Number.isInteger(value) ? 0 : 2);
}

function buildChips(query: CatalogQuery): Chip[] {
  const chips: Chip[] = [];

  if (query.q) {
    chips.push({
      key: "q",
      label: `جستجو: «${query.q}»`,
      href: buildProductsHref(query, { q: "" }),
    });
  }
  if (query.category !== null) {
    chips.push({
      key: "category",
      label: getCategoryLabel(query.category),
      href: buildProductsHref(query, { category: null }),
    });
  }
  if (query.minPrice !== null || query.maxPrice !== null) {
    const parts: string[] = [];
    if (query.minPrice !== null) parts.push(`از ${formatPriceValue(query.minPrice)}`);
    if (query.maxPrice !== null) parts.push(`تا ${formatPriceValue(query.maxPrice)}`);
    chips.push({
      key: "price",
      label: `قیمت ${parts.join(" ")} ${getPriceUnit()}`,
      href: buildProductsHref(query, { minPrice: null, maxPrice: null }),
    });
  }
  if (query.minRating !== null) {
    chips.push({
      key: "rating",
      label: `${formatNumber(query.minRating)} ستاره و بالاتر`,
      href: buildProductsHref(query, { minRating: null }),
    });
  }
  return chips;
}

export function ActiveFilterChips({ query }: { query: CatalogQuery }) {
  const chips = buildChips(query);
  if (chips.length === 0) return null;

  return (
    <ul aria-label="فیلترهای فعال" className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.key}>
          <Link
            href={chip.href}
            scroll={false}
            aria-label={`حذف فیلتر ${chip.label}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface py-1.5 ps-3 pe-2 text-xs font-medium transition-colors hover:border-danger/40 hover:text-danger"
          >
            {chip.label}
            <X className="size-3.5" aria-hidden="true" />
          </Link>
        </li>
      ))}
      <li>
        <Link
          href={buildProductsHref(DEFAULT_QUERY, { sort: query.sort })}
          scroll={false}
          className="px-2 text-xs font-semibold text-primary hover:underline"
        >
          پاک کردن همه
        </Link>
      </li>
    </ul>
  );
}