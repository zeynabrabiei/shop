"use client";

import { Heart, ShoppingBag, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { formatCount } from "@/lib/formatters";

interface HeaderIconLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  count: number;
}

function HeaderIconLink({ href, label, icon: Icon, count }: HeaderIconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={count > 0 ? `${label}، ${formatCount(count)} مورد` : label}
      className="relative inline-flex size-11 items-center justify-center rounded-xl text-foreground/80 transition-colors hover:bg-surface-muted hover:text-foreground"
    >
      <Icon className="size-5.5" aria-hidden="true" />
      {count > 0 ? (
        <span
          key={count}
          aria-hidden="true"
          className="badge-pop absolute inset-e-1 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] leading-none font-bold text-foreground"
        >
          {count > 99 ? "+۹۹" : formatCount(count)}
        </span>
      ) : null}
    </Link>
  );
}

export function HeaderActions() {
  const { count: cartCount } = useCart();
  const { count: favoritesCount } = useFavorites();

  return (
    <div className="flex items-center gap-1">
      <HeaderIconLink
        href="/favorites"
        label="علاقه‌مندی‌ها"
        icon={Heart}
        count={favoritesCount}
      />
      <HeaderIconLink
        href="/cart"
        label="سبد خرید"
        icon={ShoppingBag}
        count={cartCount}
      />
    </div>
  );
}