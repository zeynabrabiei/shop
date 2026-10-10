import { describe, expect, it } from "vitest";

import {
  addToCart,
  clearCart,
  decrementQuantity,
  EMPTY_CART,
  getCartCount,
  getCartTotal,
  incrementQuantity,
  MAX_QUANTITY,
  parseCart,
  removeFromCart,
  setQuantity,
} from "@/lib/cart/cart";
import {
  EMPTY_FAVORITES,
  parseFavorites,
  toggleFavorite,
} from "@/lib/favorites/favorites";
import type { CartProductInfo } from "@/types/cart";

const shirt: CartProductInfo = {
  id: 1,
  title: "Shirt",
  price: 10.5,
  image: "/a.png",
  category: "men's clothing",
};
const ring: CartProductInfo = {
  id: 2,
  title: "Ring",
  price: 3.25,
  image: "/b.png",
  category: "jewelery",
};

describe("cart", () => {
  it("adds items and merges duplicates", () => {
    let state = addToCart(EMPTY_CART, shirt);
    state = addToCart(state, shirt);
    expect(state.items).toHaveLength(1);
    expect(state.items[0]?.quantity).toBe(2);
  });

  it("clamps quantity to the allowed range", () => {
    let state = addToCart(EMPTY_CART, shirt, 500);
    expect(state.items[0]?.quantity).toBe(MAX_QUANTITY);
    state = setQuantity(state, 1, -4);
    expect(state.items[0]?.quantity).toBe(1);
  });

  it("increments, and decrements but never below 1", () => {
    let state = addToCart(EMPTY_CART, shirt);
    state = incrementQuantity(state, 1);
    expect(state.items[0]?.quantity).toBe(2);
    state = decrementQuantity(decrementQuantity(state, 1), 1);
    expect(state.items[0]?.quantity).toBe(1);
  });

  it("removes and clears", () => {
    let state = addToCart(addToCart(EMPTY_CART, shirt), ring);
    state = removeFromCart(state, 1);
    expect(state.items.map((i) => i.productId)).toEqual([2]);
    expect(clearCart(state)).toEqual(EMPTY_CART);
  });

  it("computes count and total", () => {
    let state = addToCart(EMPTY_CART, shirt, 2);
    state = addToCart(state, ring);
    expect(getCartCount(state)).toBe(3);
    expect(getCartTotal(state)).toBe(24.25);
  });

  it("returns the same state object when nothing changes", () => {
    const state = addToCart(EMPTY_CART, shirt);
    expect(removeFromCart(state, 99)).toBe(state);
    expect(decrementQuantity(state, 1)).toBe(state);
  });

  it("parses stored data defensively", () => {
    expect(parseCart("nonsense")).toEqual(EMPTY_CART);
    expect(parseCart({ items: "x" })).toEqual(EMPTY_CART);

    const parsed = parseCart({
      items: [
        { productId: 1, title: "A", price: 5, image: "i", category: "c", quantity: 500 },
        { productId: 1, title: "dup", price: 5, image: "i", category: "c", quantity: 1 },
        { productId: "x", title: "bad" },
      ],
    });
    expect(parsed.items).toHaveLength(1);
    expect(parsed.items[0]?.quantity).toBe(MAX_QUANTITY);
  });
});

describe("favorites", () => {
  it("toggles on and off", () => {
    const added = toggleFavorite(EMPTY_FAVORITES, 3);
    expect(added.ids).toEqual([3]);
    expect(toggleFavorite(added, 3).ids).toEqual([]);
  });

  it("parses stored data defensively", () => {
    expect(parseFavorites(null)).toEqual(EMPTY_FAVORITES);
    expect(parseFavorites({ ids: [1, 1, 2.5, "3", -1, 4] }).ids).toEqual([1, 4]);
  });
});