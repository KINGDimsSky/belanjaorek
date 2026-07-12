"use server"

import { authOptions } from "@/lib/auth";
import { createACartDB, getCartByIds } from "@/services/cart.service";
import { CartItem } from "@/types";
import { getServerSession } from "next-auth";

export async function SaveCartToDB (items: CartItem[]) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user.id) {
    return {message: 'Must Login to Use Cart Features!', status: false};
  }
  const user = session.user.id;
  
  try {
    await createACartDB(user, items);
    return {message: 'Cart Saved to Database!', status: true};
  }catch(error) {
    console.error("Failed to save cart:", error);
    return {message: 'Failed to Save Cart to Database!', status: false};
  }
}

export async function getCartIdsAction () {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return [];

  const user = session.user.id;

  return await getCartByIds(user);
}

//process