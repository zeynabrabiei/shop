"use client";

import { useState } from "react";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { QuantitySelector } from "@/components/cart/QuantitySelector";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { Product } from "@/types/product";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">تعداد</span>
        <QuantitySelector value={quantity} onChange={setQuantity} />
      </div>
      <div className="flex gap-3">
        <AddToCartButton product={product} quantity={quantity} className="flex-1" />
        <FavoriteButton
          productId={product.id}
          productTitle={product.title}
          variant="outline"
        />
      </div>
    </div>
  );
}