import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandProps {
  tone?: "dark" | "light";
  className?: string;
}

export function Brand({ tone = "dark", className }: BrandProps) {
  const isDark = tone === "dark";
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}، صفحه اصلی`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-xl",
          isDark ? "bg-primary text-primary-foreground" : "bg-accent text-foreground",
        )}
      >
        <ShoppingBag className="size-5" aria-hidden="true" />
      </span>
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight",
          isDark ? "text-foreground" : "text-white",
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}