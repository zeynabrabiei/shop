"use client";

import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useCart } from "@/hooks/useCart";
import { getItemQuantity, MAX_QUANTITY } from "@/lib/cart/cart";
import { formatCount } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { CartProductInfo } from "@/types/cart";

interface AddToCartButtonProps {
  product: CartProductInfo;
  quantity?: number;
  variant?: "icon" | "full";
  className?: string;
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "full",
  className,
}: AddToCartButtonProps) {
  const { add, items } = useCart();
  const toast = useToast();
  const inCart = getItemQuantity(items, product.id);

  function handleClick() {
    if (inCart >= MAX_QUANTITY) {
      toast.show(
        `حداکثر تعداد مجاز برای هر محصول ${formatCount(MAX_QUANTITY)} عدد است.`,
        "info",
      );
      return;
    }
    add(product, quantity);
    toast.show("به سبد خرید اضافه شد.");
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`افزودن «${product.title}» به سبد خرید`}
        className={cn(
          "relative inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-90",
          className,
        )}
      >
        <ShoppingBag className="size-[18px]" aria-hidden="true" />
        {inCart > 0 ? (
          <span
            aria-hidden="true"
            className="absolute -end-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] leading-none font-bold text-foreground"
          >
            {formatCount(inCart)}
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <Button size="lg" onClick={handleClick} className={className}>
      <ShoppingBag className="size-5" aria-hidden="true" />
      افزودن به سبد خرید
      {inCart > 0 ? (
        <span className="text-xs font-medium opacity-80">
          ({formatCount(inCart)} در سبد)
        </span>
      ) : null}
    </Button>
  );
}