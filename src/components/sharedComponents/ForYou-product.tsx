"use client";

import Link from "next/link";
import ProductCard from "../products/product-card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Data = [
  { name: "New Arrivals", slug: "all" },
  { name: "Unity Assets", slug: "unity-assets" },
  { name: "SAMP", slug: "samp" },
  { name: "Icons", slug: "icons" },
  { name: "Design", slug: "design" },
];

export default function ForYouProduct() {
  const [CategoryFilter, SetCategoryFilter] = useState<string>("all");
  const [Product, SetProduct] = useState<any[]>([]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const res = await fetch(`/api/productbyfilter?category=${CategoryFilter}`);
        const data = await res.json();
        SetProduct(data.data);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      }
    };
    fetchFilteredProducts();
  }, [CategoryFilter]);

  const HandleClicker = (category: string) => {
    SetCategoryFilter(category);
  };

  return (
    <div className="flex flex-col w-full mb-12">
      <div className="flex justify-between">
        <div className="flex gap-4">
          {Data.map((data) => (
            <h2 key={data.name} onClick={() => HandleClicker(data.slug)}
              className={cn(
                "py-1 px-2  font-medium tracking-tight text-xs border border-foreground cursor-pointer",
                CategoryFilter == data.slug
                  ? "bg-foreground text-background" : "hover:bg-foreground hover:text-background")}>
              {data.name}
            </h2>
          ))}
        </div>
        <Link href={"/products"} className="uppercase underline font-semibold cursor-pointer">
          View all
        </Link>
      </div>
      <div className="mt-12">
        <div>
          {Product.length === 0 ? (
            <h2 className="text-center text-lg font-light tracking-tight mt-12">No Products Found!</h2>
          ) : (
            <div>
              {Product.map((product, idx) => (
                <ProductCard key={idx} product={product}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
