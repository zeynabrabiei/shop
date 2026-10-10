import { calculateTotal } from "@/lib/pricing";
import { clamp, isRecord } from "@/lib/utils";
import type { CartItem, CartProductInfo, CartState } from "@/types/cart";

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

export const EMPTY_CART: CartState = { items: [] };

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return MIN_QUANTITY;
  return clamp(Math.trunc(quantity), MIN_QUANTITY, MAX_QUANTITY);
}

export function addToCart(
  state: CartState,
  product: CartProductInfo,
  quantity = 1,
): CartState {
  const existing = state.items.find((item) => item.productId === product.id);

  if (existing) {
    const nextQuantity = clampQuantity(existing.quantity + quantity);
    if (nextQuantity === existing.quantity) return state;
    return {
      items: state.items.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: nextQuantity }
          : item,
      ),
    };
  }

  const item: CartItem = {
    productId: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
    quantity: clampQuantity(quantity),
  };
  return { items: [...state.items, item] };
}

export function removeFromCart(state: CartState, productId: number): CartState {
  const items = state.items.filter((item) => item.productId !== productId);
  return items.length === state.items.length ? state : { items };
}

export function setQuantity(
  state: CartState,
  productId: number,
  quantity: number,
): CartState {
  const existing = state.items.find((item) => item.productId === productId);
  if (!existing) return state;

  const nextQuantity = clampQuantity(quantity);
  if (nextQuantity === existing.quantity) return state;

  return {
    items: state.items.map((item) =>
      item.productId === productId ? { ...item, quantity: nextQuantity } : item,
    ),
  };
}

export function incrementQuantity(
  state: CartState,
  productId: number,
): CartState {
  const existing = state.items.find((item) => item.productId === productId);
  return existing ? setQuantity(state, productId, existing.quantity + 1) : state;
}

/** Never goes below 1; use `removeFromCart` to delete an item. */
export function decrementQuantity(
  state: CartState,
  productId: number,
): CartState {
  const existing = state.items.find((item) => item.productId === productId);
  return existing ? setQuantity(state, productId, existing.quantity - 1) : state;
}

export function clearCart(state: CartState): CartState {
  return state.items.length === 0 ? state : EMPTY_CART;
}

export function getCartCount(state: CartState): number {
  return state.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(state: CartState): number {
  return calculateTotal(state.items);
}

export function getItemQuantity(
  items: readonly CartItem[],
  productId: number,
): number {
  return items.find((item) => item.productId === productId)?.quantity ?? 0;
}

function parseItem(raw: unknown): CartItem | null {
  if (!isRecord(raw)) return null;
  const { productId, title, price, image, category, quantity } = raw;

  if (
    typeof productId !== "number" ||
    !Number.isInteger(productId) ||
    productId <= 0 ||
    typeof title !== "string" ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0 ||
    typeof image !== "string" ||
    typeof category !== "string" ||
    typeof quantity !== "number"
  ) {
    return null;
  }

  return {
    productId,
    title,
    price,
    image,
    category,
    quantity: clampQuantity(quantity),
  };
}

/** Validates data read from localStorage. Anything invalid is dropped. */
export function parseCart(raw: unknown): CartState {
  if (!isRecord(raw) || !Array.isArray(raw.items)) return EMPTY_CART;

  const seen = new Set<number>();
  const items: CartItem[] = [];
  for (const entry of raw.items as unknown[]) {
    const item = parseItem(entry);
    if (item && !seen.has(item.productId)) {
      seen.add(item.productId);
      items.push(item);
    }
  }
  return { items };
}