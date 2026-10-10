import { getProductGridClassName } from "@/components/products/grid";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: readonly Product[];
  /** Use next to the filter sidebar. */
  dense?: boolean;
}

export function ProductGrid({ products, dense = false }: ProductGridProps) {
  return (
    <ul className={getProductGridClassName(dense)}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}