import {
  addToCart,
  clearCart,
  decrementQuantity,
  EMPTY_CART,
  incrementQuantity,
  parseCart,
  removeFromCart,
  setQuantity,
} from "@/lib/cart/cart";
import { createPersistentStore } from "@/lib/storage/persistent-store";
import type { CartProductInfo, CartState } from "@/types/cart";

export const cartStore = createPersistentStore<CartState>({
  key: "vitrin:cart:v1",
  initial: EMPTY_CART,
  parse: parseCart,
});

/** Stable action functions, safe to use from any client component. */
export const cartActions = {
  add: (product: CartProductInfo, quantity = 1) =>
    cartStore.update((state) => addToCart(state, product, quantity)),
  remove: (productId: number) =>
    cartStore.update((state) => removeFromCart(state, productId)),
  setQuantity: (productId: number, quantity: number) =>
    cartStore.update((state) => setQuantity(state, productId, quantity)),
  increment: (productId: number) =>
    cartStore.update((state) => incrementQuantity(state, productId)),
  decrement: (productId: number) =>
    cartStore.update((state) => decrementQuantity(state, productId)),
  clear: () => cartStore.update(clearCart),
} as const;