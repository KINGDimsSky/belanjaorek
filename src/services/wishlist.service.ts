import { prisma } from "@/lib/db";

export async function getWishlistById (userId : string) {
    return prisma.wishlist.findMany ({
        where : {
            userId : userId
        }, 
        select : {
            productId : true
        }
    })
}

export async function getExistingWhislistItem (userId : string, productId : string) {
    return await prisma.wishlist.findUnique({
        where : {
            userId_productId : {userId, productId}
        }
    })
}

export async function deleteSpesificWhislist (userId : string, productId : string) {
    return await prisma.wishlist.delete({
        where : {
            userId_productId : {userId, productId}
        }
    })
}

export async function createSpesificWhislist (userid : string, productId : string) {
    await prisma.wishlist.create({
        data : {
            userId : userid,
            productId : productId
        }
    })
}