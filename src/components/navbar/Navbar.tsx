"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Heart, Menu, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full justify-between items-center">
      <MaxWidthWrapper className="flex justify-between items-center py-4">
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-2xl rounded-full py-1 px-3 bg-primary">B</h2>
            <Link href={"/"} className="text-3xl font-bold tracking-tighter">Belanjaorek</Link>
          </div>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-2 items-center">
             <NavigationMenuItem asChild>
               <Link href={"/blog"} className="font-light tracking-tight hover:text-primary">Blog</Link>
             </NavigationMenuItem>
             <NavigationMenuItem>
               <NavigationMenuTrigger className="tracking-tight font-light px-1">Category</NavigationMenuTrigger>
               <NavigationMenuContent className="flex p-4 w-64 bg-gray-300">
                 <div className="w-24 p-4">
                    <h2>Category ne rek</h2>
                 </div>
               </NavigationMenuContent>
             </NavigationMenuItem>
             <NavigationMenuItem asChild>
                <Link href={'/about'} className="font-light tracking-tight hover:text-primary">About</Link>
             </NavigationMenuItem>
             <NavigationMenuItem asChild>
                <Link href={'/store'} className="font-light tracking-tight hover:text-primary">Marketplace</Link>
             </NavigationMenuItem>
           </NavigationMenuList>
         </NavigationMenu>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-2 items-center cursor-pointer">
            <h2>KINGDimsSky</h2>
             <div className="rounded-full py-2 px-4 bg-green-600">
               <h2>b</h2>
             </div>
          </div>
          <div className="flex gap-4">
            <ShoppingCart className="hover:text-primary cursor-pointer"/>
            <Heart className="hover:text-primary cursor-pointer"/>
          </div>        
        </div>
        <div className="flex gap-4 lg:hidden">
          <ShoppingCart/>
          <Heart/>
          <Menu className="cursor-pointer hover:text-primary duration-150 transition-all"/>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
