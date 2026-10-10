import { clamp } from "@/lib/utils";
import type { Paginated } from "@/types/catalog";

export const DEFAULT_PAGE_SIZE = 8;

/** Slices a list into a page. An out-of-range page is clamped, never an error. */
export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize = DEFAULT_PAGE_SIZE,
): Paginated<T> {
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = clamp(Math.floor(page) || 1, 1, pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    total,
    page: currentPage,
    pageCount,
    pageSize,
  };
}