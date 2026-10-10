import type { Product } from "@/types/product";

/** The product fields a cart needs to render without refetching. */
export type CartProductInfo = Pick<
  Product,
  "id" | "title" | "price" | "image" | "category"
>;

export interface CartItem {
  productId: number;
  title: string;
  /** Price in the API's original currency (USD sample price). */
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface FavoritesState {
  ids: number[];
}