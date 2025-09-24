'use client'

import { cn } from "@/lib/utils";
import { Category, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";

type ProductWithCategory = Product & {
  category: Category;
};

interface ProductCardProps {
  product: ProductWithCategory;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, price, image, IsDiscount, category, createdAt, slug } = product;
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const createdDate = new Date(createdAt); 
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - createdDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isNew = diffDays <= 14;

  const handleLikeClick = () => {
    if (isLiked) {
      toast("Product successfully removed from wishlist!");
    } else {
      toast("Product successfully added to wishlist!");
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative pb-10 flex flex-col w-64 hover:border hover:border-foreground">
      <Link href={`/product/${slug}`} className="relative object-fill overflow-hidden h-64">
        <Image src={image || '/default-image.png'} alt={name} fill className="object-cover"/>
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
      <div onClick={handleLikeClick} className={cn("absolute top-2 right-3 p-1 rounded-full", isLiked ? "bg-red-500" : "bg-black/50")}>
        {isLiked ? (
          <FaHeart className="text-white w-6 h-6 cursor-pointer"/>
        ) : (
          <CiHeart className="text-white w-6 h-6 cursor-pointer"/>
        )}
      </div>
    </div>
  );
}