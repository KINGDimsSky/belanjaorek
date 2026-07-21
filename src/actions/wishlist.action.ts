"use server"

import { authOptions } from "@/lib/auth";
import { getProductsByIds } from "@/services/product.service";
import { getAuthSession } from "@/services/user.service";
import { createSpesificWhislist, deleteSpesificWhislist, getExistingWhislistItem, getWishlistById } from "@/services/wishlist.service";
import { revalidatePath } from "next/cache";

export async function getWishlistIdsAction() {
  const session = await getAuthSession();
  if (!session) return [];

  const {id} = session;

  const wishlist = await getWishlistById(id);

  return wishlist.map(item => item.productId);
}

export async function getWhislistProductsAction (productIds : string[]) {
  const products = await getProductsByIds(productIds);
  return products
}

export async function toggleWishlistAction (productId : string) {
    const session = await getAuthSession();

    if (!session) {
        return { message: 'You must be Logged in To Use Wishlist!', status: false}
    }

    const {id} = session;
    const isAlreadyExisting = await getExistingWhislistItem(id, productId);

    try {
        if (isAlreadyExisting) {
            await deleteSpesificWhislist(id, productId);
            revalidatePath('/products');
            revalidatePath('/');
            
            return { message: 'Product Successfully Removed From Whislist!', status: true }
        }else {
            await createSpesificWhislist(id, productId);
            revalidatePath('/product');
            revalidatePath('/');

            return { message: 'Product Successfully Added To Whislist!', status: true}
        }
    }catch(error) {
        return { message : 'Something went Wrong!', status : false}
    }
}
