"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { buildProductsHref } from "@/lib/catalog/params";
import { parsePriceInput, type PriceInput } from "@/lib/catalog/price-input";
import { formatNumber } from "@/lib/formatters";
import { getPriceUnit } from "@/lib/pricing";
import type { CatalogQuery, PriceBounds } from "@/types/catalog";

interface PriceFilterProps {
  query: CatalogQuery;
  bounds: PriceBounds;
}

function toNumber(input: PriceInput): number | null {
  return input.status === "valid" ? input.value : null;
}

/**
 * The parent re-mounts this form (via `key`) whenever the price in the URL
 * changes, so the initial state below is always in sync with the URL.
 */
export function PriceFilter({ query, bounds }: PriceFilterProps) {
  const router = useRouter();
  const [min, setMin] = useState(query.minPrice === null ? "" : String(query.minPrice));
  const [max, setMax] = useState(query.maxPrice === null ? "" : String(query.maxPrice));

  const minInput = parsePriceInput(min);
  const maxInput = parsePriceInput(max);
  const minValue = toNumber(minInput);
  const maxValue = toNumber(maxInput);

  let error: string | null = null;
  if (minInput.status === "invalid" || maxInput.status === "invalid") {
    error = "لطفاً عدد معتبر وارد کنید.";
  } else if (minValue !== null && maxValue !== null && minValue > maxValue) {
    error = "حداقل قیمت نمی‌تواند از حداکثر بیشتر باشد.";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) return;
    router.push(
      buildProductsHref(query, { minPrice: minValue, maxPrice: maxValue }),
      { scroll: false },
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="از"
          inputMode="decimal"
          autoComplete="off"
          placeholder={formatNumber(bounds.min)}
          value={min}
          onChange={(event) => setMin(event.target.value)}
          aria-invalid={error ? true : undefined}
        />
        <Input
          label="تا"
          inputMode="decimal"
          autoComplete="off"
          placeholder={formatNumber(bounds.max)}
          value={max}
          onChange={(event) => setMax(event.target.value)}
          aria-invalid={error ? true : undefined}
        />
      </div>

      <p className="text-xs leading-6 text-muted">
        بازه‌ی موجود: {formatNumber(bounds.min)} تا {formatNumber(bounds.max)}{" "}
        {getPriceUnit()}
      </p>

      {error ? (
        <p role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="secondary"
        size="sm"
        fullWidth
        disabled={error !== null}
      >
        اعمال بازه‌ی قیمت
      </Button>
    </form>
  );
}