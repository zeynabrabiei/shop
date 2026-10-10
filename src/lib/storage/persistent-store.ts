export interface PersistentStore<T> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  update: (updater: (current: T) => T) => void;
}

interface PersistentStoreOptions<T> {
  key: string;
  initial: T;
  /** Validates untrusted stored data and returns a safe state. */
  parse: (raw: unknown) => T;
}

/**
 * A tiny external store backed by localStorage, designed for
 * `useSyncExternalStore`:
 * - The server (and the first client render) always see `initial`,
 *   so there are no hydration mismatches.
 * - Corrupted or unavailable storage falls back to `initial`.
 * - Changes made in other tabs are picked up via the `storage` event.
 */
export function createPersistentStore<T>({
  key,
  initial,
  parse,
}: PersistentStoreOptions<T>): PersistentStore<T> {
  let cache = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  function readFromStorage(): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initial : parse(JSON.parse(raw) as unknown);
    } catch {
      return initial;
    }
  }

  function load(): void {
    if (loaded || typeof window === "undefined") return;
    cache = readFromStorage();
    loaded = true;
  }

  function emit(): void {
    listeners.forEach((listener) => listener());
  }

  function handleStorageEvent(event: StorageEvent): void {
    if (event.key !== null && event.key !== key) return;
    cache = readFromStorage();
    loaded = true;
    emit();
  }

  return {
    subscribe(listener) {
      if (listeners.size === 0) {
        window.addEventListener("storage", handleStorageEvent);
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener("storage", handleStorageEvent);
        }
      };
    },

    getSnapshot() {
      load();
      return cache;
    },

    getServerSnapshot() {
      return initial;
    },

    update(updater) {
      load();
      const next = updater(cache);
      if (next === cache) return;
      cache = next;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Storage unavailable (private mode, quota): keep state in memory only.
      }
      emit();
    },
  };
}