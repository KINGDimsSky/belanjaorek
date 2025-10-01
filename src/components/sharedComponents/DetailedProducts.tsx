"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import type { Category } from "@prisma/client";
import { ProductWithUsersAndCategory } from "@/types";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { FaHeart, FaStar } from "react-icons/fa";
import { ToLocalePriceFormat } from "@/lib/utils";
import { Badge } from "../ui/badge";


function BreadCrumbComponent({ prodName, Category } : {prodName ?: string, Category?: Category}) {
  return (
    <div className="flex">
      <Breadcrumb>
        <BreadcrumbList className="text-xs">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={"/"}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/products/?category=${Category?.slug}`}>{Category?.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <p className="text-foreground">{prodName}</p>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default function DetailedProductComponent({ products } : {products : ProductWithUsersAndCategory}) {
  console.log (products)

  return (
    <div className="flex flex-col mt-6">
      <BreadCrumbComponent prodName={products.name} Category={products.category}/>
      <div className="flex gap-6 mt-6">
         <div className="relative w-[35rem] h-[25rem] bg-yellow-200">
            <Image className="object-cover" 
            src={products?.image || '/NoProduct.jpg'}
            alt={products.name} fill/>
         </div>
         <div className="flex flex-col">
            <div className="flex items-center gap-1 text-sm font-light text-blue-500 mb-2">
              <GoVerified/>
              <h2>Verified Products</h2>
            </div>
            <h2 className="text-xl font-medium max-w-[25rem] mb-4">{products.name}</h2>
            <div className="flex justify-between gap-2 items-center">
              <div className="flex gap-2 items-center">
                <div className="relative rounded-full overflow-hidden bg-green-600 w-6 h-6">
                  <Image className="object-center " 
                  src={products.Seller.image || '/user.png'} alt={products.Seller.username}
                  width={40} height={40}/>
                </div>
                <h2 className="text-sm font-light tracking-wide">{products.Seller.username}</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-sm font-extralight">
                  {Array.from({length: 5}).map((_, i) => (
                  <FaStar key={i}/>
                  ))}
                </div>
                <p className="text-xs font-extralight">(203)</p>
                <div className="w-[1px] h-4 bg-foreground"></div>
                <div className="flex items-center gap-2">
                  <FaHeart className="text-sm"/>
                  <p className="text-xs font-extralight">(721)</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-2xl text-primary font-semibold">{ToLocalePriceFormat(products.price)}</p>
            <div className="flex gap-2 mt-6">
               <p className="text-sm font-light ">Amount</p>
            </div>
         </div>
      </div>
    </div>
  );
}
