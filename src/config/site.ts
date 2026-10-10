export interface SocialLink {
  id: "email" | "github" | "linkedin" | "website";
  label: string;
  href: string;
  display: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  author: {
    name: string;
    role: string;
    tagline: string;
  };
  contacts: readonly SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "ویترین",
  tagline: "خرید آسان، انتخاب هوشمندانه",
  description:
    "ویترین یک فروشگاه اینترنتی نمایشی با تجربه‌ی خرید مدرن، جستجوی دقیق و فیلترهای کاربردی است. این پروژه برای نمونه‌کار فرانت‌اند ساخته شده و داده‌ها نمایشی هستند.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fa_IR",
  author: {
    name: "زینب ربیعی",
    role: "توسعه‌دهنده فرانت‌اند",
    tagline: "ساخت تجربه‌های دیجیتال مدرن با JavaScript، React و Next.js.",
  },
  contacts: [
    {
      id: "email",
      label: "ایمیل",
      href: "mailto:zeynabrabiei92@gmail.com",
      display: "zeynabrabiei92@gmail.com",
    },
    {
      id: "github",
      label: "گیت‌هاب",
      href: "https://github.com/zeynabrabiei",
      display: "github.com/zeynabrabiei",
    },
    {
      id: "linkedin",
      label: "لینکدین",
      href: "https://www.linkedin.com/in/zeynabrabiei",
      display: "linkedin.com/in/zeynabrabiei",
    },
    {
      id: "website",
      label: "وب‌سایت شخصی",
      href: "https://zeynabrabiei.ir",
      display: "zeynabrabiei.ir",
    },
  ],
};