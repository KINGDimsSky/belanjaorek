"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { RemoveSpaceAndReplaceWithHypen } from "./utils";
import * as z from "zod";
import { RegisterSchema } from "./schema/auth-schema";
import bcrypt from "bcryptjs";
import { GetUserByEmail } from "./services";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { CartItem } from "@/types";


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

export async function SaveToDBCart (items: CartItem[]) {
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

export async function SaveWislistToDB (productId: string) {




}

