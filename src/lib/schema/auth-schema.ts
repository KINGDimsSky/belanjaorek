import {z} from 'zod'

export const RegisterSchema = z.object({
    email : z.email('Must Be Email!').min(6, 'Too Short').max(30, 'Max 30 Charachter'),
    username: z.string('Invalid Character').min(6, 'Must be At least 6 Character').max(20, 'Too Long character'),
    password: z.string('Invalid Character').min(6, 'At Least 6 Character').max(20),
    confirmPassword: z.string('Invalid Character').min(6, 'At Least 6 Character').max(20)
}).refine((data) => data.password === data.confirmPassword, {
    path : ['confirmPassword'],
    message : "Password do not Match!"
}) 

export const LoginSchema = z.object({
    emailOrUsername: z.string('Must Be String').min(1, 'Do not Empty!').max(30, 'Too Long Character'),
    password: z.string('Must Be String').min(1, 'Too Short').max(20, 'Too Long Character')
})



