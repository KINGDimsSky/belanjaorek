import z from "zod";
import { LoginSchema } from "./schema/auth-schema";
import { prisma } from "./db";

export async function ValidatingUser(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

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