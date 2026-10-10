"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/ui/ErrorState";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ErrorState
        title="بارگذاری محصولات ممکن نشد"
        description="ارتباط با منبع داده برقرار نشد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید."
        onRetry={reset}
      />
    </div>
  );
}