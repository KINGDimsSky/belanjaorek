"use server";

import { prisma } from "./db";
import * as z from "zod";
import { RegisterSchema } from "./schema/auth-schema";
import bcrypt from "bcryptjs";
import { GetUserByEmail } from "./services";
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

export async function SaveCartToDB (items: CartItem[]) { /* Masih Belum sempurna tahap Prosess */
  const session = await getServerSession(authOptions);
  
  if (!session?.user.id) {
    return {error: 'Must Login to Use Cart Features!', status: false};
  }
  const user = session.user.id;
  
  try {
    await prisma.cart.create({
      data : {
        userId: user,
        productId: items[0].id,
        quantity: items[0].quantity
      }
    })
    return {message: 'Cart Saved to Database!', status: true};
  }catch {
    return {error: 'Failed to Save Cart to Database!', status: false};
  }
}

// Mengambil daftar ID wishlist pengguna saat ini
export async function getWishlistIdsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    select: { productId: true },
  });

  return wishlist.map(item => item.productId);
}

// Menambah/menghapus item dari wishlist di database
export async function toggleWishlistAction(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { error: 'You must be logged in.' };
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
      revalidatePath('/'); // Revalidasi halaman yang relevan
      return { success: 'Removed from wishlist.' };
    } else {
      await prisma.wishlist.create({
        data: {
        userId : userId, 
        productId : productId
      }});
      revalidatePath('/');
      return { success: 'Added to wishlist.' };
    }
  } catch (error) {
    return { error: 'Something went wrong.' };
  }
}


