"use client";

import { SlidersHorizontal } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { formatCount } from "@/lib/formatters";

interface MobileFiltersProps {
  total: number;
  activeCount: number;
  children: ReactNode;
}

export function MobileFilters({ total, activeCount, children }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold transition-colors hover:border-primary/40 lg:hidden"
      >
        <SlidersHorizontal className="size-[18px]" aria-hidden="true" />
        فیلترها
        {activeCount > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] leading-none font-bold">
            {formatCount(activeCount)}
          </span>
        ) : null}
      </button>

      <Drawer open={open} onClose={close} title="فیلترها">
        {children}
        <div className="sticky -bottom-5 -mx-5 mt-8 border-t border-border bg-background p-4">
          <Button fullWidth size="lg" onClick={close}>
            مشاهده {formatCount(total)} محصول
          </Button>
        </div>
      </Drawer>
    </>
  );
}