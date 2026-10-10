import { describe, expect, it } from "vitest";

import { normalizeDigits, parsePriceInput } from "@/lib/catalog/price-input";

describe("normalizeDigits", () => {
  it("converts Persian and Arabic digits and separators", () => {
    expect(normalizeDigits("۱۲٫۵")).toBe("12.5");
    expect(normalizeDigits("١٢٣")).toBe("123");
    expect(normalizeDigits("۱٬۲۰۰")).toBe("1200");
  });
});

describe("parsePriceInput", () => {
  it("treats blank input as empty", () => {
    expect(parsePriceInput("")).toEqual({ status: "empty" });
    expect(parsePriceInput("   ")).toEqual({ status: "empty" });
  });

  it("accepts valid numbers, including Persian digits", () => {
    expect(parsePriceInput("۲۵")).toEqual({ status: "valid", value: 25 });
    expect(parsePriceInput("12.5")).toEqual({ status: "valid", value: 12.5 });
  });

  it("rejects invalid input", () => {
    expect(parsePriceInput("abc")).toEqual({ status: "invalid" });
    expect(parsePriceInput("-5")).toEqual({ status: "invalid" });
    expect(parsePriceInput("1.2.3")).toEqual({ status: "invalid" });
  });
});