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
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import CartDrawer from "./CartDrawer";
import Whislist from "./Whislist";

export default function Navbar() {
  const [clicked, SetClicked] = useState<boolean>(false);
  const [drawer, SetDrawer] = useState<boolean>(false);
  const [whislist, SetWhislist] = useState<boolean>(false);
  const {data: session, status} = useSession();

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
             <NavigationMenuItem>
              <Link href={'/samp'} className="font-light tracking-tight hover:text-primary">SAMP</Link>
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
          {status === 'loading' ? (
            <div className="flex gap-2 items-center">
              <Skeleton className="w-24 h-4"/>
              <Skeleton className="w-9 h-9 rounded-full"/>
            </div>
          ) : (status === 'unauthenticated' ? (
            <div className="">
              <Button onClick={() => signIn()} size={'sm'} className="text-foreground">Sign In</Button>
            </div>
          ) : (
          <div onClick={() => SetClicked(!clicked)} className="flex gap-2 items-center cursor-pointer">
            <h2>{session?.user?.name}</h2>
             <div className="relative w-9 h-9 rounded-full bg-green-600 overflow-hidden object-cover">
               <Image src={session?.user.image || ''} alt="User Profile" width={200} height={200}/>
             </div>
          </div>
          ))}
          <div className="flex gap-4">
            <ShoppingCart onClick={() => SetDrawer(!drawer)} className="hover:text-primary cursor-pointer"/>
            <Heart onClick={() => SetWhislist(!whislist)} className="hover:text-primary cursor-pointer"/>
          </div>        
        </div>
        <div className="flex gap-4 lg:hidden">
          <ShoppingCart onClick={() => SetDrawer(!drawer)} className="cursor-pointer hover:text-primary duration-150 transition-all"/>
          <Heart onClick={() => SetWhislist(!whislist)} className="cursor-pointer hover:text-primary duration-150 transition-all"/>
          <Menu onClick={() => SetClicked(!clicked)} className="cursor-pointer hover:text-primary duration-150 transition-all"/>
        </div>
      </MaxWidthWrapper>
      {clicked ? (
        <MobileNav state={clicked} setState={SetClicked}/>
      ) : (
        null
      )}
      {drawer ? (
        <CartDrawer state={drawer} setState={SetDrawer}/>
      ) : (
        null
      )}
      {whislist ? (
        <Whislist state={whislist} setState={SetWhislist}/>
      ) : (
        null
      )}
    </div>
  );
}
