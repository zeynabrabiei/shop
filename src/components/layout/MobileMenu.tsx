"use client";

import { Menu } from "lucide-react";
import { useCallback, useState } from "react";

import { Navigation } from "@/components/layout/Navigation";
import { SearchBox } from "@/components/layout/SearchBox";
import { Drawer } from "@/components/ui/Drawer";
import { mainNavigation, utilityNavigation } from "@/data/navigation";

const items = [...mainNavigation, ...utilityNavigation];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="باز کردن منو"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex size-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-surface-muted lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      <Drawer open={open} onClose={close} title="منو">
        <SearchBox onSubmitted={close} />
        <Navigation
          items={items}
          orientation="vertical"
          onNavigate={close}
          className="mt-6"
        />
      </Drawer>
    </>
  );
}