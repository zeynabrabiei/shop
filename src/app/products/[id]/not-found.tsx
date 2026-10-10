import { PackageSearch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonStyles } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "محصول پیدا نشد",
};

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <EmptyState
        icon={PackageSearch}
        title="این محصول پیدا نشد"
        description="شناسه‌ی محصول معتبر نیست یا این محصول دیگر در دسترس نیست."
        action={
          <>
            <Link href="/products" className={buttonStyles()}>
              مشاهده همه محصولات
            </Link>
            <Link href="/" className={buttonStyles({ variant: "secondary" })}>
              بازگشت به خانه
            </Link>
          </>
        }
      />
    </div>
  );
}