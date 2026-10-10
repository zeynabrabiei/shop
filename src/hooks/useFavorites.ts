"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { favoritesActions, favoritesStore } from "@/lib/favorites/store";
import { useHydrated } from "@/hooks/useHydrated";

export function useFavorites() {
  const state = useSyncExternalStore(
    favoritesStore.subscribe,
    favoritesStore.getSnapshot,
    favoritesStore.getServerSnapshot,
  );
  const hydrated = useHydrated();

  const idSet = useMemo(() => new Set(state.ids), [state.ids]);
  const isFavorite = useCallback((id: number) => idSet.has(id), [idSet]);

  return {
    ids: state.ids,
    count: state.ids.length,
    hydrated,
    isFavorite,
    ...favoritesActions,
  };
}