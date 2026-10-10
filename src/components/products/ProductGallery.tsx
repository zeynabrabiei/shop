import { ProductImage } from "@/components/products/ProductImage";

export function ProductGallery({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-white">
      <div className="absolute inset-8 sm:inset-12">
        <ProductImage
          src={src}
          alt={alt}
          sizes="(min-width: 1024px) 45vw, 92vw"
        />
      </div>
    </div>
  );
}