"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { useDebouncedCallback } from "@/hooks/useDebounce";
import { buildProductsHref } from "@/lib/catalog/params";
import type { CatalogQuery } from "@/types/catalog";

const SEARCH_DEBOUNCE_MS = 350;

export function ProductSearch({ query }: { query: CatalogQuery }) {
  const router = useRouter();
  const [draft, setDraft] = useState<string | null>(null);
  const [lastPushed, setLastPushed] = useState<string | null>(null);
  const [seenQuery, setSeenQuery] = useState(query.q);

  // The URL changed from outside (e.g. "clear all filters"): drop the local draft.
  if (query.q !== seenQuery) {
    setSeenQuery(query.q);
    if (query.q !== lastPushed) setDraft(null);
  }

  const value = draft ?? query.q;

  const navigate = (q: string) => {
    setLastPushed(q);
    router.replace(buildProductsHref(query, { q }), { scroll: false });
  };
  const debouncedNavigate = useDebouncedCallback(navigate, SEARCH_DEBOUNCE_MS);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraft(event.target.value);
    debouncedNavigate(event.target.value.trim());
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    debouncedNavigate.cancel();
    navigate(value.trim());
  }

  function handleClear() {
    setDraft("");
    debouncedNavigate.cancel();
    navigate("");
  }

  return (
    <form
      role="search"
      aria-label="جستجو در محصولات"
      onSubmit={handleSubmit}
      className="relative flex-1"
    >
      <Search
        className="pointer-events-none absolute start-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder="جستجو در عنوان و توضیحات محصولات…"
        aria-label="عبارت جستجو"
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 w-full rounded-xl border border-border bg-surface ps-11 pe-11 text-sm transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="پاک کردن جستجو"
          className="absolute end-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </form>
  );
}