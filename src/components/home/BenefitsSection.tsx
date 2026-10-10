import { Heart, ShoppingBag, SlidersHorizontal, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/home/SectionHeading";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: readonly Benefit[] = [
  {
    icon: SlidersHorizontal,
    title: "جستجو و فیلتر دقیق",
    description:
      "با جستجو، دسته‌بندی، بازه‌ی قیمت و امتیاز، نتیجه را در چند کلیک محدود کنید.",
  },
  {
    icon: ShoppingBag,
    title: "سبد خرید همیشه همراه شما",
    description:
      "سبد خرید در مرورگر شما ذخیره می‌شود و با بستن یا تازه‌سازی صفحه از بین نمی‌رود.",
  },
  {
    icon: Heart,
    title: "علاقه‌مندی‌های ماندگار",
    description:
      "محصولات مورد علاقه را نشان‌دار کنید و هر وقت خواستید به سبد خرید ببرید.",
  },
];

export function BenefitsSection() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-6 lg:px-8"
    >
      <SectionHeading
        id="benefits-heading"
        title="تجربه‌ی خرید ساده"
        description="طراحی شده تا مرور و انتخاب محصول بی‌دردسر باشد."
      />
      <ul className="grid gap-4 md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-surface-muted text-primary">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}