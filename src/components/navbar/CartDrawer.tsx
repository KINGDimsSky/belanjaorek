"use client";

import { useBodyScrollLock } from "@/hooks/use-body-scroll";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import { UsecartStore } from "@/store/cart-store";
import { ToLocalePriceFormat } from "@/lib/utils";

interface DrawerProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDrawer({ state, setState }: DrawerProps) {
  const Initialitems = JSON.parse(localStorage.getItem('cartItems') ?? '[]') || [];
  const [Cartitems, SetCartItems] = useState<any[]>(Initialitems);
  const DeleteItem = UsecartStore((state) => state.removeFromCart)
  const ref = useRef<HTMLDivElement>(null);
  useBodyScrollLock(state);
  useOnClickOutside(ref, () => setState(false));

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(Cartitems));
  }, [Cartitems])

  


  return (
    <div className="fixed flex z-10 top-0 justify-end min-h-screen w-full bg-background/65">
      <div ref={ref} className="relative flex flex-col p-4 w-80 min-h-screen bg-background border border-foreground/25">
        <div className="flex justify-between p-2">
          <h2 className="font-semibold">Chart ({Cartitems.length})</h2>
          <IoMdClose onClick={() => setState(!state)} className="text-lg cursor-pointer" />
        </div>
        {Cartitems.length === 0 ? (
          <div className="flex">
            <h2>Oops No Product Found Here!</h2>
          </div>
        ): (
          <div className="flex flex-col gap-2 mt-2">
            {Cartitems.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <div className="relative w-16 h-16 rounded-md">
                  <Image src={item.image || ''} alt={item.name} fill className="object-cover"/>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-xs truncate">{item.name}</p>
                  <p className="text-sm font-semibold text-primary">{ToLocalePriceFormat(item.price)}</p>
                  <div className="flex justify-between">
                    <p className="text-xs">Quantity: {item.quantity}</p>
                    <Button onClick={() => DeleteItem(item.id)} variant={'destructive'} className="w-12 h-4 text-xs px-4 rounded-e-md">Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="items-end mt-auto text-foreground">
          <Button variant={'default'} className="w-full rounded-e-md text-foreground font-semibold">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
