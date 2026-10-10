import { PackageSearch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:py-28">
      <div className="relative mb-10 select-none" aria-hidden="true">
        <span className="absolute -start-6 -top-4 size-16 rounded-full bg-accent/30" />
        <span className="absolute -end-4 bottom-2 size-10 rounded-2xl bg-primary/15" />
        <p className="relative text-[clamp(6rem,24vw,11rem)] leading-none font-black tracking-tight text-primary">
          ۴۰۴
        </p>
        <span className="absolute inset-x-0 -bottom-5 mx-auto inline-flex size-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary shadow-card">
          <PackageSearch className="size-7" />
        </span>
      </div>

      <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
        صفحه‌ای که دنبالش بودید پیدا نشد
      </h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted sm:text-base">
        ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه دیگر وجود نداشته
        باشد. از لینک‌های زیر ادامه دهید.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonStyles({ size: "lg" })}>
          بازگشت به خانه
        </Link>
        <Link
          href="/products"
          className={buttonStyles({ size: "lg", variant: "secondary" })}
        >
          مشاهده محصولات
        </Link>
      </div>
    </section>
  );
}