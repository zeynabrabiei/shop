import { ProductGrid } from "@/components/products/ProductGrid";
import { getRelatedProducts } from "@/lib/api/products";
import type { Product } from "@/types/product";

export async function RelatedProducts({ product }: { product: Product }) {
  const related = await getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-20">
      <h2 id="related-heading" className="mb-8 text-2xl font-extrabold">
        محصولات مشابه
      </h2>
      <ProductGrid products={related} />
    </section>
  );
}