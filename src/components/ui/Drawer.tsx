"use client";

import { X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Drawer({ open, onClose, title, children, className }: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    // A click on the backdrop targets the <dialog> element itself.
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleDialogClick}
      className={cn(
        "drawer fixed inset-y-0 inset-s-0-0 inset-e-auto m-0 h-dvh max-h-none w-[min(22rem,88vw)] max-w-none bg-background p-0 text-foreground shadow-lift backdrop:bg-foreground/40",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <h2 id={titleId} className="text-base font-bold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="inline-flex size-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </dialog>
  );
}