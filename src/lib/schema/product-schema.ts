import z from "zod";

export const categoryQuerySchema = z.string()
.min(1, "Category cannot be empty!").max(50, "Category slug is too long!")
.regex(/^[a-zA-Z0-9-]+$/, 'Invalid Category slug format')

export const productCreateSchema = z.object ({
    name : z.string({error: 'Name Must be String!'}).min(5, {error: 'Name At least have 5 Character'}).max(30, {error: 'Max Name is 30 Character!'}),
    slug : z.string({error: 'slug Must be String!'}).min(5, {error: 'Slug at least have 5 Character'}).max(30, {error: 'Max Slug is 30 Character!'}),
    description : z.string({error: "Description Must Be String!"}).min(10, {error: 'Deskripsi Terlalu Pendek'}),
    price : z.coerce.number<number>({error: 'Price must be Number',}),
    image : z.string({error: 'Must be a Image URL'}),
    isDiscount : z.coerce.boolean<boolean>({error: 'Must boolean (True or False)'}),
    stock : z.coerce.number<number>({error: 'Stock must a Number!'}),
    discountPrice : z.coerce.number<number>({error : 'Discount Price must a Number!'}).optional(),
    categoryId : z.string({error: 'Category Must Selected!'})
})

