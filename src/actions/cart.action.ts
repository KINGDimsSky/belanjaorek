"use server"

import { authOptions } from "@/lib/auth";
import { createACartDB, getCartByIds } from "@/services/cart.service";
import {  CartItemDTO, CartPayload, UICartItems } from "@/types";
import { getServerSession } from "next-auth";

export async function SaveCartToDB (items: CartPayload[]) {
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

export async function getCartIdsAction () : Promise<UICartItems[]> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return [];

  const user = session.user.id;
  const cart = await getCartByIds(user);
  
  if (!cart || !cart?.CartItems.length) return []

  const { CartItems } = cart;
  
  return CartItems.map((item) => ({
    productId: item.productId,
    quantity: item.Quantity,
    name : item.Product.name,
    price : item.Product.price,
    image : item.Product.image || '/NoProduct.jpg'
  }))
}