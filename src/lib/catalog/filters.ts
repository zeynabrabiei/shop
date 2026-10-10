import { toDisplayPrice } from "@/lib/pricing";
import type { CatalogQuery, PriceBounds } from "@/types/catalog";
import type { Product } from "@/types/product";

/** Lower-cases and unifies Arabic/Persian letter variants for matching. */
export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every search term must appear in the title or description. */
export function matchesSearch(product: Product, search: string): boolean {
  const terms = normalizeText(search).split(" ").filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalizeText(`${product.title} ${product.description}`);
  return terms.every((term) => haystack.includes(term));
}

/**
 * Applies search, category, price, and rating filters together.
 * Price filtering uses the same display price the user sees.
 */
export function filterProducts(
  products: readonly Product[],
  query: CatalogQuery,
): Product[] {
  return products.filter((product) => {
    if (query.category !== null && product.category !== query.category) {
      return false;
    }
    if (query.minRating !== null && product.rating.rate < query.minRating) {
      return false;
    }
    const price = toDisplayPrice(product.price);
    if (query.minPrice !== null && price < query.minPrice) return false;
    if (query.maxPrice !== null && price > query.maxPrice) return false;
    return matchesSearch(product, query.q);
  });
}

/** Whole-number bounds of the real display prices, for the price slider. */
export function getPriceBounds(products: readonly Product[]): PriceBounds {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => toDisplayPrice(p.price));
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}