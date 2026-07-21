"use server"

import { createACartDB, deleteProductFromCart, getCartByIds, getSpesificCartId } from "@/services/cart.service";
import { getAuthSession } from "@/services/user.service";
import {  CartPayload, UICartItems } from "@/types";

export async function SaveCartToDB (items: CartPayload[]) {
  const session = await getAuthSession()
  
  if (!session) {
    return {message: 'Must Login to Use Cart Features!', status: false};
  }
  const { id } = session
  
  try {
    await createACartDB(id, items);
    return {message: 'Product Added To Cart!', status: true};
  }catch(error) {
    console.error("Failed to save cart:", error);
    return {message: 'Failed to Save Cart to Database!', status: false};
  }
}

export async function getCartIdsAction () : Promise<UICartItems[]> {
  const session = await getAuthSession();

  if (!session) return [];

  const {id} = session
  const cart = await getCartByIds(id);
  
  if (!cart || !cart?.CartItems.length) return []

  const { CartItems } = cart;
  
  return CartItems.map((item) => ({
    productId: item.productId,
    quantity: item.Quantity,
    name : item.Product.name,
    price : item.Product.price,
    image : item.Product.MainImage || '/NoProduct.jpg',
    slug : item.Product.slug
  }))
}

export async function deleteCartActions (productId : string) {
  const session = await getAuthSession();

  if (!session) {
    return {message : 'Must Login to Use Cart Features!', status : false};
  }

  const { id } = session;
  const cartId = await getSpesificCartId(id);

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