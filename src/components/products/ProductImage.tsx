"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

/** Fills its (relatively positioned) parent; shows a placeholder if loading fails. */
export function ProductImage({ src, alt, sizes, className }: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex size-full items-center justify-center rounded-xl bg-surface-muted text-muted"
      >
        <ImageOff className="size-8" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      onError={() => setFailedSrc(src)}
      className={cn("object-contain", className)}
    />
  );
}