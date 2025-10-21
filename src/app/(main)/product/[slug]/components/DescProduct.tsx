"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ToLocalePriceFormat } from "@/lib/utils";
import { UsecartStore } from "@/store/cart-store";
import { ProductWithUsersAndCategory } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { IoShieldSharp } from "react-icons/io5";

import WishlistButton from "@/components/sharedComponents/WhislistButton";

export default function DescProduct({products} : {products : ProductWithUsersAndCategory}) {
    const [amount, setAmount] = useState<number>(1);
    const addToCart = UsecartStore((state) => state.addToCart);
    const defaultCartState = UsecartStore((state) => state.cartItems);
    const HasProduct = defaultCartState.find((item) => item.id === products.id);
    const {data: session, status} = useSession();

    const DecreaseAmount = () => {
      if (amount >= 2){
        setAmount((prevstate) => prevstate -1);
      } 
    }
    
    useEffect(() => {
        UsecartStore.setState({amount: amount})
      }, [amount])
    
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 text-sm font-light text-blue-500 mb-2">
        <GoVerified />
        <h2>Verified Products</h2>
      </div>
      <h2 className="text-2xl font-semibold max-w-[25rem] mb-4">
        {products.name}
      </h2>
      <div className="flex justify-between gap-2 items-center">
        <div className="flex gap-2 items-center">
          <div className="relative rounded-full overflow-hidden bg-green-600 w-6 h-6">
            <Image className="object-center" src={products.Seller.image || "/user.png"} alt={products.Seller.username}
              width={40}
              height={40}/>
          </div>
          <h2 className="text-sm font-light tracking-wide">
            {products.Seller.username}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-sm font-extralight">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-xs font-extralight">(203)</p>
          <div className="w-[1px] h-4 bg-foreground"></div>
          <div className="flex items-center gap-2">
            <FaHeart className="text-sm" />
            <p className="text-xs font-extralight">(721)</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-2xl text-primary font-semibold">
        {ToLocalePriceFormat(products.price)}
      </p>
      <div className="flex items-center gap-4 mt-6">
        <p className="text-sm font-light ">Amount</p>
        <div className="flex border border-primary rounded-md w-32 h-10 items-center justify-between px-4">
          <button onClick={DecreaseAmount} className="text-xl">
            -
          </button>
          <p>{amount}</p>
          <button onClick={() => setAmount((prevState) => prevState + 1)} className="text-xl">
            +
          </button>
        </div>
      </div>
      <p className="text-xs mt-4">
        Updated price and taxes/VAT calculated at checkout
      </p>
      <div className="w-full border-t  mt-2"></div>
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex gap-2">
            <div className="flex gap-2 items-center">
              <IoShieldSharp className="w-5 h-5" />
              <p>Guaranted Return</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex">
            <p className="text-xs tracking-tight w-96">
              This assets is covered by the Belanjaorek Refund Policy Please see
              the{" "} <a href="" className="text-primary">EULA</a>{" "} for Details.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex gap-4 mt-4">
        {HasProduct ? (
          <Button className="flex items-center font-semibold text-white w-full"
          variant={"default"}>
          View In Cart
        </Button>
        ) : (
          <Button onClick={() => addToCart(products)} className="flex items-center font-semibold text-white w-full"
          variant={"default"}>
          Add to Cart
        </Button>
        )}
        
        {status === 'loading' ? (
          <Skeleton className="w-14 px-2 h-9 rounded-md"/>
        ) : (
          <WishlistButton Isabsolute={false} productId={products.id}/>
        )}
      </div>
      <div className="flex justify-between w-full mt-3 items-center">
        <p className="text-xs tracking-tight">Secure Checkout</p>
        <div className="relative w-56 h-5">
          <Image className="object-center" src={"/Payment.png"} fill alt="SummerHouse Hustlers"/>
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
  );
}
