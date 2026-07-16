"use server"

import { categoryQuerySchema } from "@/lib/schema/product-schema"
import { getProductsByCategory } from "@/services/product.service"

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