'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

export default function ProductCard() {
    const IsNew : boolean = true;
    const [Click, SetClick] = useState<boolean>(false);

    const IsClicked = () => {
        SetClick(!Click);
    }

    return (
        <div className="relative pb-10 flex flex-col w-64 hover:border hover:border-foreground">
            <div className="relative object-fill overflow-hidden h-64">
              <Image src={'/products/GtaSanSkinFnG.jpeg'} alt="AdidasRunningShoes" fill 
              className="object-cover"/>
            </div>
            <h2 className="px-2 mt-3 text-xs tracking-wide text-foreground/90">SAMP</h2>
            <p className="text-sm tracking-tight px-2 mt-2">FnG SummerHouse Hustler SkinPack</p>
            <p className="text-xs px-2 mt-1 text-foreground/90 font-extralight">Rp. 180.000</p>
            <div className="absolute top-2 left-2">
              <h2 className="bg-background text-foreground px-2 py-1 tracking-tight font-light">NEW</h2>
            </div>
            <div onClick={IsClicked} className={cn(`absolute `, Click ? "top-3 right-4" : "top-2 right-3")}>
            {Click ? (
              <FaHeart className="text-background w-6 h-6 cursor-pointer"/>
            ) : (
              <CiHeart className="text-background w-8 h-8 cursor-pointer"/>
            )}
            </div>
        </div>
    )
}