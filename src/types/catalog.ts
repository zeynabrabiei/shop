import type { Product } from "@/types/product";

export const SORT_OPTIONS = [
  "recommended",
  "price-asc",
  "price-desc",
  "rating",
  "reviews",
  "title",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export type RawSearchParams = Record<string, string | string[] | undefined>;

export interface CatalogQuery {
  q: string;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  sort: SortOption;
  page: number;
}

export interface PriceBounds {
  min: number;
  max: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
}

export type CatalogResult = Paginated<Product>;