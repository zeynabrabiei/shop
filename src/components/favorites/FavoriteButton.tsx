"use client";

import { Heart } from "lucide-react";

import { useToast } from "@/components/ui/Toast";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  productId: number;
  productTitle: string;
  variant?: "overlay" | "outline";
  className?: string;
}

const variants = {
  overlay:
    "size-10 rounded-full bg-surface/95 shadow-card hover:bg-surface hover:shadow-lift",
  outline:
    "size-12 rounded-xl border border-border bg-surface hover:border-danger/40 hover:bg-danger/5",
} as const;

export function FavoriteButton({
  productId,
  productTitle,
  variant = "overlay",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const toast = useToast();
  const active = isFavorite(productId);

  function handleClick() {
    toggle(productId);
    if (active) {
      toast.show("از علاقه‌مندی‌ها حذف شد.", "info");
    } else {
      toast.show("به علاقه‌مندی‌ها اضافه شد.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={`افزودن «${productTitle}» به علاقه‌مندی‌ها`}
      className={cn(
        "inline-flex items-center justify-center text-foreground/70 transition-all duration-200 active:scale-90",
        variants[variant],
        className,
      )}
    >
      <Heart
        className={cn(
          "size-5 transition-colors",
          active && "fill-danger text-danger",
        )}
        aria-hidden="true"
      />
    </button>
  );
}