"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, type ChangeEvent } from "react";

import { SORT_LABELS } from "@/data/catalog";
import { buildProductsHref } from "@/lib/catalog/params";
import { SORT_OPTIONS, type CatalogQuery } from "@/types/catalog";

export function ProductSort({ query }: { query: CatalogQuery }) {
  const router = useRouter();
  const id = useId();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const next = SORT_OPTIONS.find((option) => option === event.target.value);
    if (next) {
      router.push(buildProductsHref(query, { sort: next }), { scroll: false });
    }
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        مرتب‌سازی محصولات
      </label>
      <select
        id={id}
        value={query.sort}
        onChange={handleChange}
        className="h-11 w-full appearance-none rounded-xl border border-border bg-surface ps-4 pe-10 text-sm font-medium transition-colors hover:border-primary/40 focus:border-primary sm:w-52"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}