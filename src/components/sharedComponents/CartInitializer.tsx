"use client";

import { UsecartStore } from "@/store/cart-store";
import { UICartItems } from "@/types";
import { useEffect, useRef } from "react";

export default function CartInitializer({cartItems } : {cartItems : UICartItems[]}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
        UsecartStore.getState().setInitialCart(cartItems);
        initialized.current = true;
    }
  }, []);

  return null;
}
