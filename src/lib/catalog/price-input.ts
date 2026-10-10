const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** Converts Persian/Arabic digits and separators to a plain numeric string. */
export function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹٠-٩]/g, (char) => {
      const persian = PERSIAN_DIGITS.indexOf(char);
      return String(persian >= 0 ? persian : ARABIC_DIGITS.indexOf(char));
    })
    .replace(/[٬,،]/g, "")
    .replace(/٫/g, ".");
}

export type PriceInput =
  | { status: "empty" }
  | { status: "valid"; value: number }
  | { status: "invalid" };

export function parsePriceInput(raw: string): PriceInput {
  const text = normalizeDigits(raw).trim();
  if (text === "") return { status: "empty" };
  if (!/^\d+(\.\d+)?$/.test(text)) return { status: "invalid" };
  return { status: "valid", value: Number(text) };
}