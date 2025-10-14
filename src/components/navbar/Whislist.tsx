'use client'

import { useBodyScrollLock } from "@/hooks/use-body-scroll";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { ToLocalePriceFormat } from "@/lib/utils";
import { UseWhislistStore } from "@/store/wishlist-store";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import { getWhislistProductsAction, toggleWishlistAction } from "@/lib/actions";
import { toast } from "sonner";
import { ProductWithCategory } from "@/types";

interface WhislistProps {
    state : boolean;
    setState : React.Dispatch<React.SetStateAction<boolean>>
}

export default function Whislist ({state , setState} : WhislistProps) {
    const WhislistIds = UseWhislistStore((state) => state.WhislistProductIds); 
    const [products, setProducts] = useState<ProductWithCategory[]>([]);
    const [isPending, startTransition] = useTransition();
    const ref = useRef(null);
    useBodyScrollLock(state);
    useOnClickOutside(ref, () => setState(!state));

    useEffect(() => {
      const Ids = Array.from(WhislistIds);

      startTransition(() => {
        getWhislistProductsAction(Ids).then(setProducts);
      })
      
    }, [WhislistIds])


    const HandleToggleWhislist = async (productId : string) => {
      const result = await toggleWishlistAction(productId);

      if (result.status === false) {
       return toast.error(result.message);
      }

      toast.success(result.message);
    }


    return (
        <div className="fixed flex z-10 top-0 justify-end min-h-screen w-full bg-background/65">
          <div ref={ref} className="relative flex flex-col p-4 w-80 min-h-screen bg-background border border-foreground/25">
            <div className="flex justify-between p-2">
              <h2 className="font-semibold">Wishlist ({products.length || '0'})</h2>
              <IoMdClose onClick={() => setState(!state)}  className="text-lg cursor-pointer" />
            </div>
            {products.length === 0 ? (
              <div className="flex flex-col gap-4 tracking-tight my-auto items-center">
                <h2 className="text-sm font-semibold">Oops No Product Found Here!</h2>
                <Image src={'/no-orders.png'} alt="Empty Cart" width={150} height={150} className="object-cover"/>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                {products.map((item) => (
                  <div className="flex gap-4" key={item.id}>
                    <div className="relative w-16 h-16 rounded-md">
                      <Image src={item.image || '/NoProduct.jpg'} alt={item.name} fill className="object-cover"/>
                    </div>
                    <div className="flex flex-col justify-between">
                  <p className="text-xs truncate">{item.name}</p>
                  <p className="text-sm font-semibold text-primary">{ToLocalePriceFormat(item.price)}</p>
                  <div className="flex justify-between">
                    <p className="text-xs">{item.category.title}</p>
                    <Button onClick={() => HandleToggleWhislist(item.id)}  variant={'destructive'} className="w-12 h-4 text-xs px-4 rounded-e-md">Delete</Button>
                  </div>
                </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    )
}