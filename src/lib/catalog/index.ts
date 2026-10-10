import { filterProducts } from "@/lib/catalog/filters";
import { DEFAULT_PAGE_SIZE, paginate } from "@/lib/catalog/paginate";
import { sortProducts } from "@/lib/catalog/sort";
import type { CatalogQuery, CatalogResult } from "@/types/catalog";
import type { Product } from "@/types/product";

export function queryCatalog(
  products: readonly Product[],
  query: CatalogQuery,
  pageSize = DEFAULT_PAGE_SIZE,
): CatalogResult {
  const filtered = filterProducts(products, query);
  const sorted = sortProducts(filtered, query.sort);
  return paginate(sorted, query.page, pageSize);
}

export * from "@/lib/catalog/filters";
export * from "@/lib/catalog/paginate";
export * from "@/lib/catalog/params";
export * from "@/lib/catalog/sort";