'use client'

import { useBodyScrollLock } from "@/hooks/use-body-scroll";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

interface WhislistProps {
    state : boolean;
    setState : React.Dispatch<React.SetStateAction<boolean>>
}

export default function Whislist ({state , setState} : WhislistProps) {
    const ref = useRef(null);
    useBodyScrollLock(state);
    useOnClickOutside(ref, () => setState(!state));

    return (
        <div className="fixed flex z-10 top-0 justify-end min-h-screen w-full bg-background/65">
          <div ref={ref} className="relative flex flex-col p-4 w-80 min-h-screen bg-background border border-foreground/25">
            <div className="flex justify-between p-2">
              <h2 className="font-semibold">Whislist Products (0)</h2>
              <IoMdClose onClick={() => setState(!state)}  className="text-lg cursor-pointer" />
            </div>
            <div className="bg-yellow-200 items-end text-foreground">
              <h2>Checkout!</h2>
            </div>
          </div>
        </div>
    )
}