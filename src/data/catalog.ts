import type { SortOption } from "@/types/catalog";

export const SORT_LABELS: Readonly<Record<SortOption, string>> = {
  recommended: "پیشنهادی",
  "price-asc": "ارزان‌ترین",
  "price-desc": "گران‌ترین",
  rating: "بیشترین امتیاز",
  reviews: "بیشترین رأی",
  title: "الفبایی (A–Z)",
};