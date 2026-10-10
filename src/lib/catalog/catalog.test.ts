import { describe, expect, it } from "vitest";

import { queryCatalog } from "@/lib/catalog";
import { paginate } from "@/lib/catalog/paginate";
import { DEFAULT_QUERY, parseCatalogQuery } from "@/lib/catalog/params";
import type { CatalogQuery } from "@/types/catalog";
import type { Product } from "@/types/product";

function make(
  id: number,
  title: string,
  price: number,
  category: string,
  rate: number,
  count: number,
): Product {
  return {
    id,
    title,
    price,
    description: `desc ${title}`,
    category,
    image: `/img/${id}.png`,
    rating: { rate, count },
  };
}

const products: Product[] = [
  make(1, "Backpack", 100, "bags", 4.5, 120),
  make(2, "Slim Shirt", 20, "men's clothing", 3.2, 400),
  make(3, "Gold Ring", 300, "jewelery", 4.8, 50),
  make(4, "Rain Jacket", 80, "men's clothing", 4.1, 200),
  make(5, "Monitor", 250, "electronics", 2.9, 90),
];

function run(overrides: Partial<CatalogQuery> = {}): number[] {
  const query: CatalogQuery = { ...DEFAULT_QUERY, ...overrides };
  return queryCatalog(products, query, 100).items.map((p) => p.id);
}

describe("search", () => {
  it("matches title terms in any order, case-insensitively", () => {
    expect(run({ q: "JACKET" })).toEqual([4]);
    expect(run({ q: "jacket rain" })).toEqual([4]);
  });

  it("matches descriptions and returns nothing for unknown terms", () => {
    expect(run({ q: "desc" })).toEqual([1, 2, 3, 4, 5]);
    expect(run({ q: "zzz" })).toEqual([]);
  });
});

describe("filters", () => {
  it("filters by category", () => {
    expect(run({ category: "men's clothing" })).toEqual([2, 4]);
  });

  it("filters by price range (inclusive)", () => {
    expect(run({ minPrice: 80, maxPrice: 250 })).toEqual([1, 4, 5]);
  });

  it("filters by minimum rating", () => {
    expect(run({ minRating: 4 })).toEqual([1, 3, 4]);
  });

  it("combines filters", () => {
    expect(run({ category: "men's clothing", minRating: 4 })).toEqual([4]);
  });
});

describe("sorting", () => {
  it("keeps API order for recommended", () => {
    expect(run({ sort: "recommended" })).toEqual([1, 2, 3, 4, 5]);
  });

  it("sorts by price", () => {
    expect(run({ sort: "price-asc" })).toEqual([2, 4, 1, 5, 3]);
    expect(run({ sort: "price-desc" })).toEqual([3, 5, 1, 4, 2]);
  });

  it("sorts by rating, reviews and title", () => {
    expect(run({ sort: "rating" })).toEqual([3, 1, 4, 2, 5]);
    expect(run({ sort: "reviews" })).toEqual([2, 4, 1, 5, 3]);
    expect(run({ sort: "title" })).toEqual([1, 3, 5, 4, 2]);
  });

  it("applies sorting to filtered results", () => {
    expect(run({ minPrice: 50, sort: "price-desc" })).toEqual([3, 5, 1, 4]);
  });
});

describe("paginate", () => {
  const items = [1, 2, 3, 4, 5];

  it("slices the requested page", () => {
    const result = paginate(items, 3, 2);
    expect(result.items).toEqual([5]);
    expect(result.pageCount).toBe(3);
    expect(result.total).toBe(5);
  });

  it("clamps out-of-range pages", () => {
    expect(paginate(items, 99, 2).page).toBe(3);
    expect(paginate(items, 0, 2).page).toBe(1);
  });

  it("handles empty lists", () => {
    const result = paginate([], 1, 2);
    expect(result.items).toEqual([]);
    expect(result.page).toBe(1);
    expect(result.pageCount).toBe(1);
  });
});

describe("parseCatalogQuery", () => {
  it("resets invalid values safely", () => {
    const query = parseCatalogQuery({
      sort: "foo",
      minPrice: "-5",
      page: "abc",
      rating: "5",
    });
    expect(query).toEqual(DEFAULT_QUERY);
  });

  it("drops an inverted price range", () => {
    const query = parseCatalogQuery({ minPrice: "500", maxPrice: "100" });
    expect(query.minPrice).toBeNull();
    expect(query.maxPrice).toBeNull();
  });

  it("rejects unknown categories when a list is provided", () => {
    expect(
      parseCatalogQuery({ category: "ghosts" }, ["bags"]).category,
    ).toBeNull();
    expect(parseCatalogQuery({ category: "bags" }, ["bags"]).category).toBe(
      "bags",
    );
  });

  it("reads valid values and uses the first of repeated params", () => {
    const query = parseCatalogQuery({
      q: "  ring ",
      sort: ["price-asc", "rating"],
      rating: "4",
      page: "2",
    });
    expect(query.q).toBe("ring");
    expect(query.sort).toBe("price-asc");
    expect(query.minRating).toBe(4);
    expect(query.page).toBe(2);
  });
});