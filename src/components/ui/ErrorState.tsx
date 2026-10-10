import { RefreshCw, TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Button, buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  /** When provided, a retry button is shown. */
  onRetry?: () => void;
  showHomeLink?: boolean;
  className?: string;
}

export function ErrorState({
  title = "مشکلی پیش آمد",
  description = "بارگذاری این بخش با خطا روبه‌رو شد. لطفاً دوباره تلاش کنید.",
  onRetry,
  showHomeLink = true,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center",
        className,
      )}
    >
      <span className="mb-6 inline-flex size-20 items-center justify-center rounded-3xl bg-danger/10 text-danger">
        <TriangleAlert className="size-9" aria-hidden="true" />
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onRetry ? (
          <Button onClick={onRetry}>
            <RefreshCw className="size-4" aria-hidden="true" />
            تلاش دوباره
          </Button>
        ) : null}
        {showHomeLink ? (
          <Link href="/" className={buttonStyles({ variant: "secondary" })}>
            بازگشت به خانه
          </Link>
        ) : null}
      </div>
    </div>
  );
}