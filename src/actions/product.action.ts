"use server"

import { categoryQuerySchema, productCreateSchema } from "@/lib/schema/product-schema"
import { createSpesificProduct, getAllCategory, getProductsByCategory } from "@/services/product.service"
import { getAuthSession } from "@/services/user.service";
import z from "zod";

export async function getProductsByCategoryActions (category : string) {
    const validateQuery = categoryQuerySchema.safeParse(category);

    if (!validateQuery.success) {
        const errorMessage = validateQuery.error.issues.map((issue) => 
        issue.message).join(", ")

        return {message : errorMessage || 'Invalid Input Parameters!', data: [], status : false}
    }

    try {
        const result = await getProductsByCategory(category)

        if (result.length === 0) return {message : 'No Products Found!', data : result,  status: false}

        return {message : 'Successfully Getting Products By Category', data : result, status: true}
    }catch (error) {
        return {message : 'Oops Something went Wrong!', data: [], status: false}
    }
}

export async function createSpesificProductAction (productPayload :z.infer<typeof productCreateSchema>) {
    const validatedFields = productCreateSchema.safeParse(productPayload);
    const isAuthenticated = await getAuthSession();

    if (!isAuthenticated) {
        return {message : 'Error!, you are not Logged In!', data: [], status : false}
    }

    const {id} = isAuthenticated

    if (!validatedFields.success) {
        return {message: 'Invalid Input Parameters!', data : [], status: false}
    }

    const payload = {
        ...validatedFields.data,
        userId: id,
    }

    try {
        await createSpesificProduct(payload)

    }catch(error) {

    }
}

export async function getAllCategoryActions () {
    try {
        const result = await getAllCategory()
        
        return {message : 'success Getting All Category', data : result, status: true}
    }catch(error) {
        return {message : error, data : [], status : false}
    }
}