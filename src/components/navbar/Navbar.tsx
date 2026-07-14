"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Heart, Menu, ShoppingCart } from "lucide-react";
import MobileNav from "./MobileNav";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import CartDrawer from "./CartDrawer";
import Whislist from "./Whislist";
import { UseGlobalNavigationState } from "@/store/global-navigation-state";
import { UseWhislistStore } from "@/store/wishlist-store";
import { UsecartStore } from "@/store/cart-store";

export default function Navbar() {
  const NavigationState = UseGlobalNavigationState(state => state.navigationBarState);
  const NavigationToggle = UseGlobalNavigationState(state => state.ToggleNavigation);
  const CartState = UseGlobalNavigationState(state => state.CartState)
  const CartDrawerToggle = UseGlobalNavigationState(state => state.ToggleCartState);
  const WhislistState = UseGlobalNavigationState(state => state.whislistState);
  const WhislistToggle = UseGlobalNavigationState(state => state.ToggleWhislistState);
  const {data: session, status} = useSession();

  const WhislistIds = UseWhislistStore((state) => state.WhislistProductIds);
  const TotalWhistlistItems = Array.from(WhislistIds).length;

  const CartsIds = UsecartStore((state) => state.cartItems);
  const TotalCartsItems = CartsIds.length;

  return (
    <div className="w-full justify-between items-center">
      <MaxWidthWrapper className="flex justify-between items-center py-4">
        <div className="flex gap-10">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-2xl rounded-full py-1 px-3 bg-primary">B</h2>
            <Link href={"/"} className="text-3xl font-bold tracking-tighter">Belanjaorek</Link>
          </div>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-2 items-center text-sm">
             <NavigationMenuItem>
              <Link href={'/products'} className="font-light tracking-tight hover:text-primary">Products</Link>
             </NavigationMenuItem>
             <NavigationMenuItem asChild>
                <Link href={'/about'} className="font-light tracking-tight hover:text-primary">About</Link>
             </NavigationMenuItem>
             <NavigationMenuItem asChild>
                <Link href={'/dashboard'} className="font-light tracking-tight hover:text-primary">Dashboard</Link>
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
          <div onClick={() => NavigationToggle()} className="flex gap-2 items-center cursor-pointer">
            <h2>{session?.user?.name}</h2>
             <div className="relative w-9 h-9 rounded-full bg-green-600 overflow-hidden object-cover">
               <Image src={session?.user.image || ''} alt="User Profile" width={200} height={200}/>
             </div>
          </div>
          ))}
          <div className="flex gap-4">
            {TotalCartsItems ? (
              <div className="flex "> 
               <div className="relative -mr-3 top-2 left-5 text-center rounded-full w-4 h-4 text-xs bg-pink-600 text-white">
                 <h2>{TotalCartsItems}</h2>
               </div>
              <ShoppingCart onClick={() => CartDrawerToggle()} className="hover:text-primary cursor-pointer"/>
             </div>
            ) : (
              <ShoppingCart onClick={() => CartDrawerToggle()} className="hover:text-primary cursor-pointer"/>
            )}
            {TotalWhistlistItems ? (
             <div className="flex "> 
               <div className="relative -mr-3 top-2 left-5 text-center rounded-full w-4 h-4 text-xs bg-pink-600 text-white">
                 <h2>{TotalWhistlistItems}</h2>
               </div>
               <Heart onClick={() => WhislistToggle()} className="hover:text-primary cursor-pointer"/>
             </div>
            ) : (
              <Heart onClick={() => WhislistToggle()} className="hover:text-primary cursor-pointer"/>
            )}
          </div>        
        </div>
        <div className="flex gap-4 lg:hidden">
          <ShoppingCart onClick={() => CartDrawerToggle()} className="cursor-pointer hover:text-primary duration-150 transition-all"/>
          <Heart onClick={() => WhislistToggle()} className="cursor-pointer hover:text-primary duration-150 transition-all"/>
          <Menu onClick={() => NavigationToggle()} className="cursor-pointer hover:text-primary duration-150 transition-all"/>
        </div>
      </MaxWidthWrapper>
      {NavigationState ? (
        <MobileNav state={NavigationState} setState={NavigationToggle}/>
      ) : (
        null
      )}
      {CartState ? (
        <CartDrawer state={CartState} setState={CartDrawerToggle}/>
      ) : (
        null
      )}
      {WhislistState ? (
        <Whislist state={WhislistState} setState={WhislistToggle}/>
      ) : (
        null
      )}
    </div>
  );
}
