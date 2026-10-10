import type { SortOption } from "@/types/catalog";
import type { Product } from "@/types/product";

type Comparator = (a: Product, b: Product) => number;

const comparators: Record<Exclude<SortOption, "recommended">, Comparator> = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating.rate - a.rating.rate,
  reviews: (a, b) => b.rating.count - a.rating.count,
  title: (a, b) => a.title.localeCompare(b.title, "en"),
};

/** Returns a new sorted array. «recommended» keeps the API's original order. */
export function sortProducts(
  products: readonly Product[],
  sort: SortOption,
): Product[] {
  const copy = [...products];
  if (sort === "recommended") return copy;
  const compare = comparators[sort];
  // Ties fall back to id so the order is always stable and predictable.
  return copy.sort((a, b) => compare(a, b) || a.id - b.id);
}