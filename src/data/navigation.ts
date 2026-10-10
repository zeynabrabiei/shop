export interface NavItem {
  href: string;
  label: string;
}

/** Primary navigation shown in the header. */
export const mainNavigation: readonly NavItem[] = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
];

/** Extra pages, shown in the mobile menu and the footer. */
export const utilityNavigation: readonly NavItem[] = [
  { href: "/favorites", label: "علاقه‌مندی‌ها" },
  { href: "/cart", label: "سبد خرید" },
];