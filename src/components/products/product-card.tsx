'use client'

import { ProductWithCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import WhislistButton from "../sharedComponents/WhislistButton";
import { useMemo } from "react";

export default function ProductCard({ product } : {product : ProductWithCategory}) {
  const { name, price, MainImage, IsDiscount, category, createdAt, slug, id} = product;

  const isNew = useMemo(() => {
    const createdDate = new Date(createdAt); 
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 14
  }, [product.createdAt])


  return (
    <div className="relative pb-10 flex flex-col w-64 hover:border hover:border-foreground">
      <Link href={`/product/${slug}`} className="relative object-fill overflow-hidden h-64">
        <Image src={MainImage || '/default-image.png'} alt={name} fill className="object-cover"/>
      </Link>
      <Link href={`/products?category=${category.slug}`} className="hover:text-primary px-2 mt-3 text-xs tracking-wide text-foreground/90">{category.title}</Link>
      <Link href={`/product/${slug}`} className="text-sm tracking-tight px-2 mt-2 hover:text-foreground/85">{name}</Link>
      <p className="text-xs px-2 mt-1 text-foreground/90 font-extralight">
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(price)}
      </p>
      {isNew && (
        <div className="absolute top-2 left-2">
          <h2 className="bg-foreground text-background px-2 py-1 tracking-tight font-light">NEW</h2>
        </div>
      )}
      <WhislistButton Isabsolute productId={product.id}/>
    </div>
  );
}