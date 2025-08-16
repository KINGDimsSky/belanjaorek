import {z} from 'zod'

export const RegisterSchema = z.object({
    email : z.email('Must Be Email!').min(6, 'Too Short').max(30, 'Max 30 Charachter'),
    username: z.string('Invalid Character').min(6, 'Must be At least 6 Character').max(20, 'Too Long character'),
    password: z.string('Invalid Character').min(6, 'At Least 6 Character').max(20),
    confirmPassword: z.string('Invalid Character').min(6, 'At Least 6 Character').max(20)
})

export const LoginSchema = z.object({
    emailOrUsername: z.string().min(1).max(30),
    password: z.string().min(1).max(20)
})



