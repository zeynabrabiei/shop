import Link from "next/link";

import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchasePanel } from "@/components/products/ProductPurchasePanel";
import { Price } from "@/components/products/Price";
import { Rating } from "@/components/products/Rating";
import { getCategoryLabel } from "@/data/categories";
import { buildProductsHref, DEFAULT_QUERY } from "@/lib/catalog/params";
import { DEMO_PRICE_NOTICE } from "@/lib/pricing";
import type { Product } from "@/types/product";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <article className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery src={product.image} alt={product.title} />

      <div className="flex flex-col">
        <Link
          href={buildProductsHref(DEFAULT_QUERY, { category: product.category })}
          className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
        >
          {getCategoryLabel(product.category)}
        </Link>

        <h1 className="mt-4 text-2xl leading-10 font-extrabold sm:text-3xl">
          {product.title}
        </h1>

        <Rating
          rate={product.rating.rate}
          count={product.rating.count}
          className="mt-3 text-sm"
        />

        <div className="mt-6">
          <Price usd={product.price} size="lg" />
          <p className="mt-2 text-xs leading-6 text-muted">{DEMO_PRICE_NOTICE}</p>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <ProductPurchasePanel product={product} />
        </div>

        <section className="mt-8 border-t border-border pt-8">
          <h2 className="text-base font-bold">توضیحات محصول</h2>
          <p
            dir="auto"
            className="mt-3 text-start text-sm leading-8 text-foreground/80"
          >
            {product.description}
          </p>
          <p className="mt-3 text-xs text-muted">
            توضیحات از API نمونه و به زبان اصلی نمایش داده می‌شود.
          </p>
        </section>
      </div>
    </article>
  );
}