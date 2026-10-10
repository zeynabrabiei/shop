import { Brand } from "@/components/layout/Brand";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Navigation } from "@/components/layout/Navigation";
import { SearchBox } from "@/components/layout/SearchBox";
import { mainNavigation } from "@/data/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8">
        <MobileMenu />
        <Brand />
        <Navigation items={mainNavigation} className="hidden lg:block" />

        <div className="ms-auto flex items-center gap-2">
          <SearchBox className="hidden w-64 lg:block xl:w-80" />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}