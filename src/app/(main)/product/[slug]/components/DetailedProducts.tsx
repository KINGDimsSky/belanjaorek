"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../../components/ui/breadcrumb";
import type { Category } from "@prisma/client";
import { ProductWithUsersAndCategory } from "@/types";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { FaHeart, FaStar } from "react-icons/fa";
import { ToLocalePriceFormat } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../components/ui/accordion";
import { IoShieldSharp } from "react-icons/io5";
import { Button } from "../../../../../components/ui/button";
import { UsecartStore } from "@/store/cart-store";
import { UseWishListStore } from "@/store/wishlist-store";
import DescProductComponent from "@/app/(main)/product/[slug]/components/AboutProducts";

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
  const [amount, setAmount] = useState<number>(1)
  const addToCart = UsecartStore((state) => state.addToCart);
  const AddWishlist = UseWishListStore((state) => state.ToggleWishlist);

  const DecreaseAmount = () => {
    if (amount >= 2){
     setAmount((prevstate) => prevstate -1);
    } 
  }

  useEffect(() => {
    UsecartStore.setState({amount: amount})
  }, [amount])

  return (
    <div className="flex flex-col mt-6">
      <BreadCrumbComponent prodName={products.name} Category={products.category}/>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col">
          <div className="relative w-[35rem] h-[25rem] bg-yellow-200">
            <Image className="object-cover" 
              src={products?.image || '/NoProduct.jpg'}
              alt={products.name} fill/>
          </div>
          <DescProductComponent/>
        </div>
         <div className="flex flex-col">
            <div className="flex items-center gap-1 text-sm font-light text-blue-500 mb-2">
              <GoVerified/>
              <h2>Verified Products</h2>
            </div>
            <h2 className="text-2xl font-semibold max-w-[25rem] mb-4">{products.name}</h2>
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
            <div className="flex items-center gap-4 mt-6">
               <p className="text-sm font-light ">Amount</p>
               <div className="flex border border-primary rounded-md w-32 h-10 items-center justify-between px-4">
                  <button onClick={DecreaseAmount} className="text-xl">-</button>
                  <p>{amount}</p>
                  <button onClick={() => setAmount((prevState) => prevState + 1)} className="text-xl">+</button>
               </div>
            </div>
            <p className="text-xs mt-4">Updated price and taxes/VAT calculated at checkout</p>
            <div className="w-full border-t  mt-2"></div>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex gap-2">
                  <div className="flex gap-2 items-center">
                    <IoShieldSharp className="w-5 h-5"/>
                    <p>Guaranted Return</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex">
                  <p className="text-xs tracking-tight w-96">
                    This assets is covered by the Belanjaorek Refund Policy Please see the <a href="" className="text-primary">EULA</a> for Details.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex gap-4 mt-4">
              <Button onClick={() => addToCart(products)} className="flex items-center font-semibold text-white w-full" variant={'default'}>
                Add to Cart
              </Button>
              <Button onClick={() => AddWishlist(products)} className="border border-foreground/50" variant={'ghost'}>
                <FaHeart className="text-foreground"/>
              </Button>
            </div>
            <div className="flex justify-between w-full mt-3 items-center">
               <p className="text-xs tracking-tight">Secure Checkout</p>
               <div className="relative w-56 h-5">
                 <Image className="object-center" src={'/Payment.png'} fill alt="SummerHouse Hustlers"/>
               </div>
            </div>
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex justify-between text-xs">
                <p>Licenses Agreement</p>
                <p className="text-blue-500">Standard Belanjaorek Assets EULA</p>
              </div>
              <div className="flex justify-between text-xs">
                <p>File Size</p>
                <p>10,2 MB</p>
              </div>
              <div className="flex justify-between text-xs">
                <p>Latest Version</p>
                <p>2.1.2</p>
              </div>
              <div className="flex justify-between text-xs">
                <p>Release Date</p>
                <p>27 August, 2025</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}
