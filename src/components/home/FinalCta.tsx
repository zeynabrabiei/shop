import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-primary-deep px-6 py-14 text-center sm:px-12 sm:py-20">
        <span
          aria-hidden="true"
          className="absolute -start-10 -top-10 size-40 rounded-full bg-accent/20"
        />
        <span
          aria-hidden="true"
          className="absolute -end-8 -bottom-12 size-48 rounded-full bg-white/5"
        />
        <h2
          id="cta-heading"
          className="relative text-2xl font-extrabold text-white sm:text-4xl"
        >
          آماده‌ی کشف محصولات هستید؟
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-sm leading-8 text-white/75 sm:text-base">
          کاتالوگ کامل را مرور کنید، با فیلترها نتیجه را دقیق کنید و محصولات
          دلخواه را در سبد خرید یا علاقه‌مندی‌ها نگه دارید.
        </p>
        <Link
          href="/products"
          className={buttonStyles({
            variant: "accent",
            size: "lg",
            className: "relative mt-8",
          })}
        >
          مشاهده کاتالوگ
          <ArrowLeft className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}