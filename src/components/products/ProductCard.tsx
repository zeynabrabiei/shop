import Link from "next/link";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { Price } from "@/components/products/Price";
import { ProductImage } from "@/components/products/ProductImage";
import { Rating } from "@/components/products/Rating";
import { getCategoryLabel } from "@/data/categories";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.id}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative">
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <div className="relative aspect-[4/5] bg-white">
            <div className="absolute inset-6">
              <ProductImage
                src={product.image}
                alt={product.title}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>
          </div>
        </Link>
        <FavoriteButton
          productId={product.id}
          productTitle={product.title}
          className="absolute start-3 top-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium text-primary">
          {getCategoryLabel(product.category)}
        </p>
        <h3 className="line-clamp-2 min-h-14 text-sm leading-7 font-semibold">
          <Link href={href} className="transition-colors hover:text-primary">
            {product.title}
          </Link>
        </h3>
        <Rating rate={product.rating.rate} count={product.rating.count} />

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <Price usd={product.price} />
          <AddToCartButton product={product} variant="icon" />
        </div>
      </div>
    </article>
  );
}