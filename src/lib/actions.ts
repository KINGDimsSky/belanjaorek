"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { RemoveSpaceAndReplaceWithHypen } from "./utils";
import * as z from "zod";
import { RegisterSchema } from "./schema/auth-schema";
import bcrypt from "bcryptjs";
import { GetUserByEmail } from "./services";
import { CartItem } from "@/store/cart-store";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";


export async function CreateAPost(formData: FormData) {
  await prisma.posts.create({
    data: {
      title: formData.get("title") as string,
      slug: RemoveSpaceAndReplaceWithHypen(formData.get("title") as string),
      content: formData.get("content") as string,
      Author: {
        connect: {
          email: "dimssky@gmail.com",
        },
      },
    },
  });

  revalidatePath("/blog");
  console.log("Succes Creating a Post!");
}

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
        product : {
          
        }
      }
    })
    
  }catch {

  }

}

