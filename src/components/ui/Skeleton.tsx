import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("skeleton rounded-xl", className)} />;
}

interface SkeletonRegionProps {
  /** Announced to screen readers while content loads. */
  label: string;
  children: ReactNode;
  className?: string;
}

/** Wraps skeleton shapes so assistive tech hears one loading message. */
export function SkeletonRegion({ label, children, className }: SkeletonRegionProps) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}