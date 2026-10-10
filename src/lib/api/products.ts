import { ApiError } from "@/lib/api/errors";
import type { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";
const REVALIDATE_SECONDS = 60 * 60;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isProduct(value: unknown): value is Product {
  if (!isRecord(value)) return false;
  const { rating } = value;
  return (
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.price === "number" &&
    typeof value.description === "string" &&
    typeof value.category === "string" &&
    typeof value.image === "string" &&
    isRecord(rating) &&
    typeof rating.rate === "number" &&
    typeof rating.count === "number"
  );
}

function isProductList(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Performs a GET request and returns parsed JSON.
 * Returns `null` for an empty body (Fake Store API answers an unknown
 * product id with HTTP 200 and an empty body).
 */
async function request(path: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (cause) {
    throw new ApiError("network", "Network request failed", { cause });
  }

  if (response.status === 404) {
    throw new ApiError("not-found", "Resource not found", { status: 404 });
  }
  if (!response.ok) {
    throw new ApiError("http", `Unexpected status ${response.status}`, {
      status: response.status,
    });
  }

  const text = await response.text();
  if (text.trim() === "") return null;

  try {
    return JSON.parse(text) as unknown;
  } catch (cause) {
    throw new ApiError("invalid-response", "Response is not valid JSON", {
      cause,
    });
  }
}

export async function getProducts(): Promise<Product[]> {
  const data = await request("/products");
  if (!isProductList(data)) {
    throw new ApiError("invalid-response", "Unexpected products payload");
  }
  return data;
}

export async function getProduct(id: string | number): Promise<Product> {
  const isValidId =
    typeof id === "number"
      ? Number.isInteger(id) && id > 0
      : /^[1-9]\d*$/.test(id);

  if (!isValidId) {
    throw new ApiError("not-found", "Invalid product id");
  }

  const data = await request(`/products/${id}`);
  if (data === null) {
    throw new ApiError("not-found", "Product not found");
  }
  if (!isProduct(data)) {
    throw new ApiError("invalid-response", "Unexpected product payload");
  }
  return data;
}

export async function getCategories(): Promise<string[]> {
  const data = await request("/products/categories");
  if (!isStringList(data)) {
    throw new ApiError("invalid-response", "Unexpected categories payload");
  }
  return data;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const data = await request(
    `/products/category/${encodeURIComponent(category)}`,
  );
  if (!isProductList(data)) {
    throw new ApiError("invalid-response", "Unexpected products payload");
  }
  return data;
}

/** Highest-rated products first (ties broken by review count). */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  return [...products]
    .sort(
      (a, b) => b.rating.rate - a.rating.rate || b.rating.count - a.rating.count,
    )
    .slice(0, limit);
}

/** Same-category products, excluding the given one. Reuses the cached list. */
export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}