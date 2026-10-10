import { Globe, Heart, Mail } from "lucide-react";
import Link from "next/link";

import { Brand } from "@/components/layout/Brand";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { siteConfig, type SocialLink } from "@/config/site";
import { mainNavigation, utilityNavigation } from "@/data/navigation";
import { formatYear } from "@/lib/formatters";

const footerLinks = [...mainNavigation, ...utilityNavigation];

function ContactIcon({ id }: { id: SocialLink["id"] }) {
  const className = "size-4.5";
  switch (id) {
    case "email":
      return <Mail className={className} aria-hidden="true" />;
    case "github":
      return <GithubIcon className={className} />;
    case "linkedin":
      return <LinkedinIcon className={className} />;
    case "website":
      return <Globe className={className} aria-hidden="true" />;
  }
}

export function Footer() {
  const { author, contacts } = siteConfig;

  return (
    <footer className="mt-24 bg-primary-deep text-white/75">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Brand tone="light" />
            <p className="mt-8 text-sm font-semibold text-accent">{author.role}</p>
            <p className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">
              {author.name}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7">«{author.tagline}»</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <a
                    href={contact.href}
                    aria-label={contact.label}
                    {...(contact.id === "email"
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-white/15 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-foreground"
                  >
                    <ContactIcon id={contact.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="پیوندهای سریع" className="lg:col-span-3">
            <h2 className="text-sm font-bold text-white">دسترسی سریع</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block transition-all duration-200 hover:-translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold text-white">ارتباط با من</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <a
                    href={contact.href}
                    {...(contact.id === "email"
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/8 text-accent">
                      <ContactIcon id={contact.id} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-white/55">{contact.label}</span>
                      <span dir="ltr" className="block truncate text-start">
                        {contact.display}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-6 text-white/65">
          این فروشگاه نمایشی است و برای نمونه‌کار ساخته شده است. محصولات و قیمت‌ها
          از یک API نمونه گرفته می‌شوند و هیچ سفارش یا پرداخت واقعی ثبت نمی‌شود.
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {formatYear()} {author.name}. تمامی حقوق محفوظ است.
          </p>
          <p className="inline-flex items-center gap-1.5">
            طراحی و توسعه با
            <Heart className="size-3.5 fill-accent text-accent" aria-hidden="true" />
            <span className="sr-only">علاقه</span>
            توسط {author.name}
          </p>
        </div>
      </div>
    </footer>
  );
}