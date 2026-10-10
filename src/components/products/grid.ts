import { cn } from "@/lib/utils";

/** Shared by ProductGrid and its skeleton so loading never shifts the layout. */
export function getProductGridClassName(dense = false): string {
  return cn(
    "grid grid-cols-2 gap-4",
    dense ? "md:grid-cols-3 lg:gap-5" : "sm:grid-cols-3 lg:grid-cols-4 lg:gap-6",
  );
}