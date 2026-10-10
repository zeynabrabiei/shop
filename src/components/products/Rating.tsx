import { Star } from "lucide-react";

import { formatCount, formatRating } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface RatingProps {
  rate: number;
  count: number;
  className?: string;
}

export function Rating({ rate, count, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-1.5 text-xs", className)}>
      <span className="sr-only">
        امتیاز {formatRating(rate)} از ۵ بر اساس {formatCount(count)} رأی
      </span>
      <span aria-hidden="true" className="flex items-center gap-1.5">
        <Star className="size-4 fill-accent text-accent" />
        <span className="font-semibold">{formatRating(rate)}</span>
        <span className="text-muted">({formatCount(count)} رأی)</span>
      </span>
    </div>
  );
}