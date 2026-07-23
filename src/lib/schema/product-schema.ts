import z from "zod";

export const categoryQuerySchema = z.string()
.min(1, "Category cannot be empty!").max(50, "Category slug is too long!")
.regex(/^[a-zA-Z0-9-]+$/, 'Invalid Category slug format')

export const productCreateSchema = z.object ({
    name : z.string({error: 'Name Must be String!'}).min(5, {error: 'Name At least have 5 Character'}).max(30, {error: 'Max Name is 30 Character!'}),
    description : z.string({error: "Description Must Be String!"}).min(10, {error: 'Deskripsi Terlalu Pendek'}),
    price : z.coerce.number<number>({error: 'Price must be Number',}).min(1, {error : 'Harga Tidak Boleh Kosong atau 0!'}),
    mainImage : z.string().optional().or(z.literal("")),
    // soon tambahkan status besok
    productImage : z.array(z.string()).optional(),
    latestVersion : z.string().optional().or(z.literal("")), 
    isDiscount : z.coerce.boolean<boolean>({error: 'Must boolean (True or False)'}),
    stock : z.coerce.number<number>({error: 'Stock must a Number!'}),
    discountPrice : z.coerce.number<number>({error : 'Discount Price must a Number!'}).min(0, {error : "Discount tidak boleh Kurang dari 0"}),
    categoryId : z.string({error: "Category must be a Character!"}).min(3, {error: "Pilih salah Satu Kategori setidaknya!"})
})

export const productEditSchema = z.object({
    id: z.string({error: "Id Must be a string"}).min(5, {error: "Id At least have 5 Character"}).max(50, {error: "Max Id Is 50 Character!"}),
    name : z.string({error: 'Name Must be String!'}).min(5, {error: 'Name At least have 5 Character'}).max(40, {error: 'Max Name is 30 Character!'}),
    description : z.string({error: "Description Must Be String!"}).min(10, {error: 'Deskripsi Terlalu Pendek'}),
    price : z.coerce.number<number>({error: 'Price must be Number',}).min(1, {error : 'Harga Tidak Boleh Kosong atau 0!'}),
    mainImage : z.string().optional().or(z.literal("")),
    productImage : z.array(z.string()).optional(),
    status : z.enum(['PUBLISHED', 'ARCHIVED', 'DRAFT']),
    latestVersion : z.string().optional().or(z.literal("")), 
    isDiscount : z.coerce.boolean<boolean>({error: 'Must boolean (True or False)'}),
    stock : z.coerce.number<number>({error: 'Stock must a Number!'}),
    discountPrice : z.coerce.number<number>({error : 'Discount Price must a Number!'}).min(0, {error : "Discount tidak boleh Kurang dari 0"}),
    categoryId : z.string({error: "Category must be a Character!"}).min(3, {error: "Pilih salah Satu Kategori setidaknya!"})
})
