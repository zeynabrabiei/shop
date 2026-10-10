const CATEGORY_LABELS: Readonly<Record<string, string>> = {
  electronics: "لوازم دیجیتال",
  jewelery: "زیورآلات",
  "men's clothing": "پوشاک مردانه",
  "women's clothing": "پوشاک زنانه",
};

/** Returns a Persian label, falling back to the raw API value for unknown categories. */
export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}