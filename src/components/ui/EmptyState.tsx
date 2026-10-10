import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center",
        className,
      )}
    >
      <span className="mb-6 inline-flex size-20 items-center justify-center rounded-3xl bg-surface-muted text-primary">
        <Icon className="size-9" aria-hidden="true" />
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
      {description ? (
        <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div> : null}
    </div>
  );
}