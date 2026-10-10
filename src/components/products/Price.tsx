import { formatNumber } from "@/lib/formatters";
import { getPriceUnit, isConversionEnabled, toDisplayPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type PriceSize = "sm" | "md" | "lg";

const sizes: Record<PriceSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-3xl",
};

interface MoneyAmountProps {
  /** An already-converted display value (see `toDisplayPrice`). */
  value: number;
  size?: PriceSize;
  className?: string;
}

export function MoneyAmount({ value, size = "md", className }: MoneyAmountProps) {
  const digits = isConversionEnabled() ? 0 : 2;
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-1.5", className)}>
      <span className={cn("font-extrabold tabular-nums", sizes[size])}>
        {formatNumber(value, digits)}
      </span>
      <span className="text-xs text-muted">{getPriceUnit()}</span>
    </span>
  );
}

interface PriceProps {
  /** The API's original (USD) price. */
  usd: number;
  size?: PriceSize;
  className?: string;
}

export function Price({ usd, size, className }: PriceProps) {
  return <MoneyAmount value={toDisplayPrice(usd)} size={size} className={className} />;
}