"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import ProductCard from "../products/product-card";

import type { Product, Category } from "@prisma/client";
import { ProductWithCategory } from "@/types";

interface AllProductsProps {
  products: ProductWithCategory[];
  categories: Category[];
}

export default function AllProducts({ products, categories }: AllProductsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  
  const handleFilterClick = (filterType: string, value: string) => {
    router.push(pathname + '?' + createQueryString(filterType, value));
  };
  
  const activeCategory = searchParams.get('category') || 'all';
  const activeSort = searchParams.get('sort') || 'newest';

  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between mb-12 border border-foreground/50 p-2">
        <div className="flex gap-4">
          <button onClick={() => handleFilterClick('sort', 'newest')}
            className={cn("hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer", activeSort === 'newest' && "bg-gray-200 text-background")}>
            Newest
          </button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => handleFilterClick('category', cat.slug)}
              className={cn("hover:border px-2", activeCategory === cat.slug && "bg-gray-200 text-background")}>
              {cat.title}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <h2 className="hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer">Sort By Filters</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product, i) => (
            <ProductCard key={i} product={product}/>
          ))
        ) : (
          <p>Tidak ada produk yang ditemukan.</p>
        )}
      </div>
    </div>
  );
}