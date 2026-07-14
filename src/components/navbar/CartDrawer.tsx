"use client";

import { useBodyScrollLock } from "@/hooks/others/use-body-scroll";
import { useOnClickOutside } from "@/hooks/others/use-click-outside";
import Image from "next/image";
import { useRef, useTransition } from "react";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import { UsecartStore } from "@/store/cart-store";
import { ToLocalePriceFormat } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCartActions, SaveCartToDB } from "@/actions/cart.action";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface DrawerProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDrawer({ state, setState }: DrawerProps) {
  const CartItems = UsecartStore((state) => state.cartItems);
  const DeleteItem = UsecartStore((state) => state.removeFromCart);
  const [deletePending, startDeleteTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  useBodyScrollLock(state);
  useOnClickOutside(ref, () => setState(false));
  const router = useRouter();
  const {data : session, status } = useSession(); 

  const DeleteCartProduct = (productId : string) => {
    if (status === 'unauthenticated') router.push('/login');

    const previousCartItems = UsecartStore.getState().cartItems;
    const itemToRollback = previousCartItems.find(item => item.productId === productId);

    DeleteItem(productId);

    startDeleteTransition(async () => {
      const deleteActions = await deleteCartActions(productId);
      
      if (deleteActions.status === false) {
        if (itemToRollback) {
          UsecartStore.getState().setInitialCart(previousCartItems);
        }
        toast.error(deleteActions.message);
      }else {
        toast.success(deleteActions.message)
      }

    })
  }

  return (
    <div className="fixed flex z-10 top-0 justify-end min-h-screen w-full bg-background/65">
      <div ref={ref} className="relative flex flex-col p-4 w-80 min-h-screen bg-background border border-foreground/25">
        <div className="flex justify-between p-2">
          <h2 className="font-semibold">Chart ({CartItems.length})</h2>
          <IoMdClose onClick={() => setState(!state)} className="text-lg cursor-pointer" />
        </div>
        {CartItems.length === 0 ? (
          <div className="flex flex-col gap-4 tracking-tight my-auto items-center">
            <h2 className="text-sm tracking-tight font-semibold">Oops No Product Found Here!</h2>
            <Image src={'/no-orders.png'} alt="Empty Cart" width={150} height={150} className="object-cover"/>
          </div>
        ): (
          <div className="flex flex-col gap-2 mt-2">
            {CartItems.map((item) => (
              <div className="flex gap-4" key={item.productId}>
                <div className="relative w-16 h-16 rounded-md">
                  <Link href={`/product/${item.slug}`}>
                    <Image src={item.image || ''} alt={item.name} fill className="object-cover"/>
                  </Link>
                </div>
                <div className="flex flex-col justify-between">
                  <Link href={`/product/${item.slug}`}>
                    <p className="text-xs truncate">{item.name}</p>
                  </Link>
                  <p className="text-sm font-semibold text-primary">{ToLocalePriceFormat(item.price)}</p>
                  <div className="flex justify-between">
                    <p className="text-xs">Quantity: {item.quantity}</p>
                    <Button onClick={() => DeleteCartProduct(item.productId)} variant={'destructive'} className="w-12 h-4 text-xs px-4 rounded-e-md">Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
          {CartItems.length ? (
             <div className="items-end mt-auto text-foreground"> 
             <Link href={'/checkout'}>
               <Button variant={'default'} className="w-full rounded-e-md text-foreground font-semibold text-white">
                 Checkout
               </Button>
             </Link>
            </div>
          ) : (
            null
          )}
      </div>
    </div>
  );
}
