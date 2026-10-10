import { isRecord } from "@/lib/utils";
import type { FavoritesState } from "@/types/cart";

export const EMPTY_FAVORITES: FavoritesState = { ids: [] };

export function toggleFavorite(
  state: FavoritesState,
  productId: number,
): FavoritesState {
  return state.ids.includes(productId)
    ? { ids: state.ids.filter((id) => id !== productId) }
    : { ids: [...state.ids, productId] };
}

export function removeFavorite(
  state: FavoritesState,
  productId: number,
): FavoritesState {
  return state.ids.includes(productId)
    ? { ids: state.ids.filter((id) => id !== productId) }
    : state;
}

export function clearFavorites(state: FavoritesState): FavoritesState {
  return state.ids.length === 0 ? state : EMPTY_FAVORITES;
}

/** Validates data read from localStorage. Invalid or duplicate ids are dropped. */
export function parseFavorites(raw: unknown): FavoritesState {
  if (!isRecord(raw) || !Array.isArray(raw.ids)) return EMPTY_FAVORITES;

  const ids = new Set<number>();
  for (const value of raw.ids as unknown[]) {
    if (typeof value === "number" && Number.isInteger(value) && value > 0) {
      ids.add(value);
    }
  }
  return { ids: [...ids] };
}