import {z} from 'zod'

export const RegisterSchema = z.object({
    email : z.email().min(6).max(30),
    username: z.string().min(6).max(20),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
})

export const LoginSchema = z.object({
    emailOrUsername: z.string().min(1).max(30),
    password: z.string().min(1).max(20)
})

