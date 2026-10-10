"use client";

import { Minus, Plus } from "lucide-react";

import { MAX_QUANTITY, MIN_QUANTITY } from "@/lib/cart/cart";
import { formatCount } from "@/lib/formatters";

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

const buttonClass =
  "inline-flex size-11 items-center justify-center text-foreground/80 transition-colors hover:bg-surface-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

export function QuantitySelector({
  value,
  onChange,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
  label = "تعداد",
}: QuantitySelectorProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center overflow-hidden rounded-xl border border-border bg-surface"
    >
      <button
        type="button"
        onClick={() => onChange(Math.min(value + 1, max))}
        disabled={value >= max}
        aria-label="افزایش تعداد"
        className={buttonClass}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
      <output
        aria-live="polite"
        className="min-w-12 text-center text-sm font-semibold tabular-nums"
      >
        {formatCount(value)}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.max(value - 1, min))}
        disabled={value <= min}
        aria-label="کاهش تعداد"
        className={buttonClass}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}