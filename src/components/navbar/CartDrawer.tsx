"use client";

import { useBodyScrollLock } from "@/hooks/use-body-scroll";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface DrawerProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDrawer({ state, setState }: DrawerProps) {
  const [Cartitems, SetCartItems] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useBodyScrollLock(state);
  useOnClickOutside(ref, () => setState(false));


  useEffect(() => {
    const items = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') as string) : [];
    SetCartItems(items);
  }, [])

  return (
    <div className="fixed flex z-10 top-0 justify-end min-h-screen w-full bg-background/65">
      <div ref={ref} className="relative flex flex-col p-4 w-80 min-h-screen bg-background border border-foreground/25">
        <div className="flex justify-between p-2">
          <h2 className="font-semibold">Chart (0)</h2>
          <IoMdClose onClick={() => setState(!state)} className="text-lg cursor-pointer" />
        </div>
        {Cartitems.length === 0 ? (
          <div className="flex">
            <h2>Oops No Product Found Here!</h2>
          </div>
        ): (
          <div className="flex flex-col gap-4 ">
            {Cartitems.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <p className="text-sm">{item.name}</p>
              </div>
            ))}
          </div>
        )}
        <div className="bg-yellow-200 items-end text-foreground">
          <h2>Checkout!</h2>

        </div>
      </div>
    </div>
  );
}
