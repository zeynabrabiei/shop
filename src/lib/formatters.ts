const LOCALE = "fa-IR";

const numberFormatters = new Map<number, Intl.NumberFormat>();

function getNumberFormatter(fractionDigits: number): Intl.NumberFormat {
  let formatter = numberFormatters.get(fractionDigits);
  if (!formatter) {
    formatter = new Intl.NumberFormat(LOCALE, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    numberFormatters.set(fractionDigits, formatter);
  }
  return formatter;
}

/** Formats a number with Persian digits and a fixed number of fraction digits. */
export function formatNumber(value: number, fractionDigits = 0): string {
  return getNumberFormatter(fractionDigits).format(value);
}

/** Example: 4.1 → «۴٫۱» */
export function formatRating(rate: number): string {
  return formatNumber(rate, 1);
}

/** Example: 1200 → «۱٬۲۰۰» */
export function formatCount(count: number): string {
  return formatNumber(count, 0);
}

const dateFormatter = new Intl.DateTimeFormat(LOCALE, { dateStyle: "long" });

/** Formats a date using the Persian (Solar Hijri) calendar. */
export function formatDate(value: Date | string | number): string {
  return dateFormatter.format(new Date(value));
}