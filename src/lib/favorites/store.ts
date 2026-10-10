import {
  clearFavorites,
  EMPTY_FAVORITES,
  parseFavorites,
  removeFavorite,
  toggleFavorite,
} from "@/lib/favorites/favorites";
import { createPersistentStore } from "@/lib/storage/persistent-store";
import type { FavoritesState } from "@/types/cart";

export const favoritesStore = createPersistentStore<FavoritesState>({
  key: "vitrin:favorites:v1",
  initial: EMPTY_FAVORITES,
  parse: parseFavorites,
});

export const favoritesActions = {
  toggle: (productId: number) =>
    favoritesStore.update((state) => toggleFavorite(state, productId)),
  remove: (productId: number) =>
    favoritesStore.update((state) => removeFavorite(state, productId)),
  clear: () => favoritesStore.update(clearFavorites),
} as const;