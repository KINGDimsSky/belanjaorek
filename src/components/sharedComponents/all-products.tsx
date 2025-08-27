"use client";

import { useState } from "react";
import ProductCard from "../products/product-card";

export default function AllProducts() {
  const [Products, SetProducts] = useState<any[]>([]);
  const [Active, SetActive] = useState<boolean>(false);
  const [Newest, SetNewest] = useState<boolean>(false);

  

  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between mb-12 border border-foreground/50 p-2">
        <div className="flex gap-4">
          <h2 className="hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer">Newest</h2>
          <h2 className="hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer">Discount</h2>
          <h2 className="hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer">Product Type</h2>
        </div>
        <div className="flex gap-4">
          <h2 className="hover:border hover:border-foreground/50 px-2 py-1 cursor-pointer">Sort By Filters</h2>
        </div>
      </div>
      <ProductCard />
    </div>
  );
}
