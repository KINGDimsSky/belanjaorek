"use server"

import { RegisterSchema } from "@/lib/schema/auth-schema";
import { createAnewUser, createGoogleUser, GetUserByEmail } from "@/services/auth";
import z from "zod";

export async function RegisterUser (values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { message: 'Wrong Fields!', status: false};
    }

    const existingUser = await GetUserByEmail(values.email);

    if (existingUser) {
        return { message: 'Email Already Registered!', status : false}
    }

    await createAnewUser(values);

    return {
        message: `${values.username} Successfully added to Database!`,
        status : true
    }
}

export async function handleGoogleLogin (data: {
    email : string,
    username? : string | null,
    image? : string | null
}){
    const existingUser = await GetUserByEmail(data.email);
    
    if (existingUser) {
        return existingUser;
    }

    return await createGoogleUser(data);
}