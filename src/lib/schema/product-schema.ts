import z from "zod";

export const categoryQuerySchema = z.string()
.min(1, "Category cannot be empty!").max(50, "Category slug is too long!")
.regex(/^[a-zA-Z0-9-]+$/, 'Invalid Category slug format')