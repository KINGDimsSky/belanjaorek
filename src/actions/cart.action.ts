"use server"

import { authOptions } from "@/lib/auth";
import { createACartDB, deleteProductFromCart, getCartByIds, getSpesificCartId } from "@/services/cart.service";
import {  CartPayload, UICartItems } from "@/types";
import { getServerSession } from "next-auth";

export async function SaveCartToDB (items: CartPayload[]) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user.id) {
    return {message: 'Must Login to Use Cart Features!', status: false};
  }
  const user = session.user.id;
  
  try {
    await createACartDB(user, items);
    return {message: 'Product Added To Cart!', status: true};
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
    image : item.Product.image || '/NoProduct.jpg',
    slug : item.Product.slug
  }))
}

export async function deleteCartActions (productId : string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {message : 'Must Login to Use Cart Features!', status : false};
  }

  const userId = session.user.id;
  const cartId = await getSpesificCartId(userId);

  console.log (cartId);

  if (!cartId) {
    return {message: 'Cant Found Your Cart In Database!', status: false};
  }

  try {
    await deleteProductFromCart(cartId.id, productId);
    return {message: 'Product Removed From Cart!', status: true}
  }catch (error) {
    return {message: 'Error Deleting Product from Cart', status : false}
  }

}