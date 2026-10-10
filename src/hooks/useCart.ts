"use client";

import { useMemo, useSyncExternalStore } from "react";

import { getCartCount, getCartTotal } from "@/lib/cart/cart";
import { cartActions, cartStore } from "@/lib/cart/store";
import { useHydrated } from "@/hooks/useHydrated";

export function useCart() {
  const state = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const hydrated = useHydrated();

  const summary = useMemo(
    () => ({ count: getCartCount(state), total: getCartTotal(state) }),
    [state],
  );

  return {
    items: state.items,
    count: summary.count,
    total: summary.total,
    hydrated,
    ...cartActions,
  };
}