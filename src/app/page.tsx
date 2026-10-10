import type { Metadata } from "next";

import { BenefitsSection } from "@/components/home/BenefitsSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FinalCta } from "@/components/home/FinalCta";
import { HeroSection } from "@/components/home/HeroSection";

// Rendered per request so a temporarily unreachable API can never fail the build.
// Data is still cached for an hour by the API layer.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <BenefitsSection />
      <FinalCta />
    </>
  );
}