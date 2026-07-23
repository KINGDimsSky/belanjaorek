"use server"

import { categoryQuerySchema, productCreateSchema, productEditSchema } from "@/lib/schema/product-schema"
import { RemoveSpaceAndReplaceWithHypen } from "@/lib/utils";
import { createSpesificProduct, deleteProductsSpesificByOwner, editSpesificProduct, getAllCategory, getAllProductsByOwner, getProductsByCategory } from "@/services/product.service"
import { getAuthSession } from "@/services/user.service";
import z, { safeParse } from "zod";

export async function getProductsByCategoryActions (category : string) {
    const validateQuery = categoryQuerySchema.safeParse(category);

    if (!validateQuery.success) {
        const errorMessage = validateQuery.error.issues.map((issue) => 
        issue.message).join(", ")

        return {message : errorMessage || 'Invalid Input Parameters!', data: [], status : false}
    }

    try {
        const result = await getProductsByCategory(category)

        if (result.length === 0) return {message : 'No Products Found!', data : result,  status: true}

        return {message : 'Successfully Getting Products By Category', data : result, status: true}
    }catch (error) {
        return {message : 'Oops Something went Wrong!', data: [], status: false}
    }
}

export async function createSpesificProductAction (productPayload :z.infer<typeof productCreateSchema>) {
    const validatedFields = productCreateSchema.safeParse(productPayload);
    const isAuthenticated = await getAuthSession();

    if (!isAuthenticated) {
        return {message : 'Error!, you are not Logged In!', data: null, status : false}
    }

    const {id} = isAuthenticated

    if (!validatedFields.success) {
        return {message: 'Invalid Input Parameters!', data : null, status: false}
    }

    let {mainImage} = validatedFields.data
    
    if (mainImage === "") {
        mainImage = undefined
    }
    
    const { name } = validatedFields.data;
    const slug = RemoveSpaceAndReplaceWithHypen(name)


    const payload = {
        ...validatedFields.data,
        slug : slug,
        userId: id,
    }

    try {
        await createSpesificProduct(payload)

        return {message : `Success Created ${validatedFields.data.name} products`, data : productPayload, status: true}
    }catch(error) {
        console.error("[PRODUCT_CREATE_ERROR]:", error); 
        return {message : 'Oops Something Went Wrong!', data : null, status : false}
    }
}

export async function editSpesificProductActions (product : z.infer<typeof productEditSchema>) {
    const Validate = productEditSchema.safeParse(product);
    const user = await getAuthSession();

    if (!user) return {message : "You must Logged In!", data: null, status: false}

    if (!Validate.success) return {message: "Wrong Field", data : null, status : false}

    const slug = RemoveSpaceAndReplaceWithHypen(Validate.data.name);
    const {id} = user

    const payload = {
        ...Validate.data,
        slug : slug,
        userId : id
    }

    try {
        const result =  await editSpesificProduct(payload);


        return {message : "Successfully Edited Product", data : result, status: true}
    }catch(Error) {
        return {message: 'Oops Something went Wrong!', data: null, status: false}
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

export async function getProductsByOwnerActions () {
    const user = await getAuthSession();

    if (!user) {
        return {message: 'You must Logged In', data: null, status: false}
    }

    const {id} = user;

    try {
        const result = await getAllProductsByOwner(id)

        return {message: 'Successfully Getting Products with Spesific Owner', data: result, status: true}
    }catch(err) {
        return {message : 'Oops Something Went Wrong!', data: null, status: false}
    }
}

export async function DeleteProductSpesificByOwnerActions (productId : string) {
    const user = await getAuthSession();

    if (!user) {
        return {message: "You must Logged In!", data : null, status: false}
    }

    try{
        const result = await deleteProductsSpesificByOwner(productId);

        return {message : "Successfully Delete Spesific Products", data: result, status: true}
    }catch(err) {
        return {message : 'Oops Something went Wrong!', data: null, status : false}
    }
}