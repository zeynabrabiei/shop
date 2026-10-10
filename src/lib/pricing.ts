import { formatNumber } from "@/lib/formatters";

/**
 * Pricing configuration.
 *
 * The Fake Store API returns sample prices in USD. There is no reliable,
 * authoritative USD → toman rate, so none is hardcoded here.
 *
 * - `usdToTomanRate: null`  → prices are shown as the API's sample prices
 *   (with a "demo price" label). This is the honest default.
 * - `usdToTomanRate: <number>` → prices are converted to toman everywhere
 *   and rounded to the nearest `roundToToman`.
 *
 * Rounding policy: each unit price is converted and rounded ONCE
 * (`toDisplayPrice`). All line totals and cart totals are computed from those
 * rounded unit prices, so numbers on every screen always add up.
 */
export interface PricingConfig {
  usdToTomanRate: number | null;
  roundToToman: number;
}

export const pricingConfig: PricingConfig = {
  usdToTomanRate: null,
  roundToToman: 1000,
};

export const DEMO_PRICE_NOTICE =
  "قیمت‌ها نمایشی و بر اساس داده‌های نمونه‌ی API هستند و قیمت واقعی بازار ایران نیستند.";

function getActiveRate(): number | null {
  const rate = pricingConfig.usdToTomanRate;
  return rate !== null && Number.isFinite(rate) && rate > 0 ? rate : null;
}

export function isConversionEnabled(): boolean {
  return getActiveRate() !== null;
}

export function getPriceUnit(): string {
  return isConversionEnabled() ? "تومان" : "دلار (نمایشی)";
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Converts an API (USD) price to the value displayed and filtered by in the UI. */
export function toDisplayPrice(usd: number): number {
  const rate = getActiveRate();
  if (rate === null) return roundMoney(usd);
  const step = pricingConfig.roundToToman;
  return Math.round((usd * rate) / step) * step;
}

/** Formats an already-converted display price, e.g. «۱۰۹٫۹۵ دلار (نمایشی)». */
export function formatDisplayPrice(displayPrice: number): string {
  const digits = isConversionEnabled() ? 0 : 2;
  return `${formatNumber(displayPrice, digits)} ${getPriceUnit()}`;
}

/** Converts and formats an API (USD) price. */
export function formatPrice(usd: number): string {
  return formatDisplayPrice(toDisplayPrice(usd));
}

export function calculateLineTotal(usd: number, quantity: number): number {
  return roundMoney(toDisplayPrice(usd) * quantity);
}

export interface PricedLine {
  price: number;
  quantity: number;
}

export function calculateTotal(lines: readonly PricedLine[]): number {
  return roundMoney(
    lines.reduce(
      (sum, line) => sum + toDisplayPrice(line.price) * line.quantity,
      0,
    ),
  );
}