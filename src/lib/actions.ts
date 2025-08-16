"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "./db"
import { RemoveSpaceAndReplaceWithHypen } from "./utils"
import * as z from 'zod';
import { LoginSchema, RegisterSchema } from "./schema/auth-schema";

export async function CreateAPost (formData : FormData) {
    await prisma.posts.create({
        data : {
            title : formData.get('title') as string,
            slug: RemoveSpaceAndReplaceWithHypen(formData.get('title') as string),
            content : formData.get('content') as string,
            Author : {
                connect : {
                    email : "dimssky@gmail.com",
                }
            }
        }
    })

    revalidatePath('/blog');
    console.log ("Succes Creating a Post!");
}

export async function deletedPost (cuid : string) {
    await prisma.posts.delete({ where : { id : cuid }})
}

export async function RegisterUser (values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);
    console.log (values)

    if (!validatedFields.success) {
        return {message: 'Error Wrong Fields!', status: false}
    }

    console.log(`${values.username} has added to database!`);
    return {message: `${values.username} Successfully added to Database!`, status: true};
}

export async function ValidatingUser (values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values);

}

