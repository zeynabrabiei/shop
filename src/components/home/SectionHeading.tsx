import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SectionHeadingProps {
  id?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export function SectionHeading({
  id,
  title,
  description,
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id={id} className="text-2xl font-extrabold sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-xl text-sm leading-7 text-muted">{description}</p>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          {actionLabel}
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}