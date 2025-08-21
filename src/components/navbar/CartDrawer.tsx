"use client";

import { useBodyScrollLock } from "@/hooks/use-body-scroll";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

interface DrawerProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDrawer({ state, setState }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null);
  useBodyScrollLock(state);
  useOnClickOutside(ref, () => setState(false))

  return (
    <div className="fixed flex z-10 top-0 justify-end min-h-screen w-full bg-background/65">
      <div ref={ref} className="relative flex flex-col p-4 w-80 min-h-screen bg-background border border-foreground/25">
        <div className="flex justify-between p-2">
          <h2 className="font-semibold">Chart (0)</h2>
          <IoMdClose onClick={() => setState(!state)} className="text-lg cursor-pointer" />
        </div>
        <div className="bg-yellow-200 items-end text-foreground">
          <h2>Checkout!</h2>
    
        </div>
      </div>
    </div>
  );
}
