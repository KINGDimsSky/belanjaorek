"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import ProductCard from "../products/product-card";
import type {Category} from "@prisma/client";
import { ProductWithCategory } from "@/types";
import { FaFilter } from "react-icons/fa";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AllProductsProps {
  products: ProductWithCategory[];
  categories: Category[];
}

export default function AllProducts({ products, categories }: AllProductsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

 const handleFilterClick = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(filterType) === value) {
      params.delete(filterType);
    } else {
      params.set(filterType, value);
    }

    const queryString = params.toString();
    router.push(pathname + (queryString ? `?${queryString}` : ""));
  };
  
  const activeCategory = searchParams.get('category') || 'all';
  const activeSort = searchParams.get('sort');
  const discount = searchParams.get('discount');
  const SortByFilter = searchParams.get('filter');

  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between mb-12 border border-foreground/50 p-2">
        <div className="flex gap-4">
          <button onClick={() => handleFilterClick('sort', 'newest')}
            className={cn("hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer", activeSort == "newest" ? "bg-foreground text-background" : "bg-background text-foreground")}>
            Newest
          </button>
          <Select onValueChange={(value) => handleFilterClick('category', value)} value={activeCategory}>
            <SelectTrigger className={cn('flex gap-2 border-0 rounded-none hover:border hover:border-foreground/50 text-base px-2 py-1', activeCategory !== 'all' ? "bg-foreground text-background" : "bg-background text-foreground")}>
              <SelectValue placeholder="Category"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button onClick={() => handleFilterClick('discount', 'true')} className={cn("hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer", discount == "true" ? "bg-foreground text-background" : "bg-background text-foreground")}>
            Discount
          </button>
        </div>
        <div className="flex gap-4">
          <Select onValueChange={(value) => handleFilterClick('filter', value)}>
            <SelectTrigger className={cn('flex gap-2 border-0 rounded-none hover:border hover:border-foreground/50 text-base px-2 py-1', SortByFilter !== 'default' ? "bg-foreground text-background" : "bg-background text-foreground")}>
              <SelectValue placeholder="Sort By Filter"/>
              <FaFilter/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">Sort By Filter</SelectItem>
                <SelectItem value="a-z">From A To Z</SelectItem>
                <SelectItem value="z-a">From Z To A</SelectItem>
                <SelectItem value="price-high">Price High To Low</SelectItem>
                <SelectItem value="price-low">Price Low To High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product, i) => (
            <ProductCard key={i} product={product}/>
          ))
        ) : (
          <div className="col-span-5">
            <p className="text-center">Tidak ada produk yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}