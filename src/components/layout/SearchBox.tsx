"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";

interface SearchBoxProps {
  className?: string;
  onSubmitted?: () => void;
}

export function SearchBox({ className, onSubmitted }: SearchBoxProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    router.push(
      query ? `/products?${new URLSearchParams({ q: query }).toString()}` : "/products",
    );
    onSubmitted?.();
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute start-3 top-1/2 size-[18px] -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="جستجوی محصولات…"
        aria-label="جستجوی محصولات"
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 w-full rounded-xl border border-border bg-surface ps-10 pe-10 text-sm text-foreground transition-colors placeholder:text-muted hover:border-primary/40 focus:border-primary [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="پاک کردن جستجو"
          className="absolute end-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </form>
  );
}