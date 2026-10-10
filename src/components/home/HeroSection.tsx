import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { ProductImage } from "@/components/products/ProductImage";
import { buttonStyles } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { getFeaturedProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";

const cardPositions = [
  "start-[6%] top-[10%] w-[52%] -rotate-3",
  "end-[4%] top-[4%] w-[40%] rotate-3",
  "end-[10%] bottom-[4%] w-[42%] -rotate-1",
] as const;

function HeroDecoration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div className="absolute inset-4 rounded-[2.5rem] bg-primary/10" />
      <div className="absolute -start-2 bottom-12 size-24 rounded-full bg-accent/40" />
    </div>
  );
}

async function HeroShowcase() {
  let products: Product[];
  try {
    products = await getFeaturedProducts(3);
  } catch {
    // The hero must never break the page; it falls back to pure decoration.
    return <HeroDecoration />;
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div
        aria-hidden="true"
        className="absolute inset-4 rounded-[2.5rem] bg-primary/10"
      />
      <div
        aria-hidden="true"
        className="absolute -start-2 bottom-12 size-24 rounded-full bg-accent/40"
      />
      {products.map((product, index) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          aria-label={`مشاهده ${product.title}`}
          className={`absolute aspect-[4/5] rounded-2xl bg-white p-4 shadow-lift transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none ${cardPositions[index] ?? ""}`}
        >
          <div className="relative size-full">
            <ProductImage
              src={product.image}
              alt={product.title}
              sizes="(min-width: 1024px) 20vw, 40vw"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-surface-muted px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-primary shadow-card">
              <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
              فروشگاه نمایشی · نمونه‌کار فرانت‌اند
            </span>

            <h1
              id="hero-heading"
              className="mt-6 text-4xl leading-[1.3] font-extrabold sm:text-5xl"
            >
              خرید آسان‌تر،
              <span className="block text-primary">انتخاب هوشمندانه‌تر</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-8 text-muted">
              دسته‌بندی‌های روشن، جستجوی سریع و فیلترهای دقیق؛ تا محصول مناسب را
              در چند ثانیه پیدا کنید.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className={buttonStyles({ size: "lg" })}>
                مشاهده محصولات
                <ArrowLeft className="size-5" aria-hidden="true" />
              </Link>
              <Link
                href="#categories"
                className={buttonStyles({ size: "lg", variant: "secondary" })}
              >
                دسته‌بندی‌ها
              </Link>
            </div>
          </div>

          <Suspense
            fallback={
              <Skeleton className="mx-auto aspect-square w-full max-w-md rounded-[2.5rem]" />
            }
          >
            <HeroShowcase />
          </Suspense>
        </div>
      </div>
    </section>
  );
}