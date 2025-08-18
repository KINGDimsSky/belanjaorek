"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { RemoveSpaceAndReplaceWithHypen } from "./utils";
import * as z from "zod";
import { LoginSchema, RegisterSchema } from "./schema/auth-schema";
import bcrypt from "bcryptjs";


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

export async function deletedPost(cuid: string) {
  await prisma.posts.delete({ where: { id: cuid } });
}

export async function RegisterUser(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: `Wrong Fields!`, status: false };
  }

  const AlreadyRegisterd = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  });

  if (AlreadyRegisterd) {
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

export async function ValidatingUser(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  console.log (values)

  if (!validatedFields) {
    return {message: 'Wrong Fields!', status: false}
  }

  const RegisteredUser = await prisma.user.findUnique({
    where : {
        email : values.email
    }
  })

  if (!RegisteredUser) {
    return {message: 'Email Not Found!', status: false}
  }

  return { message: 'Successfully', status: true}
}


export async function GetProducts () {
    return console.log ('Tempeks On Progress...')
}