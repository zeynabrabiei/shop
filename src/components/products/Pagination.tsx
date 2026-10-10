import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { buildProductsHref } from "@/lib/catalog/params";
import { formatCount } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { CatalogQuery } from "@/types/catalog";

interface PaginationProps {
  query: CatalogQuery;
  page: number;
  pageCount: number;
  total: number;
}

type PageItem = number | "gap";

function getPageItems(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = [...new Set([1, total, current - 1, current, current + 1])]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const items: PageItem[] = [];
  pages.forEach((page, index) => {
    const previous = pages[index - 1];
    if (previous !== undefined && page - previous > 1) items.push("gap");
    items.push(page);
  });
  return items;
}

const baseItem =
  "inline-flex h-10 items-center justify-center rounded-xl border text-sm font-semibold transition-colors";

export function Pagination({ query, page, pageCount, total }: PaginationProps) {
  if (pageCount <= 1) return null;

  const hrefFor = (target: number) => buildProductsHref(query, { page: target });

  return (
    <nav aria-label="صفحه‌بندی" className="mt-10 flex flex-col items-center gap-4">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link
              href={hrefFor(page - 1)}
              scroll
              className={cn(baseItem, "gap-1 border-border bg-surface px-3 hover:border-primary/40")}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
              قبلی
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(baseItem, "gap-1 border-border bg-surface px-3 opacity-40")}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
              قبلی
            </span>
          )}
        </li>

        {getPageItems(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} aria-hidden="true" className="px-1 text-muted">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                aria-label={`صفحه ${formatCount(item)}`}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  baseItem,
                  "min-w-10 px-2",
                  item === page
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface hover:border-primary/40",
                )}
              >
                {formatCount(item)}
              </Link>
            </li>
          ),
        )}

        <li>
          {page < pageCount ? (
            <Link
              href={hrefFor(page + 1)}
              className={cn(baseItem, "gap-1 border-border bg-surface px-3 hover:border-primary/40")}
            >
              بعدی
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className={cn(baseItem, "gap-1 border-border bg-surface px-3 opacity-40")}
            >
              بعدی
              <ChevronLeft className="size-4" aria-hidden="true" />
            </span>
          )}
        </li>
      </ul>

      <p className="text-xs text-muted">
        صفحه {formatCount(page)} از {formatCount(pageCount)} · {formatCount(total)} محصول
      </p>
    </nav>
  );
}