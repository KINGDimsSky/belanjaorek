"use server"

import { authOptions } from "@/lib/auth";
import { getProductsByIds } from "@/services/product.service";
import { createSpesificWhislist, deleteSpesificWhislist, getExistingWhislistItem, getWishlistById } from "@/services/wishlist.service";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function getWishlistIdsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const wishlist = await getWishlistById(session.user.id);

  return wishlist.map(item => item.productId);
}

export async function getWhislistProductsAction (productIds : string[]) {
  const products = await getProductsByIds(productIds);
  return products
}

export async function toggleWishlistAction (productId : string) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return { message: 'You must be Logged in To Use Wishlist!', status: false}
    }

    const userId = session.user.id;
    const isAlreadyExisting = await getExistingWhislistItem(userId, productId);

    try {
        if (isAlreadyExisting) {
            await deleteSpesificWhislist(userId, productId);
            revalidatePath('/products');
            revalidatePath('/');
            
            return { message: 'Product Successfully Removed From Whislist!', status: true }
        }else {
            await createSpesificWhislist(userId, productId);
            revalidatePath('/product');
            revalidatePath('/');

            return { message: 'Product Successfully Added To Whislist!', status: true}
        }
    }catch(error) {
        return { message : 'Something went Wrong!', status : false}
    }
}
