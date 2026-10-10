"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  items: readonly NavItem[];
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
  className?: string;
}

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navigation({
  items,
  orientation = "horizontal",
  onNavigate,
  className,
}: NavigationProps) {
  const pathname = usePathname();
  const vertical = orientation === "vertical";

  return (
    <nav aria-label="ناوبری اصلی" className={className}>
      <ul className={cn("flex", vertical ? "flex-col gap-1" : "items-center gap-1")}>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "font-semibold transition-colors",
                vertical
                  ? "flex items-center rounded-xl px-4 py-3 text-base text-foreground/80 hover:bg-surface-muted aria-[current=page]:bg-primary/10 aria-[current=page]:text-primary"
                  : "relative flex h-16 items-center px-3 text-sm text-foreground/70 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:text-foreground aria-[current=page]:text-primary aria-[current=page]:after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}