"use server";

import { prisma } from "./db";
import * as z from "zod";
import { RegisterSchema } from "./schema/auth-schema";
import bcrypt from "bcryptjs";
import { getProductsByIds, GetUserByEmail } from "./services";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { CartItem } from "@/types";
import { revalidatePath } from "next/cache";


export async function RegisterUser(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: `Wrong Fields!`, status: false };
  }

  const ExistingUser = await GetUserByEmail(values.email)

  if (ExistingUser) {
    return { message: "Email Already Registered!", status: false };
  }

  await prisma.user.create({
    data: {
      email: values.email,
      password: await bcrypt.hash(values.password, 10),
      username: values.username,
    },
  });

  return {
    message: `${values.username} Successfully added to Database!`,
    status: true,
  };
}

export async function SaveCartToDB (items: CartItem[]) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user.id) {
    return {message: 'Must Login to Use Cart Features!', status: false};
  }
  const user = session.user.id;
  
  try {
    const result = await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.upsert({
        where : {
          userId: user
        },
        update : {},
        create : {
          userId : user
        },
      })

      await tx.cartItems.deleteMany({
        where : {
          CartId : cart.id
        }
      })

      if (items.length >= 0) {
        await tx.cartItems.createMany({
          data : items.map((item) => (
            {CartId : cart.id, productId : item.id, Quantity: item.quantity}
          )),
        });
      }

      return cart;
    });
    return {message: 'Cart Saved to Database!', status: true};
  }catch(error) {
    console.error("Failed to save cart:", error);
    return {message: 'Failed to Save Cart to Database!', status: false};
  }
}


export async function getWishlistIdsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    select: { productId: true },

  });

  return wishlist.map(item => item.productId);
}

export async function getWhislistProductsAction (productIds : string[]) {
  const products = await getProductsByIds(productIds);
  return products
}

export async function toggleWishlistAction(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { message: 'Error You Must Logged In!', status: false };
  }
  
  const userId = session.user.id;
  const existingWishlistItem = await prisma.wishlist.findUnique({
    where: {
      userId_productId: { userId, productId },
    },
  });

  try {
    if (existingWishlistItem) {
      await prisma.wishlist.delete({
        where: {
          id: existingWishlistItem.id 
      }});
      revalidatePath('/products'); 
      revalidatePath('/');
      return { message: 'Product Successfully Removed From Whislist!', status: true};
    } else {
      await prisma.wishlist.create({
        data: {
        userId : userId, 
        productId : productId
      }});
      revalidatePath('/products');
      revalidatePath('/');
      return { message : 'Added to wishlist.', status: true };
    }
  } catch (error) {
    return { message : 'Something went wrong.', status: false };
  }
}


