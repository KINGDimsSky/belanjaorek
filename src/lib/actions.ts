"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "./db"
import { RemoveSpaceAndReplaceWithHypen } from "./utils"

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
