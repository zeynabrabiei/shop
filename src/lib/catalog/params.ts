import {
  SORT_OPTIONS,
  type CatalogQuery,
  type RawSearchParams,
  type SortOption,
} from "@/types/catalog";

/** Rating thresholds offered in the UI («۴ ستاره و بالاتر», «۳ ستاره و بالاتر»). */
export const RATING_THRESHOLDS = [4, 3] as const;

const MAX_SEARCH_LENGTH = 100;

export const DEFAULT_QUERY: CatalogQuery = {
  q: "",
  category: null,
  minPrice: null,
  maxPrice: null,
  minRating: null,
  sort: "recommended",
  page: 1,
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseNonNegativeNumber(value: string | undefined): number | null {
  if (value === undefined || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function parsePage(value: string | undefined): number {
  if (value === undefined || !/^\d+$/.test(value)) return 1;
  const parsed = Number(value);
  return parsed >= 1 ? parsed : 1;
}

function isSortOption(value: string | undefined): value is SortOption {
  return (
    value !== undefined && (SORT_OPTIONS as readonly string[]).includes(value)
  );
}

function parseRating(value: string | undefined): number | null {
  const parsed = parseNonNegativeNumber(value);
  return parsed !== null &&
    (RATING_THRESHOLDS as readonly number[]).includes(parsed)
    ? parsed
    : null;
}

/**
 * Converts raw URL search params into a safe, fully-typed query.
 * Invalid values are reset to their defaults instead of throwing.
 */
export function parseCatalogQuery(
  raw: RawSearchParams,
  validCategories?: readonly string[],
): CatalogQuery {
  const q = (first(raw.q) ?? "").trim().slice(0, MAX_SEARCH_LENGTH);

  const rawCategory = first(raw.category)?.trim() || null;
  const category =
    rawCategory !== null &&
    (validCategories === undefined || validCategories.includes(rawCategory))
      ? rawCategory
      : null;

  let minPrice = parseNonNegativeNumber(first(raw.minPrice));
  let maxPrice = parseNonNegativeNumber(first(raw.maxPrice));
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    minPrice = null;
    maxPrice = null;
  }

  const rawSort = first(raw.sort);

  return {
    q,
    category,
    minPrice,
    maxPrice,
    minRating: parseRating(first(raw.rating)),
    sort: isSortOption(rawSort) ? rawSort : "recommended",
    page: parsePage(first(raw.page)),
  };
}

/** Serializes a query, omitting default values to keep URLs clean. */
export function toSearchParams(query: CatalogQuery): URLSearchParams {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.minPrice !== null) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice !== null) params.set("maxPrice", String(query.maxPrice));
  if (query.minRating !== null) params.set("rating", String(query.minRating));
  if (query.sort !== "recommended") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  return params;
}

/**
 * Builds a /products URL from the current query plus changes.
 * The page resets to 1 unless `page` is explicitly part of the changes.
 */
export function buildProductsHref(
  query: CatalogQuery,
  changes: Partial<CatalogQuery> = {},
): string {
  const next: CatalogQuery = {
    ...query,
    ...changes,
    page: "page" in changes ? (changes.page ?? 1) : 1,
  };
  const search = toSearchParams(next).toString();
  return search ? `/products?${search}` : "/products";
}

export function countActiveFilters(query: CatalogQuery): number {
  let count = 0;
  if (query.q) count += 1;
  if (query.category !== null) count += 1;
  if (query.minPrice !== null || query.maxPrice !== null) count += 1;
  if (query.minRating !== null) count += 1;
  return count;
}

export function hasActiveFilters(query: CatalogQuery): boolean {
  return countActiveFilters(query) > 0;
}